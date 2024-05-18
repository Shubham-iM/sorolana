import {
  Box
} from '@mui/material';
import BridgeAssetNavbar from '@/component/BridgeAssetNavbar';
import ClaimMethods from './ClaimMethods';

function Claim({ setTab, phantomAddr, FreighterAddress, handlePhantomWallet, handleFreighterWallet }) {

  return (
    <>
      <Box sx={{ background: 'black', height: '100vh' }}>
        {/* <BridgeAssetNavbar /> */}
        <ClaimMethods
          setTab={setTab}
          phantomAddr={phantomAddr}
          FreighterAddress={FreighterAddress}
          handlePhantomWallet={handlePhantomWallet}
          handleFreighterWallet={handleFreighterWallet}

        />
      </Box>
    </>
  );
}

export default Claim;
