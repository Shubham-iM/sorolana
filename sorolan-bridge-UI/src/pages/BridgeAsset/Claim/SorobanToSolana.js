import {
  Container,
  Card,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import React, { useState } from 'react';
import * as SorobanClient from 'stellar-sdk';
import { contractInstance, server } from '@/contract/jsClient';
import { encode } from '../../../contract/encode';
import { shortAddress } from '@/component/utils/Utils';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSorobanReact } from '@soroban-react/core';
import * as decode from '../../../contract/decode';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { ToastContainer, toast } from 'react-toastify';

export default function SorobanToSolana() {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useSorobanReact();
  const [claimMessage, setClaimMessage] = useState('');

  const xdr = SorobanClient.xdr;

  const handleSorobanToSolana = async () => {
    setIsLoading(true);
    console.log("check")

    try {
      const pk = address;

      const contract = contractInstance();
      const account = await server.getAccount(pk);
      let method = 'claim';

      const obj1 = { type: 'bytesn32', value: bytes32Array }; //public key
      const obj2 = { type: 'bytesn32', value: messageUint8 }; // message
      const obj3 = { type: 'bytesn32', value: signUint8Array }; // signature
      const obj4 = { type: 'address', value: pk }; // signature
      const obj5 = { type: 'address', value: 'amount' }; // signature
      const params = [encode(obj1), encode(obj2), encode(obj3)];

      // console.log("=====><===" , params)
      let tx = new SorobanClient.TransactionBuilder(account, {
        fee: '200',
        networkPassphrase: SorobanClient.Networks.FUTURENET
      })
        .addOperation(contract.call(method, ...params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();
      const sim = await server.simulateTransaction(tx);
      const { results } = await server.simulateTransaction(tx);
      if (!results || results.length !== 1) {
        setIsLoading(false);

        throw new Error('Invalid response from simulateTransaction');
      }
      const result = results[0];

      let _answer = decode.scvalToBigNumber(
        xdr.ScVal.fromXDR(Buffer.from(result.xdr, 'base64'))
      );

      let _prepareTx = await server.prepareTransaction(
        tx,
        SorobanClient.Networks.FUTURENET
      );
      _prepareTx.sign(SorobanClient.Keypair.fromSecret(secret));
      try {
        let { hash } = await server.sendTransaction(_prepareTx);
        console.log('🚀 ~ test ~ hash', hash);

        const sleepTime = Math.min(1000, 60000);

        for (let i = 0; i <= 60000; i += sleepTime) {
          await sleep(sleepTime);
          try {
            const response = await server?.getTransaction(hash);
            switch (response.status) {
              case 'NOT_FOUND': {
                continue;
              }
              case 'SUCCESS': {
                if (!response?.resultXdr) {
                  throw new Error('Expected exactly one result');
                }
                toast.success('Claim Success!');
                setIsLoading(false);
                return _answer;
              }
              case 'FAILED': {
                throw response.resultXdr;
              }
              default: {
                throw new Error(
                  'Unexpected transaction status: ' + response.status
                );
              }
            }
          } catch (err) {
            if ('code' in err && err.code === 404) {
              console.log('🚀 ~ withdraw ~ err', err);
            } else {
              throw err;
            }
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log('🚀 ~ test ~ error', error);
        setIsLoading(false);
      }
      console.log('Hello-World');
    } catch (error) {
      console.log('======>error<=======', error);
      toast.error('Something went wrong!');

      setIsLoading(false);
    }

  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleClaimMessage = (e) => {
    let _str = JSON.stringify(e.target.value);
    let _par = JSON.parse(_str);
    console.log('JSON.pares', _par);
    setClaimMessage(e.target.value);

  };
  return (
    <>
      <ToastContainer />
      <Container
        sx={{ pt: 12, display: 'flex', justifyContent: 'center', pb: 1 }}
      >
        <Card
          sx={{
            border: 1,
            borderColor: '#1F8BF4',
            borderRadius: 3,
            width: 600,
            bgcolor: 'transparent',
            paddingX: { xs: '25px', sm: '35px', md: '40px' }
          }}
        >
          <Typography
            variannt="caption"
            className="fontFamily"
            sx={{
              color: '#fff',
              textAlign: 'center',
              pt: { xs: 2, sm: 3, md: 3 }
            }}

          >
            Claim Assets
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 5 }}>
            <Typography
              variannt="body2"
              sx={{ color: 'white', fontSize: '15px', textAlign: 'start' }}
            >
              Message
            </Typography>
            <HelpOutlineIcon sx={{ width: 20, paddingLeft: '3px' }} />
          </Box>

          <Box sx={{ pt: 1 }}>
            <Card
              sx={{
                borderColor: 'white',
                borderRadius: 2,
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                px: '10px'
              }}
            >
              <textarea
                value={claimMessage}
                onChange={(e) => handleClaimMessage(e)}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  borderRadius: '5px',
                  color: 'white'
                }}
                rows={12}
                cols={100}
              ></textarea>
            </Card>
          </Box>

          <Grid container sx={{ pt: 5 }}>
            <Grid item xs={6}>
              <Typography
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'start',
                  pt: 1.5
                }}
              >
                To :
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'end',
                  pt: 1,
                  paddingRight: 1
                }}
              >
                {shortAddress('0x3cc..........5fee25')}

                <ContentCopyIcon
                  sx={{
                    marginLeft: 1,
                    color: '#fff',
                    width: 18,
                    height: 18,
                    paddingTop: '6px'
                  }}
                />
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ pt: 3 }}>
            <Grid item xs={6}>
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'start',
                  pt: 1.5
                }}
              >
                From
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'end',
                  pt: 1,
                  paddingRight: 1
                }}
              >
                {shortAddress('0x3cc..........5fee25')}

                <ContentCopyIcon
                  sx={{
                    marginLeft: 1,
                    color: '#fff',
                    width: 18,
                    height: 18,
                    paddingTop: '6px'
                  }}
                />
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ pt: 3 }}>
            <Grid item xs={6}>
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'start',
                  pt: 1
                }}
              >
                Transaction Fee :
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'end',
                  pt: 1,
                  px: 1.5
                }}
              >
                0.0185
                <span>($0.00)</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ pt: 3 }}>
            <Grid item xs={6}>
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'start'
                }}
              >
                Gas Price :
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className="fontLatto"
                variannt="body2"
                sx={{
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'end',
                  px: 1.5
                }}
              >
                0.831
                <span>($0.00)</span>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Button
              variant="outlined"
              sx={{
                width: { xs: 200, sm: 250, md: 300 },
                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                textAlign: 'center',
                backgroundColor: 'transparent',
                border: 1,
                borderColor: 'white',
                color: 'white'
              }}
              onClick={handleSorobanToSolana}
            >
              {isLoading ? (
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                  <CircularProgress color="inherit" size={25} />
                </Stack>
              ) : (
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                  Claim
                </Stack>
              )}
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
}
