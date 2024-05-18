import React from 'react';
import * as SorobanClient from 'stellar-sdk';
import {
  signTransaction,
  isConnected,
  getPublicKey
} from '@stellar/freighter-api';
import crypto from 'crypto';
import {useSorobanReact} from '@soroban-react/core';
import {bigValue} from 'src/utils/formatNumber';
import {constants} from '../shared/constant';

import {encode} from '../encode';
import * as decode from '../decode';
import {addFootprint} from '../addfootprint';
import {
  server,
  getAccount,
  transactionBuilder,
  sleep,
  sendTransactionToServer
} from '../jsClient';

export default function Hello() {
  const {
    connect,
    disconnect,
    address,
    activeConnector,
    connectors,
    activeChain
  } = useSorobanReact();

  const {xdr} = SorobanClient;
  const PUBLICKEY = address ?? 'GBKAYNS4Q77QXKCPIGOYJANGHJD3ISVYW7OIJ7X436TG6BRWOF2VNIUS';
  const SOROBAN_RPC_URL = constants.RPC_URL;
  const contractId = constants.CONTRACT_ID;
  const privateKey = constants.PRIVATE_KEY;

  const test = async () => {
    try {
      // fetch account by public key
      const account = await getAccount(PUBLICKEY);
      const method = 'deposit'; // method name

      const obj1 = {type: 'address', value: PUBLICKEY};
      const obj2 = {type: 'address', value: 'CB5ABZGAAFXZXB7XHAQT6SRT6JXH2TLIDVVHJVBEJEGD2CQAWNFD7D2U'};
      // const obj3 = { type: 'address', value: PUBLICKEY };
      // const obj2 = { type: 'address', value: PUBLICKEY };
      const obj4 = {type: 'scoI128', value: 3};
      const tt = SorobanClient.Address.contract(
        Buffer.from(
          '7d9defe0ccf9b680014a343b8880c22b160c2ea2c9a69df876decb28ddbd03dc',
          'hex'
        )
      ).toScVal();

      const myParams = [encode(obj1), encode(obj2),encode (obj4)];

      // create transaction build
      let transaction = transactionBuilder(account, method, myParams);

      // simulate transaction
      const {results} = await server.simulateTransaction(transaction);
      const sim = await server.simulateTransaction(transaction);
      if (!results || results.length !== 1) {
        throw new Error('Invalid response from simulateTransaction');
      }
      // get footprint
      const result = results[0];
      // Simulate the transaction to discover the storage footprint, and update the
      // transaction to include it. If you already know the storage footprint you
      // can use `addFootprint` to add it yourself, skipping this step.

      // add footprint
      transaction = addFootprint(
        transaction,
        SorobanClient.Networks.FUTURENET,
        sim,
        PUBLICKEY
      );

      // prepare server transaction
      const _prepareTransaction = await server.prepareTransaction(
        transaction,
        SorobanClient.Networks.FUTURENET
      );

      // sig  transaction by private key
      _prepareTransaction.sign(
        SorobanClient.Keypair.fromSecret(`${privateKey}`)
      );
      // sign transaction by wallet
      // const userSignedTransaction = await signTransactionByWallet(
      //   _prepareTransaction,
      //   address
      // );

      // // buld transaction by xdr
      // const txBuildXdr = SorobanClient.TransactionBuilder.fromXDR(
      //   userSignedTransaction,
      //   SorobanClient.Networks.FUTURENET
      // );

      const response = await sendTransactionToServer(_prepareTransaction);
      console.log('🚀 ~ test ~ response', response);
      if (response?.success === true) {
        //   let txObj = {
        //     address: address,
        //     source_type: 'lender',
        //     amount: Number(withdrawValue),
        //     transaction_type: 'withdraw',
        //     vaultId: vault.id,
        //     xdr:response.hash
        //   };
      }
    } catch (error) {
      console.log('🚀 ~ withdraw ~ error', error);
    }
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return <button onClick={test}>Click</button>;
}
