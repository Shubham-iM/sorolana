import React from 'react';
import {Container, Typography, Box, Card} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Image from 'next/image';
import { useWindowSize } from '@/utils/useWindowSize';

function HowWorks() {
  const {width,height} = useWindowSize();

  return (
    <>
      <Box
        sx={{
          pt: {xs:0,sm:0,md:5,lg:5},
          paddingBottom: 5,
          marginTop: {xs: 4, sm: 4, md: 10, lg: 10},
          position: 'relative'
        }}
      >
          <Box sx={{position: 'absolute', marginTop: '-128px'}}>
          <Image src={'/assets/curveImg.png'} alt='img' width={width<768?100:width<1024?500:700} height={200} />
</Box>
        <Box sx={{paddingX: {xs:5,sm:10,md:12,lg:12}}}>
          <Typography
            className="fontFamily"
            variant="h5"
            sx={{
              color: 'white',
              fontSize: {xs: '30px', sm: '48px', md: '50px', lg: '52px'}
            }}
          >
            How it works
          </Typography>

          <Box
            sx={{
              mt: 3,
              px: {xs: 0, sm: 0, md: 5,lg:5},
              py: {xs: 0, sm: 0, md: 3,lg:3},
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'white'
            }}
          >
            <Typography
              variant="body2"
              className="fontFamily"
              sx={{
                color: 'white',
                fontSize: {xs: '14px', sm: '16px', md: '18px', lg: '18px'}
              }}
            >
              How do blockchain bridges work?
            </Typography>
            <AddCircleOutlineIcon sx={{color: 'white'}} />
          </Box>

          <Box
            sx={{
              mt: 3,
              px: {xs: 0, sm: 0, md: 5},

              py: {xs: 0, sm: 0, md: 3,lg:3},

              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'white'
            }}
          >
            <Typography
              variant="body2"
              className="fontFamily"
              sx={{
                color: 'white',
                fontSize: {xs: '14px', sm: '16px', md: '18px', lg: '18px'}
              }}
            >
              What are the benefits of blockchain Bridges?
            </Typography>
            <AddCircleOutlineIcon sx={{color: 'white'}} />
          </Box>

          <Box
            sx={{
              mt: 3,
              px: {xs: 0, sm: 0, md: 5},

              py: {xs: 0, sm: 0, md: 3,lg:3},

              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'white'
            }}
          >
            <Typography
              variant="body2"
              className="fontFamily"
              sx={{
                color: 'white',
                fontSize: {xs: '14px', sm: '16px', md: '18px', lg: '18px'}
              }}
            >
              How to transfer the Asset in soroban Bridge ?
            </Typography>
            <AddCircleOutlineIcon sx={{color: 'white'}} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HowWorks;
