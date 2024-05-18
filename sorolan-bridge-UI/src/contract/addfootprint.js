import * as SorobanClient from 'stellar-sdk';
import {
  Account,
  FeeBumpTransaction,
  Operation,
  Transaction,
  TransactionBuilder,
  xdr,
} from 'stellar-base';

export const addFootprint = (
  raw,
  networkPassphrase,
  simulation,
  addr
) => {
  if ('innerTransaction' in raw) {
    // TODO: Handle feebump transactions
    addFootprint(raw.innerTransaction, networkPassphrase, simulation);
  }
  if (raw.operations.length !== 1 || raw.operations[0].type !== 'invokeHostFunction') {
    throw new Error(
      'unsupported operation type, must be only one InvokeHostFunctionOp in the transaction.'
    );
  }

  const rawInvokeHostFunctionOp = raw.operations[0];
  if (
    !rawInvokeHostFunctionOp.functions ||
    !simulation.results ||
    rawInvokeHostFunctionOp.functions.length !== simulation.results.length
  ) {
    throw new Error(
      'preflight simulation results do not contain same count of HostFunctions that InvokeHostFunctionOp in the transaction has.'
    );
  }

  const source = new SorobanClient.Account(raw.source, `${parseInt(raw.sequence, 10) - 1}`);
  const classicFeeNum = parseInt(raw.fee, 10) || 0;
  const minResourceFeeNum = parseInt(simulation.minResourceFee, 10) || 0;
  const txnBuilder = new SorobanClient.TransactionBuilder(source, {
    // automatically update the tx fee that will be set on the resulting tx
    // to the sum of 'classic' fee provided from incoming tx.fee
    // and minResourceFee provided by simulation.
    //
    // 'classic' tx fees are measured as the product of tx.fee * 'number of operations', In soroban contract tx,
    // there can only be single operation in the tx, so can make simplification
    // of total classic fees for the soroban transaction will be equal to incoming tx.fee + minResourceFee.
    fee: (classicFeeNum + minResourceFeeNum).toString(),
    memo: raw.memo,
    networkPassphrase,
    timebounds: raw.timeBounds,
    ledgerbounds: raw.ledgerBounds,
    minAccountSequence: raw.minAccountSequence,
    minAccountSequenceAge: raw.minAccountSequenceAge,
    minAccountSequenceLedgerGap: raw.minAccountSequenceLedgerGap,
    extraSigners: raw.extraSigners,
  });

  const authDecoratedHostFunctions = simulation.results.map(
    (functionSimulationResult, i) => {
      const hostFn = rawInvokeHostFunctionOp.functions[i];
      hostFn.auth(buildContractAuth(functionSimulationResult.auth));
      return hostFn;
    }
  );

  txnBuilder.addOperation(
    SorobanClient.Operation.invokeHostFunctions({
      functions: authDecoratedHostFunctions,
    })
  );

  const sorobanTxData = SorobanClient.xdr.SorobanTransactionData.fromXDR(
    simulation.transactionData,
    'base64'
  );
  txnBuilder.setSorobanData(sorobanTxData);

  return txnBuilder.build();
};

function buildContractAuth(auths) {
  const contractAuths = [];

  if (auths) {
    for (const authStr of auths) {
      contractAuths.push(SorobanClient.xdr.ContractAuth.fromXDR(authStr, 'base64'));
    }
  }

  return contractAuths;
}
