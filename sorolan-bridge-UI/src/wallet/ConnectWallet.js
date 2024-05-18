import * as React from 'react';
import Button from '@mui/material/Button';
import {Box, Grid, Link, Card, Snackbar, DialogContent} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Container from '@mui/material/Container';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

import frieghter from '@stellar/freighter-api';
// wallet
import {useSorobanReact} from '@soroban-react/core';
import {ConnectButton} from '@soroban-react/connect-button';
import {shortAddress} from '../utils/shortAddress';
import Image from 'next/image';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';

export default function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const [disconnectOpen, setDisconnectOpen] = React.useState(false);
  const [isWallet, setIsWallet] = React.useState(true);
  const [userAddress, setUserAddress] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [sourceValue, setSourceValue] = React.useState('Solana Mainnet');
  const [handleBridge, setHandleBridge] = React.useState('sorolana');

  const {
    connect,
    disconnect,
    address,
    activeConnector,
    connectors,
    activeChain,
    server
  } = useSorobanReact();

  const [openPopup, setOpenPopup] = React.useState(false);

  React.useEffect(() => {
    setWalletAddress();
    return () => {};
  }, [address]);
  const handleShortUserAddress = React.useCallback(
    (addr) => shortAddress(addr ?? ''),
    []
  );

  const handlePopupClose = () => {
    setOpen(false);
  };

  const handleDisconnectPopup = () => {
    setDisconnectOpen(false);
  };

  const handleWalletConnect = async () => {
    try {
      const _networkDetails = await activeConnector?.getNetworkDetails();
      if (_networkDetails) {
        await connect();
        const wallet = await activeConnector?.getPublicKey();
        setOpen(false);
        setIsWallet(true);
      } else {
        setErrorMessage('Install Freighter Wallet!');
      }
    } catch (error) {
      console.log('🚀 ~ handleWalletConnect ~ error', error);
      console.log(error);
    }
  };

  const handlePopUpOpen = () => {
    setOpen(true);
  };

  const handleDisconnectPopUpOpen = () => {
    setDisconnectOpen(true);
  };

  const setWalletAddress = async () => {
    if (address) {
      setIsWallet(true);
      const _addr = shortAddress(address);
      setUserAddress(_addr);
    } else {
      setIsWallet(false);
    }
  };
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsWallet(false);
      setDisconnectOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
    setErrorMessage('');
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <div>
        {isWallet ? (
          <Button
            variant="contained"
            onClick={handleDisconnectPopUpOpen}
            sx={{backgroundColor: 'transparent', border: '1px solid #2695FF'}}
          >
            {handleShortUserAddress(userAddress || '')}
          </Button>
        ) : (
          <Button
            startIcon={
              <Image src="/Frighter.png" alt="img" width={20} height={20} />
            }
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              width: 'max-content',
              paddingLeft: '20px',
              background: 'none',
              textTransform: 'lowercase',
              fontSize: '16px'
            }}
            onClick={handlePopUpOpen}
          >
            Freighter
          </Button>
        )}

        {/* connect wallet popup  */}
        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={handlePopupClose}
          open={open}
          sx={{
            border: '2px solid blue',
            color: '#AEAEAE'
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[500]
            }}
            onClick={handlePopupClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}
          >
            <Box component="img" alt="Sorolana" src="/logo.png" />
          </Typography>

          <Typography
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 2,
              color: '#AEAEAE',
              fontSize: '18px',
              letterSpacing: '1px'
            }}
          >
            Connect Wallet
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: 'black'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Image
                      src={'/rightclick.svg'}
                      alt="img"
                      width={18}
                      height={18}
                    />
                    <Typography
                      variant="body1"
                      sx={{color: '#646464', textAlign: 'center', pl: 1}}
                    >
                      By connecting Solana, accept Sorolana
                    </Typography>
                  </div>
                  <Typography sx={{color: '#078DEE', textAlign: 'center'}}>
                    Terms of Use
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>

          <div
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '46px',
              cursor:'pointer',
              // display: 'flex',
              // justifyContent: 'center',

            }}
          >
            <Grid container spacing={3}
            style={{
    
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          
            }}
            >
              {/* <Grid item xs={6} sm={3} md={3} lg={3}>
                <Paper
                  elevation={3}
                  style={{
                    height: 90,
                    width: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #078DEE',
                    borderRadius: '6px',
                    backgroundColor: 'black'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      alt="Frighter-icon"
                      src="/image40.svg"
                      width={35}
                      height={20}
                    />
                    <Typography
                      variant="body1"
                      sx={{color: 'white', fontSize: '12px', pt: 1}}
                    >
                      Sollet wallet
                    </Typography>
                  </Box>
                </Paper>
              </Grid> */}
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <Paper
                  elevation={3}
                  style={{
                    height: 90,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #078DEE',
                    borderRadius: '6px',
                    backgroundColor: 'black'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                    onClick={() => handleWalletConnect()}
                  >
                    <Box
                      component="img"
                      src="/Frighter.png"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    <Typography
                      variant="body1"
                      sx={{color: 'white', fontSize: '12px', pt: 1}}
                    >
                      Freighter wallet
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              {/* <Grid item xs={6} sm={3} md={3} lg={3}>
                <Paper
                  elevation={3}
                  style={{
                    height: 90,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #078DEE',
                    borderRadius: '6px',
                    backgroundColor: 'black'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      alt="Frighter-icon"
                      src="/image 44.svg"
                      width={35}
                      height={20}
                    />
                    <Typography
                      variant="body1"
                      sx={{color: 'white', fontSize: '12px', pt: 1}}
                    >
                      Solflare wallet
                    </Typography>
                  </Box>
                </Paper>
              </Grid> */}
              {/* <Grid item xs={6} sm={3} md={3} lg={3}>
                <Paper
                  elevation={3}
                  style={{
                    height: 90,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #078DEE',
                    borderRadius: '6px',
                    backgroundColor: 'black'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      alt="image-icon"
                      src="/image 44.svg"
                      width={35}
                      height={20}
                    />
                    <Typography
                      variant="body1"
                      sx={{color: 'white', fontSize: '12px', pt: 1}}
                    >
                      Phantom wallet
                    </Typography>
                  </Box>
                </Paper>
              </Grid> */}
            </Grid>
          </div>

          <Grid
            container
            spacing={2}
            sx={{
              mt: 1,
              mb: 3,
              display: 'grid',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Grid item>
              {errorMessage ? (
                <MuiAlert
                  onClose={handleClose}
                  severity="error"
                  sx={{width: '100%'}}
                >
                  Install Freighter Wallet
                </MuiAlert>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Dialog>

        {/* disconnect wallet popup  */}

        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={handleDisconnectPopup}
          open={disconnectOpen}
        >
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[500]
            }}
            onClick={handleDisconnectPopup}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle>
            <Grid container>
              <Grid item md={12} sm={12} display="flex" justifyContent="center">
                <Box
                  component="img"
                  width={250}
                  alt="Logo"
                  src="/logo/TrilobyteLogo.png"
                />
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container display="flex" justifyContent="center" py={2}>
              <Grid item textAlign="center">
                <Typography sx={{fontSize: '14px'}} color="initial">
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: '1px solid #2695FF'
                  }}
                  variant="h6"
                >
                  {handleShortUserAddress(address) ?? 'Wallet Not Connected'}
                </Typography>
              </Grid>
            </Grid>
            <Grid container pb={2}>
              <Grid item md={4} textAlign="center">
                <Typography sx={{fontSize: '14px'}} color="initial">
                  Status
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    paddingLeft: '5px',
                    color: 'transparent',
                    backgroundColor: 'transparent',
                    border: '1px solid #2695FF'
                  }}
                >
                  {address ? 'Connected' : 'Not Connected'}
                </Typography>
              </Grid>
              <Grid item md={4} textAlign="center">
                <Typography sx={{fontSize: '14px'}} color="initial">
                  Network
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{paddingLeft: '5px'}}
                >
                  {activeChain?.name}
                </Typography>
              </Grid>
              <Grid item md={4} mt={1} textAlign="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
