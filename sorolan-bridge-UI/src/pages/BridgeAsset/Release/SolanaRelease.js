import * as spltoken from '@solana/spl-token';
import React, {useMemo, useState} from 'react';
import * as web3 from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import {useAnchorWallet} from '@solana/wallet-adapter-react';
import {
  solanaProgram
} from '@/solanaContract/solanaInstance';
import {toast} from 'react-toastify';

export default function SolanaRelease() {
  const anchorWallet = useAnchorWallet();

  const [isLoading, setIsLoading] = useState(false);
  const NETWORK = 'https://api.devnet.solana.com';

  const conn = new anchor.web3.Connection(`${NETWORK}`, 'processed');

  const provider = new anchor.AnchorProvider(conn, anchorWallet, {
    commitment: 'processed'
  });

  const HandleSolanaWithdraw = async () => {
    if (!provider.wallet) {
      return toast.error('Please connect your wallet first!');
    }
    console.log(
      '🚀 ~ HandleSolanaDeposit ~ provider.wallet.publicKey',
      provider.wallet.publicKey
    );
    
    try {
      let depositAmount = 1;
      let _depositAmount = new anchor.BN(depositAmount * web3.LAMPORTS_PER_SOL);
      const program = solanaProgram(anchorWallet);
      console.log('🚀 ~ HandleSolanaDeposit ~ program', program);

      let ab = await program.methods
        .withdraw(_depositAmount)
        .accounts({
          user: provider.wallet.publicKey,
          mint: new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT),
          tokenProgram: spltoken.TOKEN_PROGRAM_ID,
          tokenAccount: await getAta()
        })
        .rpc({skipPreflight: true, commitment: 'confirmed'});
      if (ab) {
        setIsLoading(false);

        toast.success('Transaction successfully submitted to Sorolana Bridge');

        setShowTransactionLink(true);
      }
    } catch (error) {
      console.log('🚀 ~ HandleSolanaDeposit ~ error', error);
      setIsLoading(false);
      toast.error('Something went wrong');
    }
  };

  const getAta = async () => {
    const ata = await spltoken.getAssociatedTokenAddress(
      new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT),
      provider.wallet.publicKey,
      false
    );
    return ata;
  };
  return (
    <div>
      <h1>solana withdraw</h1>
      <button onClick={HandleSolanaWithdraw}>withdraw</button>
    </div>
  );
}
