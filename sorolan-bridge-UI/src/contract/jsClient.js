// import * as SorobanClient from 'soroban-client';

import {
  Keypair,
  Networks,
  TransactionBuilder,
  Operation,
  scValToNative,
  SorobanRpc,
  Contract,
} from "stellar-sdk";
import { constants } from "./shared/constant";
import { parse } from "./xdrConverter";
import { encode } from "./encode";

const { Api, assembleTransaction } = SorobanRpc;
const SOROBAN_RPC_URL = constants.RPC_URL;
const contractId = constants.CONTRACT_ID;
console.log("contractId:", contractId);

export const server = new SorobanRpc.Server(`${SOROBAN_RPC_URL}` ?? "", {
  allowHttp: true,
});

// get account details by soroban server
export const getAccount = async (publicKey) => {
  const account = server.getAccount(publicKey);
  return account;
};
// main contract instance
export const contractInstance = () => {
  const contract = new Contract(`${contractId}`);
  console.log("🚀 ~ contractInstance ~ contractId", contractId);
  return contract;
};
// lent token contract instance
export const tokenContractInstance = (tokenContractId) => {
  const contract = new Contract(tokenContractId);
  return contract;
};

// build transaction  sorobanClient Transactionbuilder
export const transactionBuilder = (
  account,
  methodName,
  myParams
) => {
  const tx = new TransactionBuilder(account, {
    fee: "200",
    networkPassphrase: Networks.FUTURENET,
  })
    .addOperation(
      contractInstance().call(methodName, ...myParams) // invoke contract function
    )
    .setTimeout(30)
    .build();
  return tx;
};
// send transaction to server
export const sendTransactionToServer = async (txBuildXdr) => {
  try {
    // send transaction to server
    const { hash } = await server.sendTransaction(txBuildXdr);

    // wait for transaction response
    const sleepTime = Math.min(1000, 60000);

    for (let i = 0; i <= 60000; i += sleepTime) {
      await sleep(sleepTime);
      try {
        // get transaction response
        const response = await server?.getTransaction(hash);
        switch (response.status) {
          case "NOT_FOUND": {
            continue;
          }
          case "SUCCESS": {
            if (!response?.resultXdr) {
              throw new Error("Expected exactly one result");
            }

            const success = {
              success: true,
              result: response?.resultXdr,
              hash,
            };
            return success;
          }
          case "FAILED": {
            throw response.status;
          }
          default: {
            throw new Error(
              `Unexpected transaction status: ${response.status}`
            );
          }
        }
      } catch (err) {
        if ("code" in err && err.code === 404) {
          console.log("🚀 ~ withdraw ~ err", err);
        } else {
          throw err;
        }
      }
    }
  } catch (error) {
    console.log("🚀 ~ GeneralBorrower ~ error", error);
    console.log(`Tx Failed! More details:\n${JSON.stringify(error)}`);
  }
};

// wait for tx to complete
export const sleep = async (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// token contract methods

export const getTokenBalance = (account, id) => {
  const obj1 = {
    type: "address",
    value: account.accountId(),
  };

  const args1 = encode(obj1);
  const myParams = [args1];

  const tx = new TransactionBuilder(account, {
    fee: "200",
    networkPassphrase: Networks.FUTURENET,
  })
    .addOperation(
      tokenContractInstance(id).call("balance", ...myParams) // invoke contract function
    )
    .setTimeout(30)
    .build();
  return tx;
};

export const getTokenSymbol = (account, id, contractId) => {
  const obj1 = {
    type: "address",
    value: account.accountId(),
  };

  const args1 = encode(obj1);
  const myParams = [args1];

  const tx = new TransactionBuilder(account, {
    fee: "200",
    networkPassphrase: Networks.FUTURENET,
  })
    .addOperation(
      tokenContractInstance(contractId ?? id).call("symbol") // invoke contract function
    )
    .setTimeout(30)
    .build();
  return tx;
};
