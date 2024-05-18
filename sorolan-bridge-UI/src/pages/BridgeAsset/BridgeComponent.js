import { Container, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import BridgeAssetNavbar from "@/component/BridgeAssetNavbar";
import Deposit from "./Deposit";

function BridgeComponent({
  handlePhantomWallet, handleFreighterWallet,
  phantomAddr,
  FreighterAddress,
  setTab
}) {
  const [handleBridge, setHandleBridge] = useState("soroban");
  return (
    <>
      {console.log("brdige section nest")}
      <Container
        sx={{ pt: 13, display: "grid", justifyContent: "center", pb: 2 }}
      >
        <Typography
          variannt="h6"
          sx={{
            color: "white",
            fontSize: { xs: "24px", sm: "28px", md: "30px" },
            pt: { xs: 2, sm: 4, md: 5 },
            textAlign: "center",
          }}
        >
        </Typography>
        <>
          <Deposit
            phantomAddr={phantomAddr}
            handleBridge={handleBridge}
            setHandleBridge={setHandleBridge}
            FreighterAddress={FreighterAddress}
            handlePhantomWallet={handlePhantomWallet}
            handleFreighterWallet={handleFreighterWallet}
            setTab={setTab}
          />
        </>
      </Container>
    </>
  );
}

export default BridgeComponent;
