import React from 'react';
import * as SorobanClient from 'stellar-sdk';
import {
  signTransaction,
  isConnected,
  getPublicKey
} from '@stellar/freighter-api';

import crypto from 'crypto';
import {useSorobanReact} from '@soroban-react/core';
import {encode} from '../encode';
import * as decode from '../decode';
import {addFootprint} from '../addfootprint';

const {xdr} = SorobanClient;

export default function WorkingHello() {
  const {
    connect,
    disconnect,
    address,
    activeConnector,
    connectors,
    activeChain,
    server
  } = useSorobanReact();

  const PublicKey = address ?? '';

  const contractId =process.env.NEXT_PUBLIC_CONTRACT_ID;
  console.log('🚀 ~ WorkingHello ~ contractId', contractId)
  const pk = 'GDNX3F6UZ32K2VWEIG7VBF27XFMV7CRWK6UAG4ESH6OYGZTQRG77UP5R';
  const secret = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  console.log('🚀 ~ WorkingHello ~ secret', secret)

  const test = async () => {
    console.log('start');
    try {
      const server = new SorobanClient.Server(
        `https://rpc-futurenet.stellar.org:443`
      );
      const contract = new SorobanClient.Contract(contractId);
      console.log('🚀 ~ test ~ contract', contract);
      const account = await server.getAccount(pk);

      const method = 'deposit';

      const obj1 = {type: 'address', value: pk};
      const obj2 = {type: 'address', value: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ID};
      const obj3 = {type: 'scoI128', value: 30};
      console.log('🚀 ~ test ~ obj2', obj2)
      
      const params = [encode(obj1), encode(obj2), encode(obj3)];

      const tx = new SorobanClient.TransactionBuilder(account, {
        fee: '200',
        networkPassphrase: SorobanClient.Networks.FUTURENET
      })
        .addOperation(contract.call(method, ...params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();


      const {results} = await server.simulateTransaction(tx);
      console.log('🚀 line no 66 result', results);

      if (!results || results.length !== 1) {
        throw new Error('Invalid response from simulateTransaction');
      }
      const resultt = results[0];
      console.log("🚀 ~ test ~ resultt", resultt)
      // const _add = addFootprint(tx, SorobanClient.Networks.FUTURENET, sim, pk);
      // console.log("🚀 ~ test ~ _add", _add)

      const _prepareTransaction = await server.prepareTransaction(
        tx,
        SorobanClient.Networks.FUTURENET
      );
      console.log(
        '🚀 ~ test ~ _prepareTransaction',
        _prepareTransaction.toXDR()
      );

      
      _prepareTransaction.sign(SorobanClient.Keypair.fromSecret(secret))


      //  let signed=await activeConnector?.signTransaction(_prepareTransaction.toXDR(),{networkPassphrase: SorobanClient.Networks.FUTURENET})
      // const userSignTransaction = async () => {
      //     let signedTransaction = '';
      //     let error = '';

      //     try {
      //       signedTransaction = await signTransaction(
      //         _prepareTransaction.toXDR(),
      //         {
      //           networkPassphrase: SorobanClient.Networks.FUTURENET,
      //           accountToSign: pub,
      //           network: 'Futurenet',
      //         }
      //       );
      //     } catch (e) {
      //       error = e;
      //     }

      //     if (error) {
      //       return error;
      //     }

      //     return signedTransaction;
      //   };

      //   // sign transaction by wallet
      //   const userSignedTransaction = await userSignTransaction();
      //   console.log("🚀 ~ test ~ userSignedTransaction", userSignedTransaction)

      //   // buld transaction by xdr
      //   const _submit = SorobanClient.TransactionBuilder.fromXDR(
      //     userSignedTransaction,
      //     SorobanClient.Networks.FUTURENET
      //   );
      //   console.log("🚀 ~ test ~ _submit", _submit)

      try {
        const {hash} = await server.sendTransaction(_prepareTransaction);
        console.log('🚀 ~ test ~ hash', hash);

        const sleepTime = Math.min(1000, 60000);

        for (let i = 0; i <= 60000; i += sleepTime) {
          await sleep(sleepTime);
          try {
            // get transaction response
            const response = await server?.getTransaction(hash);
            console.log('🚀 ~ test ~ response', response)
            switch (response.status) {
              case 'NOT_FOUND': {
                continue;
              }
              case 'SUCCESS': {
                if (!response?.resultXdr) {
                  throw new Error('Expected exactly one result');
                }

                const success = {
                  success: true,
                  result: response?.resultXdr,
                  hash
                };
                console.log('🚀 ~ test ~ success', success);
                return success;
              }
              case 'FAILED': {
                console.log('🚀 ~ test ~ FAILED', response);
                throw response.resultXdr;
              }
              default: {
                throw new Error(
                  `Unexpected transaction status: ${response.status}`
                );
              }
            }
          } catch (err) {
            if ('code' in err && err.code === 404) {
              console.log('🚀 ~ withdraw ~ err', err);
            } else {
              throw err;
            }
          }
        }
      } catch (error) {
        console.log('🚀 ~ test ~ error', error);
      }
    } catch (error) {
      console.log('🚀 ~ test ~ error', error);
      console.log('🚀 ~ test ~ error', error);
    }
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return <button onClick={test}>Click</button>;
}
