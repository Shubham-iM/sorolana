import { server } from '@/contract/jsClient';
import * as SorobanClient from 'stellar-sdk';

export async function getSorobanTokenBalance(token_address, holder_address) {
    const _server = server

    const invokerAccount = await _server.getAccount(holder_address);

    const token_contract_id = new SorobanClient.Contract(token_address);

    let method_name = "balance"
    let method_params = []

    holder_address = SorobanClient.nativeToScVal(holder_address, { type: 'address' })

    method_params.push(holder_address);

    // // Building Tx Payload
    let tx_obj = new SorobanClient.TransactionBuilder(invokerAccount, {
        fee: '200',
        networkPassphrase: SorobanClient.Networks.FUTURENET,
    })
        .addOperation(token_contract_id.call(method_name, ...method_params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();

    // Simulating Tx offchain
    const simulateTransactionRes = await _server.simulateTransaction(tx_obj);
    console.log("\n🚀 ~ file: index.js:122 ~ it ~ simulateTransactionRes:", simulateTransactionRes);

    let returned_scVal = simulateTransactionRes.result.retval;
    let parsed_returned_val = SorobanClient.scValToNative(returned_scVal);
    console.log("parsed_returned_val:", parsed_returned_val)
    console.log("parsed_returned_val:", parsed_returned_val.toString())
    // console.log("🚀 ~ file: index.js:213 ~ getBalance ~ parsed_returned_val:", parsed_returned_val);

    return parsed_returned_val.toString() / 10 ** 9;
}