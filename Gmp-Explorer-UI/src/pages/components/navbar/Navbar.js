import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/brand/GmpLogo.png'
import phantomLogo from '../../../assets/images/phantomLogo.png'
import { NavLink, Link } from 'react-router-dom'
import { useMemo} from 'react';
import { Button } from 'react-bootstrap';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";
import './Navbar.css';
import '@solana/wallet-adapter-react-ui/styles.css';

function Gmpnavbar() {
  return (
    <Navbar expand="lg" className="navbar-component">
      <Container className="navbar-container">
        <Link to="/">
          <img src={Logo} alt='GmpLogo' />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" >
          <span className='navbar-toggle-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-5 ps-2 gap-3 links-div">
            <NavLink to="/">View Transaction</NavLink>
            <NavLink to="/pendingtransaction">Pending Transaction</NavLink>
          </Nav>
          {/* {walletconnected ? 
            <div > <p className='phantom-wallet'> <img src={phantomLogo} alt="phantomLogo"/> 4MhBB........QpZt</p></div>:
            <div> <Button variant="primary" className='phantom-wallet-btn'> Connect wallet</Button></div>
          } */}
          
          <Context>
            <Content  />
          </Context>
      

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Gmpnavbar;

const Context = ({ children }) => {
  // const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const endpoint = "http://localhost:3000"; // local cluster override

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

const Content=() => {
  return (
    <div className="App">
      <WalletMultiButton />
    </div>
  );
}