import {Container, Typography, Grid} from '@mui/material';
import {Box} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useWindowSize } from '@/utils/useWindowSize';
function Trending() {
  const {width,height} = useWindowSize();
  console.log('🚀 ~ Trending ~ window', width)

  return (
    <>
      <Box
        sx={{
          pt: 5,
          px: 0,
          marginTop: {xs: 0, sm: 4, md: 10, lg: 10},
          paddingBottom:7,
          position: 'relative'
        }}
      >
        <Box sx={{position: 'absolute', marginTop: '-108px'}}>
        <Image src={'/assets/curveImg.png'} alt='img' width={width<768?100:width<1024?500:700} height={200} />
  </Box>
        <Box sx={{paddingX:{xs:5,sm:10,md:12,lg:12}}}>
          <Typography
            className="fontFamily"
            variant="h5"
            sx={{
              color: 'white',
              fontSize: {xs: '30px', sm: '48px', md: '50px', lg: '52px'}
            }}
          >
            Trending
          </Typography>
          <Grid container sx={{pt: {xs: 1, sm: 5, md: 5}}}>
            <Grid item xs={9}>
              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2}}
              >
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="usd.png"
                />
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  USD/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  $ 187.33/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML 123.99
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2}}
              >
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="edgecoin.png"
                />
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  USD/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML
                  </span>
                </Typography>
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  $ 187.33/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML 123.99
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2}}
              >
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="wirex.png"
                />
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  USD/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML
                  </span>
                </Typography>
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  $ 187.33/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML 123.99
                  </span>
                </Typography>
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2}}
              >
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="radio.png"
                />
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  USD/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML
                  </span>
                </Typography>
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px'}
                  }}
                >
                  $ 187.33/
                  <span
                    className="fontFamily"
                    style={{fontSize: '10px', color: '#A1A1A1'}}
                  >
                    XML 123.99
                  </span>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2.5}}
              >
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px', pt: 2}
                  }}
                >
                  <span
                    className="fontFamily"
                    style={{fontSize: '12px', color: '#4EBE4E', pt: 2}}
                  >
                    +
                  </span>
                  0.76
                </Typography>
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="waveline.png"
                />
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2.5}}
              >
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px', pt: 2}
                  }}
                >
                  <span
                    className="fontFamily"
                    style={{fontSize: '12px', color: '#4EBE4E', pt: 2}}
                  >
                    +
                  </span>
                  0.76
                </Typography>
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="waveline.png"
                />
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2.5}}
              >
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px', pt: 2}
                  }}
                >
                  <span
                    className="fontFamily"
                    style={{fontSize: '12px', color: '#CD3737', pt: 2}}
                  >
                    -
                  </span>
                  0.76
                </Typography>
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="waveline.png"
                />
              </Box>

              <Box
                sx={{display: 'flex', justifyContent: 'space-around', pt: 2.5}}
              >
                <Typography
                  className="fontFamily"
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontSize: {xs: '12px', sm: '18px', md: '18px', pt: 2}
                  }}
                >
                  <span
                    className="fontFamily"
                    style={{
                      fontSize: {xs: '12px', md: '14px'},
                      color: '#CD3737',
                      pt: 2
                    }}
                  >
                    -
                  </span>
                  0.76
                </Typography>
                <Box
                  sx={{width: {xs: 24, sm: 30, md: 30}}}
                  component="img"
                  alt="usd"
                  src="waveline.png"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Trending;
