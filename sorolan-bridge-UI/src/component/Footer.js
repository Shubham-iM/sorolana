import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          pt: 5,
          paddingBottom: 8,
          paddingX: { xs: 5, sm: 5, md: 5, lg: 6 },
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              onClick={() => router.push("/")}
              alt="logo"
              src="logo.png"
              sx={{
                width: { xs: "115px", sm: "160px", md: "200px" },
                cursor: "pointer",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                pt: { xs: 0 },
              }}
            >
              <Typography
                className="fontPoppin"
                variant="body2"
                sx={{
                  color: "#B3B3B3",
                  paddingLeft: { xs: 2, sm: 2, md: 3 },
                  fontSize: { xs: "8px", sm: "10px", md: "14px" },
                }}
              >
                Disclaimer
              </Typography>
              <Typography
                className="fontPoppin"
                variant="body2"
                sx={{
                  color: "#B3B3B3",
                  paddingLeft: { xs: 2, sm: 2, md: 3 },
                  fontSize: { xs: "8px", sm: "10px", md: "14px" },
                }}
              >
                Privacy And GDPR Policy
              </Typography>
              <Typography
                className="fontPoppin"
                variant="body2"
                sx={{
                  color: "#B3B3B3",
                  paddingLeft: { xs: 2, sm: 2, md: 3 },
                  fontSize: { xs: "8px", sm: "10px", md: "14px" },
                }}
              >
                Terms And Conditions
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            className="fontPoppin"
            sx={{
              paddingLeft: { xs: 2, sm: 0, md: 0 },
              marginTop: { xs: "10px", sm: 0, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "flex-start",
                  sm: "flex-end",
                  md: "flex-end",
                  lg: "flex-end",
                },
                color: "#6E6E6E",
              }}
            >
              <a href="https://discord.gg/R5pR4bD9" target="_blank">
                <Icon icon="ic:baseline-discord" className="icon1" width={30} />
              </a>
              <a href="https://twitter.com/iMentus_tech" target="_blank">
                <Icon icon="mdi:twitter" width={30} />
              </a>
            </Box>
            <Typography
              className="fontPoppin"
              variant="body2"
              sx={{
                color: "#FFFFFF",
                textAlign: { xs: "start", sm: "end" },
                paddingTop: { xs: 1, sm: 0, md: 1 },
                fontSize: { xs: "8px", sm: "12px", md: "14px" },
              }}
            >
              Have Any Question?
            </Typography>
            <Typography
              className="fontLatto"
              variant="body2"
              sx={{
                color: "#B3B3B3",
                textAlign: { xs: "start", sm: "end" },
                paddingTop: { xs: 1, sm: 0, md: 1 },
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
              }}
            >
              Copyright © 2023 All rights reserved. Sorolana
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Footer;
