import { contractInstance, server } from "@/contract/jsClient";
import * as SorobanClient from 'stellar-sdk';import { encode } from "../../contract/encode";

export const handleSorobanWithdraw = async (amount, address) => {
  console.log('check');
  try {
    const pk = address;

    const contract = contractInstance();
    const account = await server.getAccount(pk);
    let method = 'withdraw';
    const obj1 = { type: 'scoI128', value: amount }; //public key
    const obj2 = { type: 'address', value: address }; // message
    const params = [encode(obj1), encode(obj2)];
    let tx = new SorobanClient.TransactionBuilder(account, {
      fee: '200',
      networkPassphrase: SorobanClient.Networks.FUTURENET
    })
      .addOperation(contract.call(method, ...params))
      .setTimeout(SorobanClient.TimeoutInfinite)
      .build();
    console.log('=====>tx<======', tx);
    let sim = await server.simulateTransaction(tx).then((sim) => {
      console.log("cost:", sim.cost);
      console.log("result:", sim.result);
      console.log("error:", sim.error);
      console.log("latestLedger:", sim.latestLedger);
    });
    // if (!results || results.length !== 1) {
    //   // setIsLoading(false);

    //   throw new Error('Invalid response from simulateTransaction');
    // }
    // const result = results[0];

    // let _answer = decode.scvalToBigNumber(
    //   xdr.ScVal.fromXDR(Buffer.from(result.xdr, 'base64'))
    // );
    // // let _ans = decode.scvalToBigNumber(
    // //     xdr.ScVal.fromXDR(Buffer.from(result.xdr, 'base64'))
    // //   );
    // console.log('🚀 ~ file: get_vault.ts:57 ~ test ~ _ans:', _answer);
    let _prepareTx = await server.prepareTransaction(
      tx,
      SorobanClient.Networks.FUTURENET
    );
    _prepareTx.sign(SorobanClient.Keypair.fromSecret(secret));
    try {
      let { hash } = await server.sendTransaction(_prepareTx);
      console.log('🚀 ~ test ~ hash', hash);

      const sleepTime = Math.min(1000, 60000);

      for (let i = 0; i <= 60000; i += sleepTime) {
        await sleep(sleepTime);
        try {
          //get transaction response
          const response = await server?.getTransaction(hash);
          console.log('==>response<====', response);
          switch (response.status) {
            case 'NOT_FOUND': {
              continue;
            }
            case 'SUCCESS': {
              if (!response?.resultXdr) {
                throw new Error('Expected exactly one result');
              }
              // toast.success('Claim Success!');
              console.log('🚀 ~ test ~ success and the value is', _answer);
              // setIsLoading(false);

              return _answer;
            }
            case 'FAILED': {
              console.log('🚀 ~ test ~ FAILED', response);
              throw response.resultXdr;
            }
            default: {
              throw new Error(
                'Unexpected transaction status: ' + response.status
              );
            }
          }
        } catch (err) {
          if ('code' in err && err.code === 404) {
            console.log('🚀 ~ withdraw ~ err', err);
          } else {
            throw err;
          }
          // setIsLoading(false);
        }
      }
    } catch (error) {
      console.log('🚀 ~ test ~ error', error);
      // setIsLoading(false);
    }
    console.log('Hello-World');
  } catch (error) {
    console.log('======>error<=======', error);
    // toast.error('Something went wrong!');

    // setIsLoading(false);
  }

  // let method = 'hello'
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}