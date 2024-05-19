# Sorolana Bridge

Sorolana is a highly secure bridge that facilitates the transfer of assets between Soroban and Solana blockchains. It employs trustless protocols and smart contracts for security, ensuring assets are safely locked and verified. This bridge leverages Solana’s high speed and low costs for efficient transfers. Sorolana enhances interoperability and asset utilization across both blockchain ecosystems.

## Description

Sorolana is a highly secure, decentralized bridge designed to move assets from the Soroban blockchain, which brings smart contract capabilities to the Stellar ecosystem, to the fast and scalable Solana blockchain. Soroban offers real-time transactions and improved security but is still relatively new and untested. Solana processes thousands of transactions per second but has concerns about centralization and uptime consistency. Sorolana leverages Solana's speed while maintaining Soroban's security, providing an efficient, trustless protocol for asset transfers between these two ecosystems.

The Sorolana bridge facilitates the movement of assets and tokens between different blockchain networks through a secure and efficient process. Its operation can be summarized into four key steps: locking on the source chain, claiming/minting on the destination chain, burning on the destination chain, and releasing back on the source chain. Here's how the bridge works in a user-friendly, point-by-point manner:

### Locking on the Source Chain
Users initiate the asset transfer by locking their assets on the source chain (Soroban). This step freezes the assets, ensuring their security during the transaction process.

### Claiming/Minting on the Destination Chain
After assets are locked on the source chain, users proceed to the destination chain (Solana) to claim or mint their equivalent wrapped assets. This action makes the assets available for use on the destination chain.

### Burning on the Destination Chain
To return assets to the source chain, users initiate the burning process on the destination chain. Burning destroys the wrapped assets, marking them as irretrievable on the destination chain.

### Releasing Back on the Source Chain
Once assets are burned on the destination chain, they are released back to the source chain. Users regain access to their original assets, which can then be utilized as needed.

## The Sorolana Bridge Project

The Sorolana Bridge Project is designed to facilitate secure and efficient cross-chain asset transfers between the Soroban and Solana blockchains. The project comprises three main components:

### GMP UI Explorer
This component provides a user interface to explore transactions, displaying details such as from/to addresses and signatures.

### Sorolana Bridge UI
This user interface allows users to transfer assets between accounts on the Soroban and Solana blockchains.

### Sorolana Backend
The backend service listens for events related to transactions and validates them.

### Installation and Setup
### GMP UI Explorer

1. Navigate to the `gmp-ui-explorer` directory.
   ```bash
   cd gmp-ui-explorer
2.Install the dependencies.
```bash
npm install
3.Start the GMP Explorer.
```bash
npm start

### Sorolana Bridge UI

1. Navigate to the sorolana-bridge-ui directory.
   ```bash
  cd ../sorolana-bridge-ui

2.Install the dependencies.
 npm install
3.Start the Sorolana Bridge UI.
npm run dev

###  Sorolana Backend

1.Navigate to the sorolana-backend directory.
cd ../sorolana-backend
2.Install the dependencies for the GMP node.
cd GMP-node
npm install
->Run the deposit event listener script to listen for transactions.
->node SorobanEventsFunctions/depositEvent.js
->Open another terminal in the same directory and run the validator script.
node validator1.js

### Sorolana product demo
   https://drive.google.com/file/d/1qzZqTWrLAJIlmh1LdrNtBKFQH9hgbF6q/view?usp=sharing
