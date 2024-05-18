import {Typography, Box, Card, Grid} from '@mui/material';
import Container from '@mui/material/Container';
import Link from 'next/link';
import React from 'react';

function LandingPage() {
  return (
    <>
      <Box
        sx={{
          background: 'black',
          height: {
            padding: 0
          },
          marginX: {xs:6,sm:8,md:10,lg:12}
        }}
      >
        <Typography
          className="fontFamily"
          variant="h6"
          sx={{
            color: 'white',
            fontSize: {xs: '20px', sm: '35px', md: '40px', lg: '45px'},
            textAlign: 'center',
          }}
        >
           Seamless Soroban to Solana
        </Typography>
      
        <Typography
          className="fontFamily"
          variant="h6"
          sx={{
            color: 'white',
            fontSize: {xs: '20px', sm: '35px', md: '40px', lg: '45px'},
            textAlign: 'center'
          }}
        >
        Bridging Trust Gaps
        </Typography>
        <Box
          sx={{display: 'flex', pt: 5, justifyContent: 'center'}}
          className="fontFamily"
        >
          <Box>
            <Card
              sx={{
                width: {xs: 65, sm: 100, md: 150, lg: 250},
                height: {xs: 65, sm: 100, md: 150, lg: 250},
                pt: {xs: 1, sm: 3, md: 5, lg: 11},
                border: 3,
                borderRadius: 40,
                backgroundColor: 'transparent',
                borderColor: 'white',
                textAlign: 'center'
              }}
            >
              <Box
                width={20}
                height={20}
                component="img"
                alt="soroban"
                src="steller.png"
              />
              <Typography
                sx={{
                  color: 'white',
                  fontSize: {xs: '10px', sm: '16px', md: '20px', lg: '24px'}
                }}
                className="fontFamily"
              >
                Stellar
              </Typography>
            </Card>
          </Box>
          <Box sx={{paddingRight: {md: '32px'}}}>
            <Card
              sx={{
                width: {xs: 65, sm: 100, md: 150, lg: 250},
                height: {xs: 65, sm: 100, md: 150, lg: 250},
                pt: {xs: 1, sm: 3, md: 5, lg: 11},
                border: 3,
                borderRadius: 40,
                borderStyle: 'dashed',
                borderColor: '#EBFF00',
                backgroundColor: 'transparent',
                textAlign: 'center',
                marginLeft: {xs: -1, sm: -2, md: -4, lg: -7}
              }}
            >
              <Box
                width={30}
                height={30}
                component="img"
                alt="soroban"
                src="soroban1.png"
              />
              <Typography
                sx={{
                  color: 'white',
                  fontSize: {xs: '10px', sm: '16px', md: '20px', lg: '24px'}
                }}
              >
                Soroban
              </Typography>
            </Card>
          </Box>

          <Box
            sx={{
              pt: {xs: 4, sm: 6, md: 14},
              pl: {xs: 2}
            }}
          >
            <Link href={'/BridgeAsset/Bridge'}>
              <Box
                component="img"
                alt="Sorolana"
                src="Group 108.svg"
                sx={{
                  width: {xs: 35, sm: 78, md: 150},
                  height: {xs: 'auto', sm: 'auto', md: 50},
                  cursor: 'pointer'
                }}
              />
            </Link>
          </Box>

          <Box sx={{paddingLeft: {xs: 2, sm: 4}}}>
            <Card
              sx={{
                width: {xs: 65, sm: 100, md: 150, lg: 250},
                height: {xs: 65, sm: 100, md: 150, lg: 250},
                pt: {xs: 1, sm: 3, md: 5, lg: 11},
                border: 3,
                borderRadius: 40,
                borderStyle: 'dashed',
                borderColor: '#CD69E5',
                backgroundColor: 'transparent',
                textAlign: 'center'
              }}
            >
              <Box
                width={20}
                height={20}
                component="img"
                alt="soroban"
                src="solana.png"
              />
              <Typography
                sx={{
                  color: 'white',
                  fontSize: {xs: '10px', sm: '16px', md: '20px', lg: '24px'}
                }}
              >
                Solana
              </Typography>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            paddingLeft: {xs: 0, sm: 4, md: 6, lg: 8},
            paddingRight: {xs: 0, sm: 6, md: 6, lg: 8},
            paddingY: {xs: 0},
            display: "none",
            justifyContent: {
              xs: 'center',
              md: 'center',
              md: 'space-between',
              lg: 'space-between'
            },
            marginTop: '60px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: {xs: 268, sm: 260, md: 335, lg: 350},
              height: 40,
              border: 1,
              padding: '5px',
              borderRadius: 1,
              borderColor: '#2695FF',
              gap: '10px'
            }}
          >
            <Box
              width={22}
              height={22}
              component="img"
              alt="soroban"
              src="steller.png"
              
            ></Box>
            <Typography
              sx={{color: 'white', fontSize: {xs: '10px', md: '14px'}}}
            >
              XLM
            </Typography>
            <Box
              sx={{pt: 1}}
              width={15}
              height={15}
              component="img"
              alt="vector"
              src="Vector.png"
            ></Box>
            <Typography
              sx={{color: 'white', fontSize: {xs: '10px', md: '14px'}}}
            >
              1000
            </Typography>
            <Box
              width={20}
              height={20}
              component="img"
              alt="image"
              src="image 18.png"
            ></Box>
            <Typography
              sx={{
                color: 'white',
                marginLeft: '3px',
                fontSize: {xs: '8px', md: '14px'}
              }}
            >
              3aaUB........QpTq
            </Typography>
            <Box
              sx={{pt: 1}}
              width={15}
              height={15}
              component="img"
              alt="vector"
              src="Vector.png"
            ></Box>
          </Box>

          <Box
            sx={{
              marginTop: {xs: '10px', sm: 0},
              marginLeft: {sm: '10px'},
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: {xs: 268, sm: 260, md: 335, lg: 350},
              height: 40,
              border: 1,
              padding: '5px',
              borderRadius: 1,
              borderColor: '#2695FF',
              gap: '10px'
            }}
          >
            <Box
              width={22}
              height={22}
              component="img"
              alt="soroban"
              src="steller.png"
            ></Box>
            <Typography
              sx={{color: 'white', fontSize: {xs: '10px', md: '14px'}}}
            >
              WXLM
            </Typography>
            <Box
              sx={{pt: 1}}
              width={15}
              height={15}
              component="img"
              alt="vector"
              src="Vector.png"
            ></Box>
            <Typography
              sx={{color: 'white', fontSize: {xs: '10px', md: '14px'}}}
            >
              1000
            </Typography>
            <Box
              width={20}
              height={20}
              component="img"
              alt="image"
              src="image 8.png"
            ></Box>
            <Typography
              sx={{
                color: 'white',
                marginLeft: '3px',
                fontSize: {xs: '8px', md: '14px'}
              }}
            >
              3aaUB........QpTq
            </Typography>
            <Box
              sx={{pt: 1}}
              width={15}
              height={15}
              component="img"
              alt="vector"
              src="Vector.png"
            ></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
