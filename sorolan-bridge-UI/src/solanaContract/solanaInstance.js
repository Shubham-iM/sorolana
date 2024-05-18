import * as anchor from '@coral-xyz/anchor';
import soalanIdl from './idl.json';
import {useAnchorWallet} from '@solana/wallet-adapter-react';

const NETWORK = process.env.NEXT_PUBLIC_NETWORK

export const conn = new anchor.web3.Connection(`${NETWORK}`, 'processed');
console.log("conn:", conn)
export const confirmConnection = new anchor.web3.Connection(
  `${NETWORK}`,
  'confirmed'
);

export const solanaProgram = (anchorWallet) => {
  const provider = new anchor.AnchorProvider(conn, anchorWallet, {
    commitment: 'processed'
  });
  const idl = JSON.parse(JSON.stringify(soalanIdl));
  
  const programId = new anchor.web3.PublicKey(idl.metadata.address);

  return new anchor.Program(idl, programId, provider);
};
