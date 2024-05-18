import {Container, Grid, Typography, Box, Card} from '@mui/material';
import React from 'react';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import {useWindowSize} from '@/utils/useWindowSize';

function CrossChain() {
  const {width, height} = useWindowSize();

  return (
    <>
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Box sx={{position: 'absolute', paddingTop: 10}}>
          <Image
            src={'/assets/curveImg.png'}
            alt="img"
            width={width < 768 ? 100 : width < 1024 ? 500 : 700}
            height={200}
          />
        </Box>
        <Box sx={{paddingX: {xs: 5, sm: 10, md: 12, lg: 12}}}>
          <Grid container sx={{pt: 2}}>
            <Grid xs={12} sm={6}>
              <Typography
                className="fontFamily"
                variant="h6"
                sx={{
                  color: 'white',
                  pt: {xs: 4},
                  fontSize: {xs: '36px', sm: '30px', md: '40px', lg: '50px'},
                  lineHeight: '1.3'
                }}
              >
                Going cross-chain just got way better
              </Typography>
              <Typography
                className="fontFamily"
                variant="body2"
                sx={{
                  color: 'white',
                  fontSize: {xs: '14px', sm: '18px', md: '20px', lg: '20px'},
                  pt: 3,
                  pb: 8
                }}
              >
                Enabling users the ability to bridge assets between Both chain
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{textAlign: 'center', pt: {sm: 8}}}>
              <Box
                sx={{
                  pl: {lg: 6},
                  width: {xs: '80%', sm: '100%', md: '95%'}
                }}
                component="img"
                alt="soroban"
                src="chaincross.png"
              />
            </Grid>
          </Grid>

          <Grid container sx={{py: {xs: 4, sm: 3}, justifyContent: 'center'}}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 1, sm: 3}}}
            >
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '25px',
                  textAlign: 'center',
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="security-icon"
                    src="security.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Security
                  </Typography>
                </Box>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    fontWeight: 600
                  }}
                >
                  Security of cross-chain communication using decentralized
                  consensus
                </Typography>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 1, sm: 3}}}
            >
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '25px',
                  textAlign: 'center',
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="scalibility-icon"
                    src="scalibility.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Scalability
                  </Typography>
                </Box>
                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    fontWeight: 600
                  }}
                >
                  Innovative solutions that allow for trustless asset transfers
                  without relying on liquidity pools.
                </Typography>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 1, sm: 3}}}
            >
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '25px',
                  textAlign: 'center', // Center align the text
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="freedom-icon"
                    src="freedom.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Freedom
                  </Typography>
                </Box>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    fontWeight: 600
                  }}
                >
                  Anybody can register token by paying the gas <br /> fee.{' '}
                </Typography>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 2, sm: 3}}}
            >
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: {xs: 2, sm: 2},
                  textAlign: 'center',
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="liquidity-icon"
                    src="liquidity.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Liquidity
                  </Typography>
                </Box>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: '13px',
                    color: 'white',
                    textAlign: 'center',
                    py: 3.1,
                    fontWeight: 600
                  }}
                >
                  Extend Liquidity by Cross-chain liquidity extension
                </Typography>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 2, sm: 3}}}
            >
              {' '}
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: {xs: 2, sm: 2},
                  textAlign: 'center',
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="ecosystem-icon"
                    src="ecosystem.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Ecosystem
                  </Typography>
                </Box>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    fontWeight: 600
                  }}
                >
                  Leverage global messaging protocol (GMP) for cross-chain
                  communication
                </Typography>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{paddingX: {xs: 2, sm: 1}, paddingY: {xs: 2, sm: 3}}}
            >
              <Card
                sx={{
                  border: 1,
                  borderColor: '#1F8BF4',
                  borderRadius: 4,
                  backgroundColor: '#050B14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: {xs: 2, sm: 2},
                  textAlign: 'center',
                  minHeight: '220px'
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Box
                    sx={{pr: 2}}
                    component="img"
                    alt="realtime-icon"
                    src="realtime.png"
                    width={35}
                    height={20}
                  />
                  <Typography
                    className="fontFamily"
                    variant="h6"
                    sx={{
                      fontSize: '22px',
                      color: 'white',
                      mt: '5px'
                    }}
                  >
                    Real time
                  </Typography>
                </Box>

                <Typography
                  className="fontLatto"
                  variant="body2"
                  sx={{
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    fontSize: {sm: '12px', md: '14px'},
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    mx: 2,
                    fontWeight: 600
                  }}
                >
                  Real-Time and Batch Relay Enhancing Efficiency in Data
                  Transmission
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* <Grid container sx={{py: {md: 1, sm: 0}}}>
         
        </Grid> */}
        </Box>
      </Box>
    </>
  );
}

export default CrossChain;
