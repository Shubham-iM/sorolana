import { Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';
import { programs } from '@metaplex/js';
const { metadata: { Metadata } } = programs;

import * as SorobanClient from 'stellar-sdk';
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

async function getSolanaTokenMetadataInfo(tokenAddress, connection) {
    tokenAddress = new PublicKey(tokenAddress);

    const MetadataAccount = PublicKey.findProgramAddressSync(
        [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), tokenAddress.toBuffer()],
        METADATA_PROGRAM_ID
    );
    console.log("🚀 ~ file: tokenHelper.js:13 ~ getMetadataURI ~ MetadataAccount:", MetadataAccount[0].toBase58());

    const accountInfo = await connection.getAccountInfo(MetadataAccount[0]);
    if (!accountInfo || !accountInfo.data) {
        throw new Error('Token Metadata Account not found');
    }

    const ownedMetadata = await Metadata.load(connection, MetadataAccount[0]);
    // console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata:", ownedMetadata);
    // console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.name:", ownedMetadata.data.data.name);
    // console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.symbol:", ownedMetadata.data.data.symbol);
    // console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.uri:", ownedMetadata.data.data.uri);

    return ownedMetadata;

};

export async function getSolanaTokenInfo(tokenAddress, connection) {
    tokenAddress = new PublicKey(tokenAddress);

    const mintInfo = await getMint(connection, tokenAddress);
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo:", mintInfo);
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo.supply:", mintInfo.supply);
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo.decimals:", mintInfo.decimals);
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo.mintAuthority:", mintInfo.mintAuthority.toBase58());
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo.freezeAuthority:", mintInfo.freezeAuthority.toBase58());
    console.log("🚀 ~ file: tokenHelper.js:63 ~ getSolanaTokenInfo ~ mintInfo.address:", mintInfo.address.toBase58());

    const tokenAccountInfo = await connection.getParsedAccountInfo(tokenAddress);
    console.log("🚀 ~ file: tokenHelper.js:66 ~ getSolanaTokenInfo ~ tokenAccountInfo:", tokenAccountInfo);
    console.log("🚀 ~ file: tokenHelper.js:66 ~ getSolanaTokenInfo ~ tokenAccountInfo.value.owner:", tokenAccountInfo.value.owner.toBase58());

    const ownedMetadata = await getSolanaTokenMetadataInfo(tokenAddress, connection);
    console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata:", ownedMetadata);
    console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.name:", ownedMetadata.data.data.name);
    console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.symbol:", ownedMetadata.data.data.symbol);
    console.log("🚀 ~ file: tokenHelper.js:25 ~ getMetadataURI ~ ownedMetadata.data.data.uri:", ownedMetadata.data.data.uri);

    return {
        "tokenAddress": mintInfo.address.toBase58(),
        "tokenMetadataAddress": ownedMetadata.pubkey.toBase58(),
        "name": ownedMetadata.data.data.name,
        "symbol": ownedMetadata.data.data.symbol,
        "uri": ownedMetadata.data.data.uri,
        "supply": mintInfo.supply,
        "decimals": mintInfo.decimals,
        "mintAuthority": mintInfo.mintAuthority.toBase58(),
        "freezeAuthority": mintInfo.freezeAuthority.toBase58(),
    }

}

async function getterFnSoroban(server, invokerAddress, method_name, method_params, token_contract_id) {

    // // create account type
    const invokerAccount = await server.getAccount(invokerAddress);
    // // Building Tx Payload
    let tx_obj = new SorobanClient.TransactionBuilder(invokerAccount, {
        fee: '200',
        networkPassphrase: SorobanClient.Networks.FUTURENET,
    })
        .addOperation(token_contract_id.call(method_name, ...method_params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();

    // Simulating Tx offchain
    const simulateTransactionRes = await server.simulateTransaction(tx_obj);
    // console.log("\n🚀 ~ file: index.js:122 ~ it ~ simulateTransactionRes:", simulateTransactionRes);

    let returned_scVal = simulateTransactionRes.result.retval;
    let parsed_returned_val = SorobanClient.scValToNative(returned_scVal);
    console.log("🚀 ~ file: tokenHelper.js:87 ~ getterFnSoroban ~ parsed_returned_val:", parsed_returned_val);
    return parsed_returned_val
}

export async function getSorobanTokenInfo(token_address, server) {

    const invokerKeypair = SorobanClient.Keypair.fromSecret("SBB2JLQEPDLSTGVGIQ4L2NMGX6AY6FVZRHMNUCHMGGOWM74DJKQTLAIN");
    const invoker_address = invokerKeypair.publicKey();

    const token_contract_id = new SorobanClient.Contract(token_address);

    let method_name = ["decimals", "name", "symbol"]
    let method_params = []

    let decimals = await getterFnSoroban(server, invoker_address, method_name[0], method_params, token_contract_id)
    // console.log("🚀 ~ file: tokenHelper.js:100 ~ getSorobanTokenInfo ~ decimals:", decimals);
    let name = await getterFnSoroban(server, invoker_address, method_name[1], method_params, token_contract_id)
    // console.log("🚀 ~ file: tokenHelper.js:102 ~ getSorobanTokenInfo ~ name:", name);
    let symbol = await getterFnSoroban(server, invoker_address, method_name[2], method_params, token_contract_id)
    // console.log("🚀 ~ file: tokenHelper.js:104 ~ getSorobanTokenInfo ~ symbol:", symbol);
    return {
        "decimals": decimals,
        "name": name,
        "symbol": symbol,
        "uri": "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png", // token symbol // need to be h/c for time being
    }

}

async function main() {

    // // Solana
    await demonstrate_solana_token();

    // // Soroban
    await demonstrate_soroban_token();
}

async function demonstrate_solana_token() {
    const tokenAddress = '7m9gHwaYRd5BGmDedSM7pvEAfakqYbUnuNBhNVgreVB9';
    const metadataAddress = 'Gz3vYbpsB2agTsAwedtvtTkQ1CG9vsioqLW3r9ecNpvZ';
    const connection = new Connection(clusterApiUrl('devnet'));

    let tokenInfo = await getSolanaTokenInfo(tokenAddress, connection);
    console.log("🚀 ~ file: tokenHelper.js:75 ~ main ~ tokenInfo:", tokenInfo);
}

// async function demonstrate_soroban_token() {
//     let server = new SorobanClient.Server("https://rpc-futurenet.stellar.org:443", { allowHttp: true });
//     // console.log("🚀 ~ file: tokenHelper.js:129 ~ main ~ server:", server);
//     const tokenAddress = 'CADWPTO3I5OYRTI44GEGQCN4I47WLNIJXSTMJBLMR44H27YA3BEYY4DQ';
//     console.log("🚀 ~ file: tokenHelper.js:131 ~ main ~ tokenAddress:", tokenAddress);
//     const invokerKeypair = SorobanClient.Keypair.fromSecret("SBB2JLQEPDLSTGVGIQ4L2NMGX6AY6FVZRHMNUCHMGGOWM74DJKQTLAIN");
//     let sorobanTokenInfo = await getSorobanTokenInfo(server, tokenAddress, invokerKeypair.publicKey());
//     console.log("🚀 ~ file: tokenHelper.js:124 ~ main ~ sorobanTokenInfo:", sorobanTokenInfo);
// }

// main()