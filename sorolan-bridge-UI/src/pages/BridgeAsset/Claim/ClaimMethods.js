import {
  Container,
  Card,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import * as SorobanClient from "stellar-sdk";
import { _server, contractInstance, server } from "@/contract/jsClient";
import { encode } from "../../../contract/encode";
import { shortAddress } from "@/component/utils/Utils";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { signTransactionByWallet } from "@/contract/signTransactionByWallet";
import util, { decodeBase64, encodeBase64, encodeUTF8 } from "tweetnacl-util";
import axios from "axios";
import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import {
  solanaProgram,
  conn,
  confirmConnection,
} from "@/solanaContract/solanaInstance";

import * as spltoken from "@solana/spl-token";
import { ToastContainer, toast } from "react-toastify";
import { useSorobanReact } from "@soroban-react/core";
import nacl from "tweetnacl";
import { handleSorobanRelease } from "@/component/Release/SorobanRelease";
import Modal from "@mui/material/Modal";
import { getSorobanTokenBalance } from "@/component/balance/sorobanBalance";
import { getSorobanTokenInfo } from "@/component/helpers/tokenhelper";

export default function ClaimMethods({
  setTab,
  phantomAddr,
  FreighterAddress,
  handlePhantomWallet,
  handleFreighterWallet,
}) {
  console.log("FreighterAddress 46:", FreighterAddress);
  console.log("phantomAddr:", phantomAddr);
  console.log("claim");
  const { address } = useSorobanReact();
  const [isLoading, setIsLoading] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [signatureString, setSignatureString] = useState("");
  const [validatorPbKey, setValidatorPbKey] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showAmount, setShowAmount] = useState("0");
  const [tokenAddress, setTokenAddress] = useState("");
  const [decimalValue, setDecimalValue] = useState(7);
  const [parseClaimMessage, setParseClaimMsg] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [wsolBalance, setWsolBalance] = useState("0");
  const [solanaBalance, setSolanaBalance] = useState("0");
  const [open, setOpen] = React.useState(false);
  const [isWalletConnect, setIsWalletConnect] = useState(false);
  const [chain, setChain] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTab("bridge");
  };
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 350, sm: 450, md: 550 },
    bgcolor: "black",
    border: 1,
    borderColor: "blue",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    return null;
  };

  // useEffect(() => {

  //   if (chain) {
  //     handleWalletConnect()
  //   }
  //   return () => {

  //   }
  // }, [chain])

  useEffect(() => {
    handleWalletConnect();
    return () => {};
  }, [phantomAddr, FreighterAddress]);

  const handleWalletConnect = async () => {
    try {
      if (chain == 456 || FreighterAddress) {
        console.log("chain:", chain);
        const _wallet = await handleFreighterWallet();
        console.log("_wallet:", _wallet);
        // setChain(456)
        setIsWalletConnect(true);
      } else if (chain == 123 || phantomAddr) {
        const _wallet = await handlePhantomWallet();
        console.log("_wallet:", _wallet);
        console.log("chain:", chain);
        setIsWalletConnect(true);
        // setChain(123)
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    if (address) {
      handleBalance();
      handleSolanaBalance();
    }
  }, [address]);
  const handleSolanaBalance = async () => {
    try {
      const _balance = await conn.getBalance(provider?.publicKey);
      console.log("_balance:", _balance / 10 ** 9);
      setSolanaBalance(_balance / 10 ** 9);
    } catch (error) {}
  };
  const handleBalance = async () => {
    try {
      const token_address = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ID;

      const _balance = await getSorobanTokenBalance(token_address, address);
      console.log("_balance 149:", _balance);
      setWsolBalance(_balance);
    } catch (error) {
      console.log("error:", error);
    }
  };



  const provider = getProvider();
  console.log("provider",provider);
  const getUserPda = async () => {
    console.log("validator: 158", validatorPbKey);
    console.log("toaddress: 158", toAddress);
    console.log(" process.env.NEXT_PUBLIC_USER_SEED_PREFIX: 158", process.env.NEXT_PUBLIC_USER_SEED_PREFIX);

   

    const program = solanaProgram(provider);
    // console.log("validatorPbKey.toBuffer():", validatorPbKey.toBuffer())
    const userPdaInfo = web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode(
          process.env.NEXT_PUBLIC_USER_SEED_PREFIX
        ),
        // add some
        new web3.PublicKey(validatorPbKey).toBuffer(),
        new web3.PublicKey(toAddress).toBuffer(),
      ],
      program.programId
    );
    return userPdaInfo;
  };

  const handleSolanaClaim = async () => {
    console.log("provider:", provider);
    if (!provider?.publicKey?.toString()) {
      return toast.error("Please connect your phantom wallet first!");
    }

    try {
      setIsLoading(true);
      // create contract instance
      const program = solanaProgram(provider);
      console.log("program 190:",program);
      console.log("provider: 191", provider?.publicKey?.toBase58());
      const message = claimMessage;
      console.log("message 193",message);
      // console.log("claimMessage:",JSON.parse (claimMessage))
      // signature for testing
      const signature = signatureString;
      console.log("signatureString 197:", signatureString);
      console.log("signature 198:", signature);
      //validatior pub key for testing
      const validatorPublicKey = new web3.PublicKey(validatorPbKey);
      console.log("validatorPbKey 201:", validatorPbKey);
      //convert signature in buffer
      let signature_buf = Buffer.from(signature, "hex");

      let _msg = JSON.parse(message);
      console.log("_msg:", _msg[0][0]);
      let _message = _msg[0][0];
      console.log("_message:", _message);
      const messageBytes = Buffer.from(_message, "utf-8");
      console.log("messageBytes:", messageBytes);
      console.log("messageBytes:", messageBytes.length);

      let result = nacl.sign.detached.verify(
        messageBytes,
        signature_buf,
        validatorPublicKey.toBytes()
      );
      console.log("result:", result);

      //create instruction 1
      console.log("validatorPublicKey:", validatorPublicKey);
      let ix01 = anchor.web3.Ed25519Program.createInstructionWithPublicKey({
        publicKey: validatorPublicKey.toBytes(),
        message: messageBytes,
        signature: signature_buf,
      });
      //get user pda and bump
      let [userPda, userBump] = await getUserPda();
      console.log("userPda: 229", userPda.toBase58());

      const TOKEN_SEED_PREFIX = "sorolan seed for wrapped XLM";
      const [mint, mintBump] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(TOKEN_SEED_PREFIX)],
        program.programId
      );

      //claim instruction
      const claimIx = await program.methods
        .claim(
          //@ts-ignore
          new web3.PublicKey(validatorPublicKey).toBuffer(),
          Buffer.from(_message),
          signature_buf,
          userBump,
          mintBump
        )
        .accounts({
          claimer: provider?.publicKey,
          user: new web3.PublicKey(toAddress),
          validator: validatorPublicKey,
          authority: new web3.PublicKey(
            process.env.NEXT_PUBLIC_SOLANA_AUTHORITY
          ),
          programPda: new web3.PublicKey(process.env.NEXT_PUBLIC_PROGRAM_PDA),
          // authorityPda: new web3.PublicKey(process.env.NEXT_PUBLIC_AUTHORITY_PDA),
          userPda: userPda,
          tokenAccount: await getAta(),
          mint: new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT),
          tokenProgram: spltoken.TOKEN_PROGRAM_ID,
          associatedTokenProgram: spltoken.ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: web3.SYSVAR_RENT_PUBKEY,
          ixSysvar: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          systemProgram: web3.SystemProgram.programId,
        })
        .instruction();

      let claimTx = new web3.Transaction().add(ix01, claimIx);
      // claimTx.add(web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 2_400_000 }));
      claimTx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
      claimTx.feePayer = await provider?.publicKey;

      let signedTx = await provider?.signTransaction(claimTx);
      console.log("signedTx:", signedTx);
      console.log(
        "signedTx.serialize().byteLength:",
        signedTx.serialize().byteLength
      );
      let claimTxHah = await conn.sendRawTransaction(signedTx.serialize());

      if (claimTxHah) {
        console.log("claimTxHah:", claimTxHah);
        setIsLoading(false);
        toast.success("Claimed Successfull");
        // setTimeout(() => { setOpen(true) }, 4000);
      }
    } catch (error) {
      console.log("🚀 ~ handleSolanaClaim ~ error", error);
      console.log(
        "🚀 ~ handleSolanaClaim ~ error",
        JSON.parse(JSON.stringify(error))
      );

      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getAta = async () => {
    const ata = await spltoken.getAssociatedTokenAddress(
      new web3.PublicKey(process.env.NEXT_PUBLIC_TOKEN_MINT),
      new web3.PublicKey(toAddress),
      false
    );

    return ata;
  };

  const handleClaimMessage = async (e) => {
    console.log("e:", e?.target?.value);

    try {
      let obj = JSON.parse(e.target.value);
      console.log("obj:", obj[0]);
      let _msg = JSON.parse(obj[0]);
      console.log("_msg:", _msg);
      setTokenAddress(_msg?.tokenAddress);

      // if (!obj?.amount || !obj?.from || !obj?.to) {
      //   setClaimMessage(e?.target?.value)
      //   return toast?.error("Message is not correct")
      console.log("tokenaddresss---->", tokenAddress);
      setChain(_msg?.toChain);
      console.log("_msg:", _msg.toChain);
      setAmount(_msg?.amount);
      if (
        (_msg.toChain == "456" && _msg?.method == "Deposit") ||
        (_msg.toChain == "123" && _msg.method == "Withdraw")
      ) {
        setShowAmount(_msg?.amount / 10 ** 9);
      } else {
        setShowAmount(_msg?.amount / 10 ** 7);
      }

      // }
      // setToAddress(obj?.to);
      console.log("_msg?.to:", _msg?.to);
      setToAddress(_msg?.to);
      // setClaimMessage(Myobj)
      setClaimMessage(e?.target?.value);
      console.log("e?.target?.value:", e?.target?.value);
      // console.log("e?.target?.value:", e?.target?.valueu)
      console.log("_msg:", _msg);
      setParseClaimMsg(obj[0][0]);
      setSignatureString(obj[1][0]);
      console.log("obj[1]:", obj[1][0]);
      setValidatorPbKey(obj[2][0]);
      console.log("obj[2]:", obj[2][0]);
    } catch (error) {
      setClaimMessage("");
      console.log("🚀 ~ handleClaimMessage ~ error", error);
    }

    // setClaimMessage(e.target.value);
    if (!e.target.value) {
      setClaimMessage("");
      setAmount("");
      setToAddress("");
      setFromAddress("");
    }
  };

  const getSignData = async (message_id) => {
    try {
      let data = await axios.get(`/api/getSignature?message_id=${message_id}`);
      console.log("🚀 ~ getSignData ~ data", data);
    } catch (error) {
      console.log("🚀 ~ getSignData ~ error", error);
    }
  };

  const handleSorobanClaim = async () => {
    // setIsLoading(true);
    console.log("myyyy");

    try {
      const pk = address;
      const contract = contractInstance();
      const account = await server.getAccount(pk);
      let method = "claim";

      let _parseMsg = JSON.parse(claimMessage);
      const _claimMessage = _parseMsg[0][0];
      console.log("_claimMessage:", _claimMessage);

      const signature = signatureString;
      console.log("signature:", signature);

      const userDeocdPbKey = validatorPbKey;
      console.log("userDeocdPbKey:", userDeocdPbKey);

      function base64Decode(encoded) {
        return new Uint8Array(Buffer.from(encoded, "base64"));
      }
      function convertToBytes32(address) {
        // Step 1: Decode the base64-encoded address into a byte array
        const decodedAddressBytes = base64Decode(address);

        // Step 2: Extract the public key portion of the address
        const publicKeyBytes = decodedAddressBytes.slice(0, 32);

        // Step 3: Pad the public key with zeros to make it a bytes32 array
        const bytes32Array = new Uint8Array(32);
        bytes32Array.set(publicKeyBytes, 32 - publicKeyBytes.length);

        return bytes32Array;
      }

      // let rr = ss.toString();
      // console.log("rr:", rr)

      const obj1 = {
        type: "bytes",
        value: convertToBytes32(userDeocdPbKey),
      }; //public key
      const obj2 = { type: "bytes", value: util.decodeUTF8(_claimMessage) }; // message
      const obj3 = {
        type: "bytes",
        value: new Uint8Array(Buffer.from(signature, "base64")),
      }; // signature
      console.log("amount:", amount);
      const obj4 = { type: "address", value: pk }; // user
      const obj5 = { type: "scoI128", value: amount }; // amount
      const params = [
        encode(obj1),
        encode(obj2),
        encode(obj3),
        encode(obj4),
        encode(obj5),
      ];

      let tx = new SorobanClient.TransactionBuilder(account, {
        fee: "200",
        networkPassphrase: SorobanClient.Networks.FUTURENET,
      })
        .addOperation(contract.call(method, ...params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();
      console.log("=====>tx<======", tx);
      let sim = await server.simulateTransaction(tx).then((sim) => {
        console.log("cost:", sim.cost);
        console.log("result:", sim.result);
        console.log("error:", sim.error);
        console.log("latestLedger:", sim.latestLedger);
      });

      let _prepareTx = await server.prepareTransaction(
        tx,
        SorobanClient.Networks.FUTURENET
      );

      let txxx = await signTransactionByWallet(_prepareTx, address);
      const txBuildXdr = SorobanClient.TransactionBuilder.fromXDR(
        txxx,
        SorobanClient.Networks.FUTURENET
      );
      try {
        let { hash } = await server.sendTransaction(txBuildXdr);
        const sleepTime = Math.min(1000, 60000);

        for (let i = 0; i <= 60000; i += sleepTime) {
          await sleep(sleepTime);
          try {
            //get transaction response
            const response = await server?.getTransaction(hash);
            console.log("hash:", hash);
            switch (response.status) {
              case "NOT_FOUND": {
                continue;
              }
              case "SUCCESS": {
                if (!response?.resultXdr) {
                  throw new Error("Expected exactly one result");
                }
                toast.success("Claim Success!");
                handleOpen();

                // setTimeout(() => { setOpen(true) }, 4000);

                console.log(
                  "🚀 ~ test ~ success and the value is",
                  response?.resultXdr
                );
                handleBalance();
                // getSorobanTokenBalance()
                setIsLoading(false);
                console.log("response?.resultXdr:", response?.resultXdr);
                return true;
              }
              case "FAILED": {
                console.log("🚀 ~ test ~ FAILED", response);
                throw response.resultXdr;
              }
              default: {
                throw new Error(
                  "Unexpected transaction status: " + response.status
                );
              }
            }
          } catch (err) {
            console.log("🚀 ~ handleSorobanClaim ~ err", err);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log("🚀 ~ test ~ error", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("======>error<=======", error);
      toast.error("Something went wrong!");

      setIsLoading(false);
    }
  };

  //call claim function
  const handleClaimFunction = async () => {
    try {
      // if (
      //   chain
      // ) {
      //   return toast.error("Please connect wallet first")
      // }
      // 123 solana
      // 456 soroban
      // console.log("claim message", claimMessage)
      // console.log("claim message",JSON.parse(claimMessage))
      // let _msg = JSON.parse(claimMessage.toString())
      // let _methodName=
      console.log("claim", JSON.parse(claimMessage));
      let _parse = JSON.parse(claimMessage);
      console.log("_parse:", _parse);
      let _sorobanRelease = _parse[0][0].includes("Withdraw");
      // let _SolanaClaim = _parse[0][0].includes('Burn');
      // console.log("_SolanaClaim:", _SolanaClaim)
      // console.log("_SolanaClaim:", _SolanaClaim)
      let _SorobanClaim = _parse[0][0].includes("Deposit");
      console.log("_SorobanClaim:", _SorobanClaim);
      let _chainId = JSON.parse(_parse[0][0]);

      console.log("_chainId:", _chainId?.toChain);
      if (_sorobanRelease && _chainId?.toChain == 456) {
        console.log("handleSorobanRelease:");
        console.log("amount:", amount);
        setIsLoading(true);
        const _release = await handleSorobanRelease(amount, address);
        if (_release) {
          toast.success("Transaction sucessfull");
        }
        if (_release) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
      if (_chainId?.toChain == 123) {
        console.log("handle_Solana_Claim:");
        handleSolanaClaim();
      }
      if (_SorobanClaim && _chainId?.toChain == 456) {
        console.log("handle_Soroban_Claim:");
        setIsLoading(true);
        let _claim = await handleSorobanClaim(
          claimMessage,
          signatureString,
          validatorPbKey
        );
        if (_claim) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }

      // handleSolanaClaim()
      // if (_msg?.toChain === 456) {
      //   console.log("handleSolanaClaim:")
      // }

      // if (_msg?.toChain === 123) {
      //   console.log("handleSorobanClaim:")
      // }
    } catch (error) {
      console.log("error:", error);
    }
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <Container
      sx={{ pt: 12, display: "grid", justifyContent: "center", pb: 1 }}
    >
      <ToastContainer />
      {/* <Typography textAlign={'center'} color={'red'} fontWeight={'bold'} pb={3}>
        {!address && !provider?.publicKey ? 'Please connect wallet first' : ''}</Typography> */}
      <Typography textAlign={"center"} pb={1} variant="h5" fontWeight={"bold"}>
        CLAIM ASSET
      </Typography>
      <Card
        sx={{
          border: 1,
          borderColor: "#1F8BF4",
          borderRadius: 3,
          width: 600,
          bgcolor: "transparent",
          paddingX: { xs: "25px", sm: "35px", md: "40px" },
        }}
      >
        {/* <Typography
          variannt="caption"
          className="fontFamily"
          sx={{
            color: 'white',
            textAlign: 'center',
            pt: { xs: 2, sm: 3, md: 3 }
          }}
        >
          Claim Assets
        </Typography> */}
        {/* <ReactJson src={JSON.parse(claimMessage)} /> */}

        {/* <pre>{JSON?.stringify(JSON.parse(claimMessage), null, 2)}</pre> */}
        <Box sx={{ display: "flex", alignItems: "center", pt: 5 }}>
          <HelpOutlineIcon sx={{ width: 20, paddingLeft: "3px" }} />
        </Box>

        <Box sx={{ pt: 1 }}>
          <Typography
            variannt="body2"
            sx={{ color: "white", fontSize: "15px", textAlign: "start" }}
          >
            Message :
            {/* <pre style={{ color: 'white' }}>{JSON?.stringify(JSON?.parse(parseClaimMessage), null, 2)}</pre> */}
          </Typography>
          <Card
            sx={{
              borderColor: "white",
              borderRadius: 2,
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "space-between",
              py: 1,
              px: "10px",
            }}
          >
            <textarea
              value={claimMessage
                .split(",")
                .join("\n")
                .replace(/[\\{}]/g, "")} // Split by commas and join with newline characters
              placeholder="Paste your message here"
              onChange={(e) => handleClaimMessage(e)}
              style={{
                backgroundColor: "transparent",
                border: "1px solid white",
                borderRadius: "5px",
                color: "white",
                paddingX: "12px",
              }}
              rows={12}
              cols={100}
            />
          </Card>
        </Box>
        <Grid container sx={{ pt: 5 }}>
          <Grid item xs={6}>
            <Typography
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "start",
                pt: 1.5,
              }}
            >
              To :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "end",
                pt: 1,
                paddingRight: 1,
              }}
            >
              {shortAddress(toAddress)}

              <ContentCopyIcon
                sx={{
                  marginLeft: 1,
                  color: "#fff",
                  width: 18,
                  height: 18,
                  paddingTop: "6px",
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
                color: "white",
                fontSize: "12px",
                textAlign: "start",
                pt: 1,
              }}
            >
              Amount :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "end",
                pt: 1,
                px: 1.5,
              }}
            >
              <span>{showAmount} </span>
            </Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ pt: 3 }}>
          <Grid item xs={6}>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "start",
                pt: 1,
              }}
            >
              WSOL Balance :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "end",
                pt: 1,
                px: 1.5,
              }}
            >
              <span>{wsolBalance} </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 3 }}>
          <Grid item xs={6}>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "start",
                pt: 1,
              }}
            >
              SOL Balance :
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "12px",
                textAlign: "end",
                pt: 1,
                px: 1.5,
              }}
            >
              <span>{solanaBalance} </span>
            </Typography>
          </Grid>
        </Grid>

        {console.log("chain----", chain)}
        {!isWalletConnect ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Button
              variant="outlined"
              sx={{
                width: { xs: 200, sm: 250, md: 300 },
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                textAlign: "center",
                backgroundColor: "transparent",
                border: 1,
                borderColor: "white",
                color: "white",
              }}
              onClick={handleWalletConnect}
            >
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                Connect Wallet
              </Stack>
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Button
              variant="outlined"
              sx={{
                width: { xs: 200, sm: 250, md: 300 },
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                textAlign: "center",
                backgroundColor: "transparent",
                border: 1,
                borderColor: "white",
                color: "white",
              }}
              onClick={handleClaimFunction}
            >
              {isLoading ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress color="inherit" size={25} />
                </Stack>
              ) : (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  Claim
                </Stack>
              )}
            </Button>
          </Box>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            mt: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            backdropFilter: "blur(15px)",
          }}
        >
          <Box sx={style}>
            <div
              style={{
                borderBottom: "1px solid white",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography
                className="fontFamily"
                variant="h6"
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "center",
                  pt: "2px",
                }}
              >
                Thanks for using our platform
              </Typography>
            </div>
            {/* <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "11px",
                textAlign: "start",
                py: "3px",
              }}
            >
              <b>Follow These Steps to Claim Your Funds:</b>
            </Typography>
            <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "10px",
                textAlign: "start",
                pb: "2px",
              }}
            >
              <b> 1) Copy Transaction Hash:</b> Copy the Transaction Hash from
              "Transaction Details".
            </Typography> */}

            {/* <Typography
              className="fontLatto"
              variannt="body2"
              sx={{
                color: "white",
                fontSize: "9px",
                textAlign: "start",
              }}
            >
              Ensure that you provide the actual message and make the steps as
              straightforward as possible for successfully claim funds.
            </Typography> */}
            <Box sx={{ textAlign: "center", pt: 2 }}>
              <Button
                className="modal"
                variant="outlined"
                sx={{
                  // width: 200,
                  height: 30,
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: 1,
                  borderColor: "white",
                  color: "white",
                }}
                onClick={handleClose}
              >
                Go back to bridge
              </Button>
            </Box>
          </Box>
        </Modal>
      </Card>
    </Container>
  );
}
