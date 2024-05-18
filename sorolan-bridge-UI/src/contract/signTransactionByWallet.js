import * as SorobanClient from 'stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

export const signTransactionByWallet = async (prepareTx, address) => {
  let signedTransaction = '';
  let error = '';

  try {
    signedTransaction = await signTransaction(prepareTx.toXDR(), {
      networkPassphrase: SorobanClient.Networks.FUTURENET,
      accountToSign: address,
      network: 'Futurenet',
    });
    console.log('🚀 ~ signedTransaction=awaitsignTransaction ~ signedTransaction', signedTransaction)
  } catch (e) {
    console.log('🚀 ~ userSignTransaction ~ e', e);
    error = e;
  }

  if (error) {
    console.log('🚀 ~ userSignTransaction ~ error', error);
    return error;
  }

  return signedTransaction;
};
