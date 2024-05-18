import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import ConnectWallet from "@/wallet/ConnectWallet";
import { useRouter } from "next/router";

const pages = ["GmpExplorer"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  console.log("navbar");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ marginX: { xs: 4, sm: 6, md: 8 } }}>
      {/* <AppBar
        className="mainBorder"
        sx={{
          background: 'black',
          borderBottomColor: 'white'
        }}
        position="sticky"
      >
        {/* <Toolbar disableGutters className="appBar">
          <Grid>

          </Grid>
          <Box
            onClick={() => router.push('/')}
            component="img"
            alt="Sorolana"
            src="logo.png"
            sx={{
              width: {
                xs: '115px',
                sm: '160px',
                md: '200px',
                lg: '210px',
                cursor: 'pointer'
              }
            }}
          />

          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Link href="BridgeAsset/Bridge">
              <Button
                variant="outlined"
                sx={{
                  display: {xs: 'none', sm: 'none', md: 'grid'},
                  borderRadius: 2,
                  backgroundColor: 'transparent',
                  border: 1,
                  borderColor: 'white',
                  color: 'white',
                  textTransform: 'capitalize',
                  px: 5,
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'white'
                  }
                }}
              >
                Get started
              </Button>
            </Link>
          </Box>
        </Toolbar> */}
      {/* </AppBar> */}
      <AppBar
        position="static"
        className="mainBorder"
        sx={{
          background: "black",
          borderBottomColor: "white",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Box
              onClick={() => router.push("/")}
              component="img"
              alt="Sorolana"
              src="logo.png"
              sx={{
                width: {
                  xs: "115px",
                  sm: "160px",
                  md: "200px",
                  lg: "210px",
                  cursor: "pointer",
                },
              }}
            />
          </Typography>
          <Link href="BridgeAsset/Bridge">
            <Button
              variant="outlined"
              sx={{
                display: { xs: "grid", sm: "grid", md: "grid" },
                borderRadius: 2,
                marginRight: 2,
                backgroundColor: "transparent",
                border: 1,
                borderColor: "white",
                color: "white",
                textTransform: "capitalize",
                px: { xs: 1, sm: 2, md: 5 },
                py: { xs: 2, sm: "5px", md: "5px" },
                fontSize: { xs: "12px", sm: "16px", md: "1rem" },
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
            >
              Get Started
            </Button>
          </Link>
          <Link
            href="https://sorolana.gitbook.io/sorolana-docs/"
            target="_blank"
          >
            <Button
              variant="outlined"
              sx={{
                display: { xs: "grid", sm: "grid", md: "grid" },
                borderRadius: 2,
                marginRight: 2,
                backgroundColor: "transparent",
                border: 1,
                borderColor: "white",
                color: "white",
                textTransform: "capitalize",
                px: { xs: 2, sm: 2, md: 3 },
                py: { xs: 2, sm: "5px", md: "5px" },
                fontSize: { xs: "12px", sm: "16px", md: "1rem" },
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
            >
              DOCS
            </Button>
          </Link>
          <Link href="https://discord.gg/R5pR4bD9" target="_blank">
            <Button
              variant="outlined"
              sx={{
                display: { xs: "grid", sm: "grid", md: "grid" },
                borderRadius: 2,
                backgroundColor: "transparent",
                border: 1,
                borderColor: "white",
                color: "white",
                textTransform: "capitalize",
                px: { xs: 2, sm: 2, md: 3 },
                py: { xs: 2, sm: "5px", md: "5px" },
                fontSize: { xs: "12px", sm: "16px", md: "1rem" },
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
            >
              DISCORD
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
