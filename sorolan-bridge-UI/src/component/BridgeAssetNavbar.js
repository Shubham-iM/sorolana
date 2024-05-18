import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSorobanReact } from '@soroban-react/core';

function BridgeAssetNavbar({ tab, setTab, handlePhantomWallet, phantomAddr, FreighterAddress, handleFreighterWallet }) {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null);
  // const [phantomAddr, setPhantomAddr] = React.useState('');
  const [PhantomIsConnect, setPhantomIsConnect] = React.useState(false)
  // const [FreighterAddress, setFreighterAddr] = React.useState('');
  const [FreighterIsConnect, setFreighterIsConnect] = React.useState(false)
  const { activeConnector, connect } = useSorobanReact();




  //connect phantom wallet
  async function handlePhantomWalle() {
    await handlePhantomWallet()
  }
  async function handleFreighterWalletConnect() {
    handleFreighterWallet()
  }

  //connect freighter wallet
  // const handleFreighterWallet = async () => {
  //   try {
  //     const _networkDetails = await activeConnector?.getNetworkDetails();
  //     if (_networkDetails) {
  //       await connect();
  //       const wallet = await activeConnector?.getPublicKey();
  //       setFreighterAddr(wallet.toString());
  //       setFreighterIsConnect(true)
  //     } else {
  //       setErrorMessage('Install Freighter Wallet!');
  //     }
  //   } catch (error) {
  //     console.log('🚀 ~ handleFreighterWallet ~ error', error);
  //     console.log(error);
  //   }
  // };

  //disconnect phantom wallet
  const disconnectPhantomWallet = async () => {
    setPhantomAddr('');
    setPhantomIsConnect(false)

  }
  //disconnect freighter wallet
  const disconnectFreighterWallet = async () => {
    setFreighterAddr('');
    setFreighterIsConnect(false)

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar
      sx={{
        background: 'black',
        paddingX: 5,
        borderBottom: 1,
        borderBottomColor: 'white'
      }}
    >
      
      <Toolbar disableGutters>
        <Box
          component="img"
          alt="Sorolana"
          src="../logo.png"
          onClick={() => router.push('/')}
          sx={{
            width: { xs: '145px', sm: '160px', md: '200px', lg: '210px' },
            cursor: 'pointer'
          }}
        />


        <Box
          sx={{
            // display: "flex",
            display: { xs: 'flex', sm: 'flex', md: 'none' },
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexGrow: 1
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              marginLeft: 'auto'
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Button

                onClick={() => setTab('bridge')}

                sx={{ color: '#fff' }}>
                Bridge
              </Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              {' '}
              <Button  sx={{ color: '#ffffff73', cursor: "default" }} >
                History
              </Button>
            </MenuItem>
            <MenuItem>
              <Button

                onClick={() => setTab('claim')}

                sx={{ color: '#fff' }}>
                Claim
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClick}>
              <Button href='https://sorolana.gitbook.io/sorolana-docs/' target='_blank' sx={{ color: '#fff' }} >DOCS</Button>
            </MenuItem>
            <MenuItem onClick={handleClick}>
              <Button sx={{ color: '#fff' }}>Connect Wallet</Button>
            </MenuItem>
          </Menu>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            mt: 1,
            mx: 5
          }}
        >
          {/* <Link href="Bridge"> */}
          <Button
            className="fontLatto"
            // onClick={handleCloseNavMenu}
            onClick={() => setTab('bridge')}

            sx={{ color: 'white', display: 'block', borderBottom: tab == 'bridge' ? ' 1px solid blue' : '', borderRadius: '0px' }}
          >
            Bridge
          </Button>
          {/* </Link> */}


          {/* <Link href="/BridgeAsset/TransactioHistory"> */}
          <Button
            className="fontLatto"
            // onClick={handleCloseNavMenu}

            sx={{ color: '#ffffff73', display: 'block', cursor: "default" }}
          >
            History
          </Button>
          {/* </Link> */}
          {/* <Link href="Claim"> */}
          <Button
            className="fontLatto"
            // onClickFrighterIsConnect={handleCloseNavMenu}
            onClick={() => setTab('claim')}
            sx={{ color: 'white', display: 'block', borderBottom: tab === 'claim' ? '1px solid blue' : '', borderRadius: '0px' }}
          >
            Claim
          </Button>
          {/* </Link> */}
          <Link href='https://sorolana.gitbook.io/sorolana-docs/'
            target='_blank'
          >

            <Button


              className="fontLatto"
              // onClickFrighterIsConnect={handleCloseNavMenu}
              // onClick={() => setTab('claim')}
              sx={{ color: 'white', display: 'block' }}
            >
              DOCS
            </Button>
          </Link>
          <Link href='https://discord.gg/R5pR4bD9'
            target='_blank'
          >

            <Button


              className="fontLatto"
              // onClickFrighterIsConnect={handleCloseNavMenu}
              // onClick={() => setTab('claim')}
              sx={{ color: 'white', display: 'block' }}
            >
              DISCORD
            </Button>
          </Link>
          {/* <Link href='https://gmp.xqutus.com/pendingtransaction#' */}
          <Link href='http://localhost:3001/pendingtransaction'
            target='_blank'
          >

            <Button 


              className="fontLatto"
              // onClickFrighterIsConnect={handleCloseNavMenu}
              // onClick={() => setTab('claim')}
              sx={{ color: 'white', display: 'block' }}
            >
              Gmp-Explorer
            </Button>
          </Link>

        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            mt: 1,
            mx: 5
          }}
        >
          <Box
            sx={{
              width: 'auto',
              minWidth: '50px',
              paddingX: { xs: 0, sm: 1, md: 1 },
              height: 'fit-content',
              display: 'flex',
              alignItems: 'center'

            }} FrighterIsConnect
          ></Box>

          <Box
            sx={{
              width: 'auto',
              minWidth: '50px',
              paddingX: 1,
              height: 'fit-content',
              display: 'flex',
              alignItems: 'center'
            }}
          ></Box>

          <FormControl fullWidth>
            <Button
              startIcon={
                <Image src={'/wallet.svg'} alt="img" width={16} height={16} />
              }
              sx={{
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
                alignItems: 'center',
                border: '1px solid #2695FF',
                color: 'white',
                width: '180px',
                // paddingLeft: '15px',
                background: 'none',
                padding: '10px 10px',
                fontSize: '0.8rem'
              }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {phantomAddr || FreighterAddress ? 'Connected' : 'Connect Wallet'}

              {/* <span style={{ display: 'grid' }}>

                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ paddingTop: '5px', paddingRight: '2px' }}>
                    <Image src={'/Phantom.svg'} alt="img" width={16} height={16} />
                  </span>
                  <span style={{ fontSize: '13px' }}>
                    {phantomAddr ? phantomAddr?.substring(0, 4) + '.....' +
                      phantomAddr?.substring(40, 44)
                      : "Connect wallet"}
                  </span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid white' }} >
                  <span style={{ paddingTop: '5px', paddingRight: '2px' }}>
                    <Image src={'/Frighter.png'} alt="img" width={16} height={16} />

                  </span>
                  <span style={{ fontSize: '13px' }}>
                    {FreighterAddress ?
                      FreighterAddress?.substring(0, 4) + "....." +
                      FreighterAddress?.substring(40, 44)
                      : "Connect Wallet"}</span>

                </span>
              </span> */}
              {/* Connect Wallet */}
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                sx={{
                  width: '180px', color: 'white', backgroundColor: 'black', '&:hover': {
                    background: 'black'
                  }
                }}

              >
                <ListItemIcon>
                  <Box
                    sx={{ pr: 1 }}
                    component="img"
                    alt="solana-icon"
                    src="/Phantom.svg"
                    width={35}
                    height={20}
                  />
                </ListItemIcon>
                <ListItemText onClick={PhantomIsConnect ? disconnectPhantomWallet : handlePhantomWalle}>
                  {phantomAddr ? (
                    <>
                      {phantomAddr?.substring(0, 4)}.....
                      {phantomAddr?.substring(40, 44)}
                    </>
                  ) : (
                    'Phantom'
                  )}
                </ListItemText>
              </MenuItem>
              <Divider className="divider" />
              <MenuItem sx={{ width: '180px', color: 'white', backgroundColor: 'black' }}>
                <ListItemIcon>
                  <Box
                    sx={{ pr: 2 }}
                    component="img"
                    alt="Frighter-icon"
                    src="/Frighter.png"
                    width={35}
                    height={20}
                  />
                </ListItemIcon>
                <ListItemText onClick={FreighterIsConnect ? disconnectFreighterWallet : handleFreighterWalletConnect}>
                  {FreighterAddress ? (
                    <>
                      {FreighterAddress?.substring(0, 4)}.....
                      {FreighterAddress?.substring(40, 44)}
                    </>
                  ) : (
                    'Freighter'
                  )}
                </ListItemText>
              </MenuItem>
            </Menu>

            <Select
              sx={{
                border: '1px solid blue',
                color: 'white',
                display: 'none'
              }}
              value={selectedOption}
            ></Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default BridgeAssetNavbar;