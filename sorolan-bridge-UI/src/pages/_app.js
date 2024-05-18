import "@/styles/globals.css";
import FreighterProvider from "@/wallet/FreighterProvider";
import "react-toastify/dist/ReactToastify.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import dynamic from "next/dynamic";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
}from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo } from "react";
const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);
export default function App({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new PhantomWalletAdapter()
    ],
    [network]
  );
  const walletConnectionError = (error) => {
    console.log("Wallet Connection Error:\n", error);
    // console.log('Wallet Connection Error:\n', WalletError);
  };
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        {/* <WalletProvider wallets={wallets} autoConnect> */}
        <WalletProvider
          wallets={wallets}
          onError={walletConnectionError}
          autoConnect={true}
        >
          <WalletModalProvider>
            <ReactUIWalletModalProviderDynamic>
              <FreighterProvider>
                <Component {...pageProps} />;
              </FreighterProvider>
            </ReactUIWalletModalProviderDynamic>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
