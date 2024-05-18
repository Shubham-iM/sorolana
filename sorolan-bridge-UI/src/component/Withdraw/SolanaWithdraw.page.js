import * as spltoken from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import {BN} from '@coral-xyz/anchor' ;
import { toast } from "react-toastify";

import {
  solanaProgram,
} from '@/solanaContract/solanaInstance';



 export const handleSolanaWithdraw = async () => {
    const getProvider = () => {
      if ('phantom' in window) {
        const provider = window.phantom?.solana;
  
        if (provider?.isPhantom) {
          return provider;
        }
      }
      
      window.open('https://phantom.app/', '_blank');
      return null;
    };
    
    const provider = getProvider();
    
    if (!provider.isPhantom) {
      return toast.error('Please connect your wallet first!');
    }
 
    try {
      // setIsLoading(true);
      let depositAmount = 1*web3.LAMPORTS_PER_SOL;
      let _depositAmount = new anchor.BN(depositAmount);
      // let _depositAmount = new anchor.BN(depositAmount * web3.LAMPORTS_PER_SOL);
      const program = solanaProgram(provider);

      console.log("publickey-->", provider.publicKey.toBase58())
      let tokenAccount = await getAta(provider.publicKey);
 
      // let sorobanUserAddress = '';
      let ab = await program.methods
        .withdraw(new BN(depositAmount))
        .accounts({
          user: provider.publicKey,
          mint: new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT),
          tokenProgram: spltoken.TOKEN_PROGRAM_ID,
          tokenAccount: await getAta(provider.publicKey)
        })
        // .signers([SoalanUserAddress])
        .rpc();
      // let value=await
      console.log('🚀 ~ HandleSolanaDeposit ~ ab', ab);
      if (ab) {
        // setIsLoading(false);

        toast.success('Transaction successfully submitted to Sorolana Bridge');

        // setTransactionId(ab);
        // setShowTransactionLink(true);
        // let aba = await confirmConnection.getParsedTransaction(ab);
        // console.log('🚀 ~ HandleSolanaDeposit ~ aba', aba);
      }
    } catch (error) {
      console.log('🚀 ~ HandleSolanaWithdraw ~ error', error);
      // setIsLoading(false);
      toast.error('Something went wrong');
    }
  };

  const getAta = async (provider) => {

    const ata = await spltoken.getAssociatedTokenAddress(
      new web3.PublicKey(`${process.env.NEXT_PUBLIC_TOKEN_MINT}`),
      provider,
      false
    );
    console.log("🚀 ~ file: verifyUtility.ts:42 ~ getAta ~ ata:", ata.toBase58());
    // console.log(
    //   '🚀 ~ file: sorolan_bridge.ts:84 ~ describe ~ owner:',
    //   owner.toBase58()
    // );

    return ata;
  };

