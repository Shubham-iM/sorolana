import BridgeAssetNavbar from '@/component/BridgeAssetNavbar'
import React, { useState } from 'react'
import BridgeComponent from './BridgeComponent'
import { Box } from '@mui/material'
import Claim from './Claim'
import { useSorobanReact } from '@soroban-react/core';
import { ToastContainer, toast } from 'react-toastify'
export default function Bridge() {
    const { activeConnector, connect, activeChain, chains } = useSorobanReact();
    console.log("activeConnector:", async () => await activeConnector?.getNetworkDetails())
    console.log("chains:", chains)
    console.log("activeChain:", activeChain)

    const [tab, setTab] = useState('bridge')
    console.log("tab:", tab)
    const [phantomAddr, setPhantomAddr] = useState('')
    const [FreighterAddress, setFreighterAddr] = React.useState('');


    // connect phantom wallet
    async function handlePhantomWallet() {
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
        if (provider) {
            try {
                const resp = await provider.connect();
                console.log(resp.publicKey.toString());
                setPhantomAddr(resp.publicKey.toString());
                // setPhantomIsConnect(true)

            } catch (err) {
                console.error(err);
            }
        } else {
            console.error('Phantom wallet not found.');
        }
    }

    //connect freighter wallet
    const CustomToastWithLink = () => (
        <a href="https://sorolana.gitbook.io/sorolana-docs/stellar-futurenet-tests/setting-up-freighter-wallet"
            target='_blank'
        >Your wallet network is not supported Click to setup</a>
    );
    const handleFreighterWallet = async () => {
        try {
            const _networkDetails = await activeConnector?.getNetworkDetails();
            console.log("_networkDetails:", _networkDetails)
            let _networkUrl = _networkDetails?.networkUrl
            if (_networkUrl !== 'https://horizon-futurenet.stellar.org') toast.error(CustomToastWithLink, {
                style: {
                    fontSize: '14px'
                }
            })
            // toast.error("Your wallet network is not supported")
            if (_networkDetails) {
                await connect();
                const wallet = await activeConnector?.getPublicKey();
                setFreighterAddr(wallet.toString());
                return true;
                // setFreighterIsConnect(true)
            } else {
                setErrorMessage('Install Freighter Wallet!');
                return false
            }
        } catch (error) {
            console.log("error:", error)
            let _pa = JSON.stringify(error)
            console.log("_pa:", _pa)
            let _pp = JSON.parse(_pa)
            console.log("_pp:", _pp)
            // console.log('🚀 ~ handleFreighterWallet ~ error', error);
            // toast.error('error')
        }
    };

    return (
        <>
            {/* <ToastContainer /> */}
            <Box sx={{ background: 'black', height: '100vh' }}>
                <BridgeAssetNavbar
                    tab={tab}
                    setTab={setTab}
                    phantomAddr={phantomAddr}
                    FreighterAddress={FreighterAddress}
                    handlePhantomWallet={handlePhantomWallet}
                    handleFreighterWallet={handleFreighterWallet}
                />
                {tab == 'bridge' ?
                    <BridgeComponent
                        phantomAddr={phantomAddr}
                        FreighterAddress={FreighterAddress}
                        handlePhantomWallet={handlePhantomWallet}
                        handleFreighterWallet={handleFreighterWallet}
                        setTab={setTab}
                    />
                    :
                    <Claim
                        setTab={setTab}
                        phantomAddr={phantomAddr}
                        FreighterAddress={FreighterAddress}
                        handlePhantomWallet={handlePhantomWallet}
                        handleFreighterWallet={handleFreighterWallet}

                    />
                }
            </Box>
        </>
    )
}
