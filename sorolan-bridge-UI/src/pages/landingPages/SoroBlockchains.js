import React from "react";
import { Card, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
function SoroBlockchains() {
  return (
    <>
      <Box sx={{ paddingTop: 5,paddingX:{xs:5,sm:10,md:12,lg:12},paddingBottom:11 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <Box
              sx={{
                pt: 4,
                width: "100%",
                textAlign: "center",
              }}
              component="img"
              alt="sorolana"
              src="../soroworld.png"
            /> */}
  <Box
               sx={{
                pt: 4,
                width:{xs:"80%",sm:"80%", md:"90%", lg:'100%',xl:'100%'},
                ml:{xs:0,lg:4} ,
                pb:4,
              
              }}
              component="img"
              alt="sorolana"
              src="../soroworld.png"
            /> 
    
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: {xs:0,sm:0,md:"0 2rem"},
              }}
            >
              <Typography
                className="fontFamily"
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: "1.75rem",
                  marginBottom: "1rem",
                }}
              >
                Sorolana brings the best of both worlds
              </Typography>
              <Typography
                variant="h6"
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                Sorolana offers a seamless bridge that enables the exchange of
                Soroban assets to Solana and facilitates a true cross-chain DeFi
                ecosystem. Our bridge protocol ensures a safe and efficient
                transfer of assets, while our platform's integration with
                Solana's DeFi ecosystem enables users to participate in various
                DeFi applications and earn yield on their Soroban assets. With
                our platform, users can easily access the benefits of both
                Soroban and Solana, and enjoy a seamless cross-chain experience.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ pt: 10 }}>
          <Grid item xs={12} sm={4} sx={{ borderTop: 1, borderColor: "white" }}>
            <Card
              sx={{
                borderRight: {xs:0,sm:1,md:1,lg:1},
                borderColor:{sm:"white",md:"white",lg:"white"},
                borderRadius: 10,
                backgroundColor: "transparent",
                height: "100%",
              }}
            >
              <Container>
                <Typography
                  className="fontFamily"
                  variant="h6"
                  sx={{ color: "white", paddingTop: 2, paddingLeft: 3.5 }}
                >
                  Steller
                </Typography>
                <List
                  className="fontLatto"
                  sx={{
                    pt: 2,
                    color: "white",
                    fontSize: "14px",
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>Trusted Network for moving money</ListItem>
                  <ListItem>
                    Proven Anchor ecosystem for On and Off Ramp
                  </ListItem>
                  <ListItem>Transaction Speed</ListItem>
                </List>
              </Container>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ borderTop: 1, borderColor: "white" }}>
            <Card
              sx={{
                borderLeft: {xs:0,sm:1,md:1,lg:1},
                borderRight:  {xs:0,sm:1,md:1,lg:1},
                borderColor:{sm:"white",md:"white",lg:"white"},
                borderRadius: 10,
                backgroundColor: "transparent",
                height: "100%",
              }}
            >
              <Container>
                <Typography
                  className="fontFamily"
                  variant="h6"
                  sx={{ color: "white", paddingTop: 2, paddingLeft: 3.5 }}
                >
                  Soroban
                </Typography>
                <List
                  className="fontLatto"
                  sx={{
                    pt: 2,
                    color: "white",
                    fontSize: "14px",
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>Scalable smart contract platform</ListItem>
                  <ListItem>Seamless Stellar interoperability</ListItem>
                </List>
              </Container>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ borderTop: 1, borderColor: "white" }}>
            <Card
              sx={{
                borderLeft: {xs:0,sm:1,md:1,lg:1},
                borderColor:{sm:"white",md:"white",lg:"white"},
                borderRadius: 10,
                backgroundColor: "transparent",
                height: "100%",
              }}
            >
              <Container>
                <Typography
                  variant="h6"
                  sx={{ color: "white", paddingTop: 2, paddingLeft: 3.5 }}
                >
                  Solana
                </Typography>
                <List
                  className="fontLatto"
                  sx={{
                    pt: 2,
                    color: "white",
                    fontSize: "14px",
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>NFT ecosystem</ListItem>
                  <ListItem>DeFi ecosystem</ListItem>
                </List>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SoroBlockchains;
