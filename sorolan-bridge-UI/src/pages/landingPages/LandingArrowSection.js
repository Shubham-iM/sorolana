// import React from "react";
// import { Card, Container, Typography, Grid, Box } from "@mui/material";
// import SouthEastIcon from "@mui/icons-material/SouthEast";
// function LandingArrowSection() {
//   return (
//     <>
//       <Container sx={{ py: 5 }}>
//         <Card
//           sx={{
//             backgroundColor: "#050B14",
//             border: 1,
//             borderColor: "#1F8BF4",
//             borderRadius: 4,
//             paddingBottom: 3,
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Typography
//                 className="fontFamily"
//                 variant="body2"
//                 sx={{
//                   color: "white",
//                   fontSize: "20px",
//                   paddingX: 8,
//                   pt: 5,
//                 }}
//               >
//                 {" "}
//                 Empower Soroban tokens with Solana’s proven NFT and DeFi
//                 ecosystem
//               </Typography>

//               <Box sx={{ pt: 10, textAlign: "center" }}>
//                 <SouthEastIcon
//                   sx={{
//                     color: "#2695FF",
//                     fontSize: 100,
//                     marginRight: 20,
//                   }}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={6}>
//               <Grid container sx={{ paddingTop: 5 }}>
//                 <Grid item xs={6} sx={{ borderRight: 4, borderColor: "blue" }}>
//                   <Typography
//                     variant="h6"
//                     className="fontFamily"
//                     sx={{
//                       color: "white",
//                       fontSize: "25px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {" "}
//                     132,875
//                   </Typography>
//                   <Typography
//                     className="fontLatto"
//                     variant="body2"
//                     sx={{
//                       color: "white",
//                       fontSize: "16px",
//                       textAlign: "center",
//                       fontWeight: "500",
//                     }}
//                   >
//                     {" "}
//                     Transaction
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography
//                     variant="h6"
//                     className="fontFamily"
//                     sx={{
//                       color: "white",
//                       fontSize: "25px",
//                       textAlign: "center",
//                       fontFamily: "fontFamily",
//                     }}
//                   >
//                     {" "}
//                     $ 101,153.12
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="fontLatto"
//                     sx={{
//                       color: "white",
//                       fontSize: "16px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {" "}
//                     Value
//                   </Typography>
//                 </Grid>
//               </Grid>

//               <Grid container sx={{ paddingTop: 8 }}>
//                 <Grid item xs={6}>
//                   <Typography
//                     variant="h6"
//                     className="fontFamily"
//                     sx={{
//                       color: "white",
//                       fontSize: "25px",
//                       textAlign: "center",
//                     }}
//                   >
//                     $ 0.0078
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="fontLatto"
//                     sx={{
//                       color: "white",
//                       fontSize: "16px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {" "}
//                     Lowest Trade Fee
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography
//                     variant="h6"
//                     className="fontFamily"
//                     sx={{
//                       color: "white",
//                       fontSize: "25px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {" "}
//                     100%
//                   </Typography>
//                   <Typography
//                     className="fontLatto"
//                     variant="body2"
//                     sx={{
//                       color: "white",
//                       fontSize: "16px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {" "}
//                     Bridge Fee Cashback
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Card>
//       </Container>
//     </>
//   );
// }

// export default LandingArrowSection;

import { Card, Typography, Grid, Box } from '@mui/material';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const initialNumber = 0.0550;
const targetNumber = 0.0078;
const delay = 1;
const duration = 10;
const LandingArrowSection = () => {
  const [number, setNumber] = useState(0);
  
  const numberAnimation = useSpring({
    from: { number: 0 },
    to: { number },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prevNumber) => prevNumber + 2);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      mt={3}
      sx={{
        marginX: { xs: 5, sm: 8, md: 10, lg: 12 },
      }}
    >
      <Card
        sx={{
          backgroundColor: '#050B14',
          border: 1,
          borderColor: '#1F8BF4',
          borderRadius: 4,
          paddingBottom: 3,
          marginTop: { xs: 4, sm: 4, md: 10, lg: 10 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              className="fontFamily"
              variant="body2"
              sx={{
                color: 'white',
                fontSize: { xs: '14px', sm: '18px', md: '20px', lg: '22px' },
                paddingX: { xs: 3, sm: 5, md: 8 },
                pt: { xs: 2, sm: 5, md: 5 },
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              Empower Soroban tokens with Solana’s proven NFT and DeFi ecosystem
            </Typography>

            <Box sx={{ pt: { xs: 2, sm: 3, md: 5, lg: 5 }, textAlign: 'center' }}>
              <SouthEastIcon
                sx={{
                  color: '#2695FF',
                  fontSize: [60, 100],
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container sx={{ pt: { md: 5, lg: 5 } }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h6"
                  className="fontFamily"
                  sx={{
                    fontSize: ['20px', '25px'],
                    textAlign: 'center',
                  }}
                >
                  <animated.span
                   style={{ color: 'white' }} 
                  >
                  
                    {numberAnimation.number.to((val) => Math.floor(val).toLocaleString())}
                  </animated.span>
                </Typography>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: ['12px', '18px'],
                    textAlign: 'center',
                    fontWeight: '500',
                  }}
                >
                  Transaction
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h6"
                  className="fontFamily"
                  sx={{
                    color: 'white',
                    fontSize: ['20px', '25px'],
                    textAlign: 'center',
                    fontFamily: 'fontFamily',
                    pt: { xs: 3, sm: 0, lg: 0 },
                  }}
                >
                  $ 101,153.12
                </Typography>
                <Typography
                  variant="body2"
                  className="fontLatto"
                  sx={{
                    color: 'white',
                    fontSize: ['12px', '18px'],
                    textAlign: 'center',
                  }}
                >
                  Value
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ paddingTop: 2 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h6"
                  className="fontFamily"
                  sx={{
                    color: 'white',
                    fontSize: ['20px', '25px'],
                    textAlign: 'center',
}}
                >

$<CountUp start={initialNumber} end={targetNumber} delay={delay} duration={duration} decimals={4} />
 
                </Typography>
                <Typography
                  variant="body2"
                  className="fontLatto"
                  sx={{
                    color: 'white',
                    fontSize: ['12px', '18px'],
                    textAlign: 'center',
                  }}
                >
                  Lowest Trade Fee
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant="h6"
                  className="fontFamily"
                  sx={{
                    color: 'white',
                    fontSize: ['20px', '25px'],
                    textAlign: 'center',
                    pt: { xs: 3, sm: 0, lg: 0 },
                  }}
                >
                  100%
                </Typography>
                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: ['12px', '18px'],
                    textAlign: 'center',
                  }}
                >
                  Bridge Fee Cashback
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default LandingArrowSection;

