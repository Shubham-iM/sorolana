// import {
//   Container,
//   Card,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   IconButton,
// } from "@mui/material";
// import React from "react";

// function FollowUpdateCard() {
//   return (
//     <>
//        <Container sx={{ padding: 2 }}>
//       <Card
//         sx={{
//           border: 1,
//           borderColor: '#1F8BF4',
//           backgroundColor: '#050B14',
//           borderRadius: 5,

//         }}
//       >
//         <Grid container>
//           <Grid item xs={12} md={5} sx={{ padding: 2 }}>
//             <Typography
//               className="fontFamily"
//               variant="h6"
//               sx={{ color: 'white', fontSize: '3rem', textAlign: 'left'}}
//             >
//               Follow
//               <br />
//               Our Update
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={7} sx={{ padding: 2 }}>
//             <Typography
//               className="fontLatto"
//               variant="body2"
//               sx={{
//                 color: 'white',
//                 fontSize: '1rem',

//                 paddingLeft: 2,
//                 paddingTop: 1,
//               }}
//             >
//               Join our community and be the first to know about our new fractures,
//               new farming pools, and latest updates.
//             </Typography>

//             <Box

//               sx={{
//                 paddingTop: 3,
//                 display: 'flex',
//                 justifyContent: { xs: 'start', md: 'start' },
//                 alignItems: 'center',
//                 ml:2,

//               }}
//             >
//               <Button
//                 className="fontLatto"
//                 variant="outlined"

//                 sx={{
//                   borderColor: 'white',
//                   color: 'white',
//                   textTransform: 'capitalize',
//                   px: 3,
//                   mr: { xs: 2,},
//                   mb: { xs: 2, md: 0 },
//                 }}
//               >
//                 <img
//                   src="telegramIcon.png"
//                   alt="telegram"
//                   style={{ marginRight: '8px' }}

//                 />
//                 Join Telegram
//               </Button>
//               <Button
//                 className="fontLatto"
//                 variant="outlined"
//                 sx={{
//                   borderColor: 'white',
//                   color: 'white',
//                   textTransform: 'capitalize',
//                   px: 3,
//                   mr: { xs: 0, md: 2 },
//                   mb: { xs: 2, md: 0 },

//                 }}
//               >
//                 <img
//                   src="twitter.png"
//                   alt="twitter"
//                   style={{ marginRight: '8px' }}
//                 />
//                 Join Twitter
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Card>
//     </Container>
//     </>
//   );
// }

// export default FollowUpdateCard;

import { Container, Card, Grid, Typography, Box, Button } from "@mui/material";
import React from "react";

function FollowUpdateCard() {
  return (
    <Box sx={{ padding: [2, 3, 4] }}>
      <Box sx={{ paddingX: { xs: 2, sm: 8, md: 10, lg: 12 } }}>
        <Card
          sx={{
            border: 1,
            borderColor: "#1F8BF4",
            backgroundColor: "#050B14",
            borderRadius: 5,
            minHeight: { xs: 200, sm: 120, lg: 220 },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={5} sx={{ p: [2, 3, 5] }}>
              <Typography
                className="fontFamily"
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: { xs: "rem", md: "3rem" },
                  marginLeft: "20px",
                  textAlign: "left",
                }}
              >
                Follow
                <br />
                Our Update
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} sx={{ p: [2, 3, 5] }}>
              <Typography
                className="fontLatto"
                variant="body2"
                sx={{
                  color: "white",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  paddingLeft: 2,
                  paddingTop: 1,
                }}
              >
                Join our community and be the first to know about our new
                fractures, new farming pools, and latest updates.
              </Typography>

              <Box
                sx={{
                  paddingTop: 3,
                  display: "flex",
                  justifyContent: { xs: "start", md: "start" },
                  alignItems: "center",
                  ml: 2,
                }}
              >
                <a href="https://t.me/+uQJg8pcStnU2OGJl" target="_blank">
                  <Button
                    className="fontLatto"
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      textTransform: "capitalize",
                      width: "160px",
                      px: 2,
                      mr: { xs: 2 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <img
                      src="telegram.svg"
                      alt="telegram"
                      style={{ marginRight: "8px" }}
                    />
                    Join Telegram
                  </Button>
                </a>
                <a href="https://twitter.com/iMentus_tech" target="_blank">
                  <Button
                    className="fontLatto"
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      textTransform: "capitalize",
                      width: "160px",
                      px: 3,
                      mr: { xs: 0, md: 2 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <img
                      src="twitter.svg"
                      alt="twitter"
                      style={{ marginRight: "8px" }}
                    />
                    Join Twitter
                  </Button>
                </a>
                <a href="https://discord.com/invite/R5pR4bD9" target="_blank">
                  <Button
                    className="fontLatto"
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      textTransform: "capitalize",
                      width: "160px",
                      px: 3,
                      mr: { xs: 0, md: 2 },
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <img
                      src="discord.svg"
                      alt="discord"
                      style={{
                        marginRight: "8px",
                        filter:
                          "brightness(0) invert(1) grayscale(1) contrast(8)",
                      }}
                      width="18"
                      height="17"
                    />
                    Join Discord
                  </Button>
                </a>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

export default FollowUpdateCard;
