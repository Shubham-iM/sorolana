import { useSorobanReact } from '@soroban-react/core';
import { myChain } from '../provideWalletChains';

export function useNetwork() {
  const { activeChain, server } = useSorobanReact();
  return {
    activeChain,
    server,
    chains: Object.values(myChain),
  };
}
