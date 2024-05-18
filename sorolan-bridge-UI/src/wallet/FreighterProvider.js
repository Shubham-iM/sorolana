import React from 'react';
import { SorobanReactProvider } from '@soroban-react/core';
import { SorobanEventsProvider } from '@soroban-react/events';
import { futurenet, sandbox, standalone } from '@soroban-react/chains';
import { freighter } from '@soroban-react/freighter';
import { ChainMetadata, Connector } from '@soroban-react/types';

const chains= [sandbox, standalone, futurenet];
const connectors= [freighter()];

export default function FreighterProvider({ children }) {
  return (
    <SorobanReactProvider
      chains={chains}
      appName="Example Stellar App"
      autoconnect={false}
      connectors={connectors}
    >
      <SorobanEventsProvider>{children}</SorobanEventsProvider>
    </SorobanReactProvider>
  );
}
