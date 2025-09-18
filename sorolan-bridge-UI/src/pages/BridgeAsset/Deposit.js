import {
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  CircularProgress,
  Stack,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import * as SorobanClient from "stellar-sdk";
import { encode } from "../../contract/encode";
import { server, contractInstance } from "@/contract/jsClient";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import InputAdornment from "@mui/material/InputAdornment";
import { shortAddress } from "@/component/utils/Utils";
import { useSorobanReact } from "@soroban-react/core";
import { signTransactionByWallet } from "@/contract/signTransactionByWallet";
import * as solanaWeb3 from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import nacl from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";
import * as anchor from "@coral-xyz/anchor";
import { solanaProgram } from "@/solanaContract/solanaInstance";
import { phantomProvider } from "@/utils/phantom";
import axios from "axios";
import { handleSorobanWithdraw } from "../../component/Withdraw/SorobanWithdraw";
import { handleSolanaWithdraw } from "../../component/Withdraw/SolanaWithdraw";
import { useRouter } from "next/router";

// const xdr = SorobanClient.xdr;
export default function Deposit(props) {
  console.log("props deposit:", props);
  const router = useRouter();

  const { address } = useSorobanReact();
  console.log("address:", address);
  const pk = address;
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 350, sm: 450, md: 550 },
    bgcolor: "black",
    border: 1,
    borderColor: "black",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [depositAmount, setDepositAmount] = useState(null);
  const [destinationAddr, setDestinationAddr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relayerName, setRelayerName] = useState("self");
  const [fromChain, setFromChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [assets, setAssets] = useState("");
  const [assestValue, setAssestvalue] = useState("");
  const [currentAsset, setCurrentAsset] = useState([]);
  const [userWalletAdd, setUserWalletAdd] = useState("");
  const [txHash, setTXhash] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isWalletConnected, setWallet] = useState(false);
  const [connectWallet, setConnectWallet] = useState("");
  const [btnText, setBtnText] = useState(0);
  console.log("ddddddddddddddddd",assets);
  console.log("assestValueeeee",assestValue);
  const [chains, setChains] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const openModal = () => {
    setOpen(!open);
    setModalOpen(true);
  };
  const handleTab = () => {
    setModalOpen(false);

    props?.setTab("");
  };

  const closeModal = () => {
    setBtnText(1);
    // setModalOpen(false);
    window.open(
      // `https://gmp.xqutus.com/pendingtransaction/?txhash=${txHash}`,
      `localhost:3001/pendingtransaction/?txhash=${txHash}`,

      "_blank",
      "noopener,noreferrer"
    );

    // router.push('https://google.com', { target: '_blank' })
  };

  const handleChange = (event) => {
    setRelayerName(event.target.value);
  };

  useEffect(() => {
    handleChains();
    handleAssets();
    return () => {};
  }, []);
  const handleChains = async () => {
    try {
      let {
        data: { data },
      } = await axios.get("/api/getChains");
      console.log("🚀 ~ handleChains ~ data", data);
      if (data) {
        setChains(data);
      }
    } catch (error) {
      // console.log("🚀 ~ handleChains ~ error", error);
    }
  };

  // const handleAssets = async () => {
  //   try {
  //     let {
  //       data: { data },
  //     } = await axios.get("/api/getAssets");
  //     console.log("data",data);
  //     if (data) {
  //       console.log("data 143:", data)
  //       setAssets(data);
  //       console.log("assets",assets);
  //     }
  //   } catch (error) {
  //     // console.log("🚀 ~ handleChains ~ error", error);
  //   }
  // };



  const handleAssets = async () => {
  try {
    // Hardcoded assets data
    const data = [
      { chain_id: 1, name: "XLM", symbol: "XLM" },
      { chain_id: 2, name: "SOL", symbol: "SOL" },
      { chain_id: 1, name: "WSOL", symbol: "WSOL" },
      { chain_id: 2, name: "WXLM", symbol: "WXLM" }
    ];

    console.log("data", data);

    // Ensure that 'data' is an array before setting it to 'assets'
    if (Array.isArray(data)) {
      setAssets(data); // Set the hardcoded data to assets
      console.log("assets", data); // Logs the hardcoded data
    } else {
      console.error("Expected 'data' to be an array, but got", typeof data);
      setAssets([]); // Set an empty array if the data is not valid
    }
  } catch (error) {
    console.log("Error setting assets:", error);
  }
};


  const handleFromChain = (e) => {
    console.log("eeeeeee",e);
    console.log("chains hcvwy:", chains);
    console.log("assets155",assets);

    let _chains = chains?.filter((k) => k?.id == e?.target?.value);
    console.log("_chains15999",_chains);
    let _assets = assets?.filter((l) => l?.chain_id == _chains[0]?.id);
    console.log("_assetsrrrr160",_assets);
    setCurrentAsset(_assets);

    setFromChain(e.target.value);
    console.log(
      "_chains[0].id == 1 && props.phantomAddr:",
      _chains[0].id == 1 && props.phantomAddr
    );
    console.log("props.phantomAddr:", props.phantomAddr);
    console.log(
      "_chains[0].id == 2 && address :",
      _chains[0].id == 2 && address
    );
    console.log("_chains[0].id:", _chains[0].id);
    if (_chains[0].id == 1) {
      setDestinationAddr(props.phantomAddr.toString() ?? "");
    } else if (_chains[0].id == 2) {
      setDestinationAddr(address ?? "");
    }
  };

  const handleToChain = (e) => {
    setToChain(e.target.value);
  };

  const handleAssestValue = (e) => {
    setAssestvalue(e.target.value);
  };

  const handleMethodCalling = async () => {
    console.log("handleMethodCalling")

    if (!fromChain) {
      return toast.error("Please select source chain");
    }

    if (!toChain) {
      console.log(
        "🚀 ~ file: Deposit.js:142 ~ handleMethodCalling ~ toChain:",
        toChain
      );
      return toast.error("Please select destination chain!");
    }

    if (fromChain === toChain) {
      return toast.error("Same chains not allowed!");
    }
    // console.log("fromChain:", fromChain)
    // console.log("assestValue:", assestValue)
    if (!assestValue) {
      return toast.error("Select asset first");
    }

    if (!destinationAddr)
      return toast.error("please fill destination address!");
    if (fromChain == 1) {
      console.log("current chain 231111", assestValue)
      if (assestValue === "XLM") {
        console.log("handleSorobanDeposit",handleSorobanDeposit);
        handleSorobanDeposit();
      } else {
        // console.log("address:", address)
        // console.log("depositAmount:", depositAmount)
        // console.log("handleSorobanWithdraw:")
        setIsLoading(true);
        const _withdraw = await handleSorobanWithdraw(
          depositAmount,
          address,
          destinationAddr
        );
        console.log("_withdraw:", _withdraw);
        setTXhash(_withdraw);
        if (_withdraw) {
          toast.success(
            "Transaction successfully submitted to Sorolana Bridge!"
          );
          setIsLoading(false);
          setTimeout(() => {
            console.log("123456789");
            setOpen(true);
          }, 4000);
        } else {
          setIsLoading(false);
        }
      }
      if (isWalletConnected) {
        return toast.assets("please connect your wallet");
      }
    }
    // console.log("fromChain:", fromChain)
    console.log("assestValue246666:", assestValue)
    if (fromChain == 2) {
      if (assestValue === "SOL") {
        HandleSolanaDeposit();
      } else {
        // console.log("handleSolanaWithdraw:")
        setIsLoading(true);
        const _withdraw = await handleSolanaWithdraw(
          depositAmount,
          destinationAddr
        );
        console.log("_withdraw:", _withdraw);
        setTXhash(_withdraw);
        if (_withdraw) {
          setIsLoading(false);
          setTimeout(() => {
            console.log("123456789");
            setOpen(true);
          }, 4000);
        } else {
          setIsLoading(false);
        }
      }
    }
  };

  const handleSorobanDeposit = async () => {
    console.log("address:", address);
    console.log("obj4.destinationAddr:", destinationAddr);
    if (!address) {
      return toast.error("Please connect wallet first.");
    }
    if (!depositAmount) {
      return toast.error("Amount should not be zero");
    }
    try {
      setIsLoading(true);

      const contract = contractInstance();
      const account = await server.getAccount(pk);

      const method = "deposit";

      const obj1 = {
        type: "address",
        value: pk,
      };
      const obj2 = {
        type: "address",
        value: process.env.NEXT_PUBLIC_NATIVE_XLM_ID,
      };
      const obj3 = {
        type: "scoI128",
        //change when deployed
        value: depositAmount * 10 ** 7,
        // value: depositAmount,
      };
      console.log("obj3.depositAmount * 10 ** 7:", depositAmount * 10 ** 7);
      console.log("obj3.depositAmount:", depositAmount);
      const obj4 = {
        type: "scvString",
        value: destinationAddr,
      };
      const params = [encode(obj1), encode(obj2), encode(obj3), encode(obj4)];
      console.log("params:", params);
      const tx = new SorobanClient.TransactionBuilder(account, {
        fee: "200",
        networkPassphrase: SorobanClient.Networks.FUTURENET,
      })
        .addOperation(contract.call(method, ...params))
        .setTimeout(SorobanClient.TimeoutInfinite)
        .build();

      let sim = await server.simulateTransaction(tx).then((sim) => {
        // console.log("cost:", sim.cost);
        // console.log("result:", sim.result);
        // console.log("error:", sim.error);
        // console.log("latestLedger:", sim.latestLedger);
      });
      //   const resultsaaa = await server.simulateTransaction(tx);
      // //   console.log('🚀 ~ handleSorobanDeposit ~ resultsaaa', resultsaaa)
      //   const {results} = await server.simulateTransaction(tx);
      // // console.log('🚀 line no 66 result', results);

      // if (!results || results.length !== 1) {
      //   throw new Error('Invalid response from simulateTransaction');
      // }
      // const resultt = results[0];
      // // console.log('🚀 ~ test ~ resultt', resultt);
      // // const _add = addFootprint(tx, setUserWalletAddSorobanClient.Networks.FUTURENET, sim, pk);
      // // // console.log("🚀 ~ test ~ _add", _add)

      const _prepareTransaction = await server.prepareTransaction(
        tx,
        SorobanClient.Networks.FUTURENET
      );

      let txxx = await signTransactionByWallet(_prepareTransaction, address);
      const txBuildXdr = SorobanClient.TransactionBuilder.fromXDR(
        txxx,
        SorobanClient.Networks.FUTURENET
      );

      try {
        const { hash } = await server.sendTransaction(txBuildXdr);
        const sleepTime = Math.min(1000, 60000);
        for (let i = 0; i <= 60000; i += sleepTime) {
          await sleep(sleepTime);
          try {
            // get transaction response
            const response = await server?.getTransaction(hash);
            console.log("hash:", hash);
            console.log("🚀 ~ test ~ response", response);
            switch (response.status) {
              case "NOT_FOUND": {
                continue;
              }
              case "SUCCESS": {
                console.log(
                  "🚀 ~ file: Deposit.js:348 ~ handleSorobanDeposit ~ response:",
                  response
                );
                if (!response?.resultXdr) {
                  toast.error("Something went wrong.");
                  setIsLoading(false);
                  throw new Error("Expected exactly one result");
                }

                const success = {
                  success: true,
                  result: response?.resultXdr,
                  hash,
                };
                // const _convert = decode
                //   .scvalToBigNumber(
                //     xdr.ScVal.fromXDR( response?.resultXdr, 'base64')
                //   )
                //   .toNumber();
                // // console.log('🚀 ~ handleSorobanDeposit ~ _convert', _convert);

                // // console.log('🚀 ~ handleSorobanDeposit ~ _ans', _ans);
                // console.log(
                // "🚀 ~ handleSorobanDeposit ~ response?.resultXdr",
                // response?.resultXdr
                // );
                // console.log("🚀 ~ test ~ success", success);
                setIsLoading(false);

                toast.success(
                  "Transaction successfully submitted to Sorolana Bridge."
                );

                const data = {
                  counter: 0,
                  tokenAddress: process.env.NEXT_PUBLIC_TOKEN_MINT,
                  tokenChain: 123,
                  to: destinationAddr,
                  toChain: 456,
                  fee: 100,
                  method: "Deposit",
                  amount: parseFloat(depositAmount),
                };
                // console.log(
                // "🚀 ~ handleSorobanDeposit ~ data",
                // JSON.stringify(data)
                // );
                const MSG = Buffer.from(JSON.stringify(data), "utf-8");
                const keypair = solanaWeb3.Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                // console.log(
                // "🚀 ~ handleSorobanDeposit ~ publicKey",
                // publicKey
                // );
                let sign = nacl.sign.detached(MSG, keypair.secretKey);
                let signatureString = encodeBase64(sign); // convert uint8array in string
                // console.log(
                // "🚀 ~ handleSorobanDeposit ~ signatureString",
                // signatureString
                // );

                const myresult = nacl.sign.detached.verify(
                  MSG,
                  sign,
                  keypair.publicKey.toBytes()
                );
                // console.log("myresult:", myresult)
                setTXhash(destinationAddr);
                setUserWalletAdd(pk);
                setTimeout(() => {
                  console.log("123456789");
                  setOpen(true);
                }, 4000);
                return success;
              }
              case "FAILED": {
                console.log("🚀 ~ test ~ FAILED", response);
                throw response.resultXdr;
              }
              default:
                {
                  throw new Error(
                    `Unexpected transaction status: ${response.status}`
                  );
                }
                Mainnet;
            }
          } catch (err) {
            // console.log("🚀 ~ handleSorobanDeposit ~ err", err);
            // if ('code' in err && err.code === 404) {
            // //   console.log('🚀 ~ withdraw ~ err', err);
            // } else {
            //   throw err;
            // }
            setIsLoading(false);
            return toast.error("Something went wrong.");
          }
        }
      } catch (error) {
        console.log("🚀 ~ test ~ error", error);
        toast.error("Something went wrong.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ test ~ error", error);
      toast.error("Something went wrong.");

      setIsLoading(false);
    }
  };

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    // window.open('https://phantom.app/', '_blank');
    return null;
  };
  const provider = getProvider();
  console.log("provider:", provider);

  const HandleSolanaDeposit = async () => {
    console.log("destinationAddr:", destinationAddr);
    if (!destinationAddr) {
      return toast.error("Please fill destination address");
    }
    if (!depositAmount) {
      return toast.error("Amount should be more than zero.");
    }

    try {
      setIsLoading(true);
      let _depositAmount = new anchor.BN(depositAmount * web3.LAMPORTS_PER_SOL);
      // alert(depositAmount)
      const program = solanaProgram(provider);
      setUserWalletAdd(provider?.publicKey.toString());

      console.log("provider?.publicKey:", provider?.publicKey);
      console.log(
        "provider?.publicKey:",
        process.env.NEXT_PUBLIC_SOLANA_AUTHORITY
      );
      console.log("provider?.publicKey:", process.env.NEXT_PUBLIC_PROGRAM_PDA);
      console.log(
        "web3.SystemProgram.programId:",
        web3.SystemProgram.programId
      );
      let depositTX = await program.methods

        .deposit(_depositAmount, destinationAddr)
        .accounts({
          user: provider?.publicKey,
          authority: new web3.PublicKey(
            process.env.NEXT_PUBLIC_SOLANA_AUTHORITY
          ),
          programPda: new web3.PublicKey(process.env.NEXT_PUBLIC_PROGRAM_PDA),
          systemProgram: web3.SystemProgram.programId,
        })
        // .signers([SoalanUserAddress])
        .rpc({ skipPreflight: true, commitment: "confirmed" });
      // let value=await
      // // console.log ('transactionhash--->', depositTX)
      setTXhash(depositTX);
      if (depositTX) {
        setIsLoading(false);
        toast.success("Transaction successfully submitted to Sorolana Bridge");
        setTimeout(() => {
          setOpen(true);
        }, 4000);

        // const data = {
        //   amount: depositAmount,
        //   tokenAddress: "CB5ABZGAAFXZXB7XHAQT6SRT6JXH2TLIDVVHJVBEJEGD2CQAWNFD7D2U",
        //   tokenChain: 123,
        //   to: "GAA6YOQZPDWMBXYIOW4LZFHXI4WRCFGBW4PM2ATVQBYMEZPWVNU77Z2T",
        //   toChain: 456,
        //   fee: 100,
        // };

        // console.log("data:", data)
        // const MSG = Buffer.from(JSON.stringify(data), "utf-8");
        // const keyPair= web3.Keypair.generate()
        // // console.log("keyPair:", keyPair)
        // // console.log("keyPair:", keyPair?.publicKey?.toBase58())
        // // const publickey = Buffer.from(keyPair.publicKey).toString("base64");
        // // // console.log("publickey:", publickey)
        // let sign = nacl.sign.detached(MSG, keyPair.secretKey);
        // // console.log("sign:",Buffer.from(sign).toString('base64'))

        // setTransactionId(ab);
        // setShowTransactionLink(true);
        // let aba = await confirmConnection.getParsedTransaction(ab);
        // // console.log('🚀 ~ HandleSolanaDeposit ~ aba', aba);
      }
    } catch (error) {
      console.log("error:", error);
      // console.log("🚀 ~ HandleSolanaDeposit ~ error", error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleSwapIcon = () => {
    // console.log("check")
    // console.log("fromChain:", fromChain)
    // console.log("toChain:", toChain)
    setFromChain(toChain);
    setToChain(fromChain);
  };
  useEffect(() => {
    handleWalletConnect();
  }, [props?.FreighterAddress, props?.phantomAddr]);

  const handleWalletConnect = async (val = 0) => {
    console.log("handleWalletConnect:", val);
    if (val == 1) {
      console.log(
        "props?.FreighterAddress: handleWalletConnect",
        props?.FreighterAddress
      );
      let _connected = await props?.handleFreighterWallet();
      console.log("_connected: handleWalletConnect", _connected);
      if (_connected) {
        setConnectWallet("freighter");
      }
    }
    if (val == 2) {
      props?.handlePhantomWallet();
      setConnectWallet("phantom");
    }
  };
  return (
    <>
      <ToastContainer />
      <Snackbar
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
      {/* <Typography textAlign={'center'} pb={3} color={'#f63333d1'} fontWeight={'bold'}>
        {!address && !provider?.publicKey ? 'Please connect wallet first' : ''}</Typography> */}
      <Typography
        textAlign={"center"}
        pb={1}
        variant="h5"
        fontWeight={"bold"}
        color="#fff"
      >
        BRIDGE
      </Typography>

      <Card
        sx={{
          border: 1,
          borderColor: "blue",
          backgroundColor: "transparent",
          borderRadius: 5,
          paddingX: { xs: "10px", sm: "20px", md: "40px" },
          width: { sm: "540px", md: "658px" },
        }}
      >
        {/* 1st row */}
        <Grid container sx={{ paddingTop: 3 }}>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "start", md: "end" },
            }}
          >
            <Box
              width={"100%"}
              sx={{
                paddingX: { xs: "12px", sm: "5px" },
                backgroundColor: "black !important",
              }}
            >
              <Typography
                variant="body2"
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  paddingBottom: 1,
                  paddingLeft: 1,
                  background: "black",
                }}
              >
                {" "}
                From (Source){" "}
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fromChain}
                label="Relayer"
                onChange={handleFromChain}
                inputProps={{
                  MenuProps: {
                    MenuListProps: {
                      sx: { backgroundColor: "black" },
                    },
                  },
                  "aria-label": "Without label",
                }}
                sx={{
                  boxShadow: "none",
                  border: 1,
                  width: "100%",
                  height: "35px",
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",

                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    border: 0,
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none", // Remove the box shadow on focus
                    borderColor: "transparent", // Remove border color on focus
                    background: "black",
                  },
                }}
              >
                {chains.map((e, i) => {
                  console.log("sdfgxuiashc", chains);
                  return (
                    <MenuItem
                      sx={{
                        color: "white",
                        background: "black !important",
                        "&:hover": {},
                      }}
                      className="menuItem"
                      defaultValue={e[0]?.id}
                      value={e?.id}
                      style={{
                        textTransform: "capitalize",
                        background: "black", //menu
                      }}
                    >
                      {e?.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {fromChain === "" ? (
                ""
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    paddingLeft: "5px",
                    background: "black",
                  }}
                >
                  <Box
                    sx={{ paddingTop: "8px" }} //text change
                    width={15}
                    component="img"
                    alt="solana"
                    src="../instant.svg"
                  />
                  <Typography
                    variant="body2"
                    className="fontLatto"
                    sx={{
                      color: "white",
                      fontSize: "14px",
                      paddingLeft: "4px",
                      paddingTop: "9px", // text change
                      fontSize: "10px",
                      display: "flex",
                      background: "black", //menu box
                    }}
                  >
                    {fromChain === 1 ? (
                      <>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "500 !important",
                          }}
                          className="connectDeposit"
                          onClick={() => handleWalletConnect(fromChain)}
                        >
                          {console.log("test connectWallet", connectWallet)}
                          {connectWallet === "freighter"
                            ? "Connected"
                            : "Connect"}{" "}
                          {"  "}
                        </span>

                        {connectWallet === "freighter" ? (
                          <span
                            className="phantomConnectDeposit"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                props?.FreighterAddress
                              )
                            }
                          >
                            {shortAddress(props?.FreighterAddress)}
                          </span>
                        ) : (
                          <Box
                            sx={{
                              paddingTop: "6px",
                            }}
                          >
                            <Box
                              sx={{ px: "2px", mb: "-3px" }}
                              component="img"
                              alt="solana-icon"
                              src="/Phantom.svg"
                              width={20}
                              height={13}
                            />
                            Freighter wallet
                          </Box>
                        )}
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "500 !important",
                          }}
                          className="connectDeposit"
                          onClick={() => handleWalletConnect(fromChain)}
                        >
                          {connectWallet === "phantom"
                            ? "Connected"
                            : "Connect"}{" "}
                          {"  "}
                        </span>
                        {connectWallet === "phantom" ? (
                          <span
                            className="phantomConnectDeposit"
                            onClick={() =>
                              navigator.clipboard.writeText(props?.phantomAddr)
                            }
                          >
                            {shortAddress(props?.phantomAddr)}
                          </span>
                        ) : (
                          <Box
                            sx={{
                              paddingTop: "6px",
                            }}
                          >
                            <Box
                              sx={{ px: "2px", mb: "-3px" }}
                              component="img"
                              alt="solana-icon"
                              src="/Phantom.svg"
                              width={20}
                              height={13}
                            />
                            Phantom wallet
                          </Box>
                        )}
                      </>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={2}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "center" },
              paddingTop: { xs: 1, sm: 3.5, md: 3.4 },
              paddingX: { md: 0 },
            }}
          >
            <SwapHorizontalCircleIcon
              sx={{
                color: "white",
                fontSize: 30,
                cursor: "pointer",
                transform: {
                  xs: "rotate(90deg)",
                  sm: "rotate(180deg)",
                  md: "rotate(180deg)",
                },
              }}
              onClick={handleSwapIcon}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "start", md: "end" },
            }}
          >
            <Box
              width={"100%"}
              sx={{
                paddingX: { xs: "12px", sm: "5px" },
                backgroundColor: "black !important",
              }}
            >
              <Typography
                variant="body2"
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  paddingBottom: 1,
                  paddingLeft: 1,
                  background: "black",
                }}
              >
                {" "}
                To (Destination ){" "}
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toChain}
                label="Relayer"
                onChange={handleToChain}
                inputProps={{
                  MenuProps: {
                    MenuListProps: {
                      sx: { backgroundColor: "black" },
                    },
                  },
                  "aria-label": "Without label",
                }}
                sx={{
                  border: 1,
                  width: "100%",
                  height: "35px",
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&:focus": {
                    outline: "none",
                    borderRadius: "4px", // This ensures the select retains its rounded corners
                    backgroundColor: "black !important", // Remove background color on focus
                    boxShadow: "none", // Remove the box shadow on focus
                    borderColor: "transparent", // Remove border color on focus
                  },
                }}
              >
                {chains.map((e, i) => {
                  return (
                    <MenuItem
                      sx={{
                        color: "white",
                        background: "black",
                        "&:hover": {
                          background: "black",
                        },
                      }}
                      // defaultValue={e[0]?.name}
                      // value={e?.name}
                      defaultValue={e[0]?.id}
                      value={e?.id}
                      style={{
                        textTransform: "capitalize",
                        background: "black", //menu box
                      }}
                    >
                      {e?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Grid>
        </Grid>

        {/* 2nd row test */}

        <Grid container sx={{ paddingTop: 3 }}>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "start", md: "end" },
            }}
          >
            <Box
              width={"100%"}
              sx={{
                paddingX: { xs: "12px", sm: "5px" },
              }}
            >
              <Typography
                variant="body2"
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  paddingBottom: 1,
                  paddingLeft: 1,
                }}
              >
                {" "}
                Asset (You would like to bridge)
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assestValue}
                label="Relayer"
                onChange={handleAssestValue}
                inputProps={{
                  "aria-label": "Without label",
                  MenuProps: {
                    MenuListProps: {
                      sx: {
                        backgroundColor: "black",
                      },
                    },
                  },
                }}
                sx={{
                  border: 1,
                  width: "100%",
                  height: "35px",
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&:focus": {
                    outline: "none",
                    borderRadius: "4px", // This ensures the select retains its rounded corners
                    backgroundColor: "transparent", // Remove background color on focus
                    boxShadow: "none", // Remove the box shadow on focus
                    borderColor: "transparent", // Remove border color on focus
                    background: "black",
                  },
                }}
              >
                {currentAsset.map((e) => {
                  console.log("currentAsset:", currentAsset);
                  console.log("e:", e);
                  return (
                  <MenuItem
                    sx={{
                      color: "white",
                      background: "black",
                      gap: "4px",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                    style={{
                      textTransform: "capitalize",
                    }}
                    value={e?.name}
                    defaultValue={e?.name}
                  >
                    <span
                      style={{
                        marginTop: "2px",
                        position: "absolute",
                      }}
                    >
                      {e?.name === "SOL" || e?.name === "WSOL" ? (
                        <img
                          width={16}
                          height={16}
                          alt="solana"
                          style={{ marginRight: "5px" }}
                          src="../solana.png"
                        />
                      ) : (
                        <img
                          width={17}
                          height={14}
                          alt="stellar"
                          style={{ marginRight: "5px" }}
                          src="../steller.png"
                        />
                      )}
                    </span>
                    <span
                      style={{
                        marginLeft: "24px",
                      }}
                    >
                      {e?.name}
                    </span>
                  </MenuItem>
                )})}
              </Select>
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={2}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "center" },
              paddingTop: { xs: 1, sm: 3, md: 2 },
              paddingX: { md: 0 },
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "center" },
            }}
          >
            <Box
              width="100%"
              sx={{
                paddingX: { xs: "12px", sm: "5px" },
              }}
            >
              <Typography
                className="fhandleOpenontLatto"
                fullWidth
                variant="body2"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  paddingBottom: 1,
                  paddingLeft: { xs: 1, md: 1 },
                }}
              >
                Amount
              </Typography>

              <TextField
                fullWidth
                autoComplete="off"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter Amount"
                sx={{
                  border: 1,
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",
                  "& .MuiTextField-root": { width: 300, color: "white" },
                  "& .MuiInput-underline:after": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    color: "white",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* 3rd row */}

        <Grid container sx={{ paddingTop: 3 }}>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "start", md: "end" },
            }}
          >
            <Box
              width={"100%"}
              sx={{
                paddingX: { xs: "12px", sm: "5px" },
              }}
            >
              <Typography
                variant="body2"
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  paddingBottom: 1,
                  paddingLeft: 1,
                }}
              >
                {" "}
                Relayer{" "}
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={relayerName}
                label="Relayer"
                onChange={handleChange}
                inputProps={{
                  "aria-label": "Without label",
                  MenuProps: {
                    MenuListProps: {
                      sx: {
                        backgroundColor: "black",
                      },
                    },
                  },
                }}
                sx={{
                  border: 1,
                  width: "100%",
                  height: "35px",
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",

                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&:focus": {
                    outline: "none",
                    borderRadius: "4px", // This ensures the select retains its rounded corners
                    backgroundColor: "transparent", // Remove background color on focus
                    boxShadow: "none", // Remove the box shadow on focus
                    borderColor: "transparent", // Remove border color on focus
                  },
                }}
              >
                <MenuItem
                  style={{ backgroundColor: "black", color: "white" }}
                  defaultValue={"self"}
                  value={"self"}
                >
                  Self
                </MenuItem>
                <MenuItem
                  style={{ backgroundColor: "black", color: "white" }}
                  disabled
                  value={"solana"}
                >
                  Sorolana
                </MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid
            xs={12}
            sm={2}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "center" },
              paddingTop: { xs: 1, sm: 3, md: 2 },
              paddingX: { md: 0 },
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "center" },
              flexDirection: "row", // Stack content vertically on smaller screens
              alignItems: { xs: "center", sm: "center", md: "flex-start" }, // Align items to the left on md screens
            }}
          >
            <Box
              // // const publickey = Buffer.from(keyPair.publicKey).toString("
              width="100%"
              sx={{
                paddingX: { xs: "12px", sm: "5px", md: "5px" },
              }}
            >
              <Typography
                className="fontLatto"
                variant="body2"
                sx={{
                  color: "white",
                  fontSize: { xs: "12px", sm: "14px", md: "14px" },
                  paddingBottom: 1,
                  paddingLeft: { xs: 1, md: 1 },
                }}
              >
                Destination
              </Typography>

              <TextField
                fullWidth
                value={destinationAddr}
                autoComplete="off"
                onChange={(e) => setDestinationAddr(e.target.value)}
                placeholder="Enter Destination Address"
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title={
                        "The wrapped token will be delivered to this address"
                      }
                    >
                      <InputAdornment position="end">
                        <Box
                          // width={14}
                          component="img"
                          alt="solana"
                          src="../instant.svg"
                        />
                      </InputAdornment>
                    </Tooltip>
                  ),
                }}
                sx={{
                  border: 1,
                  borderColor: "white",
                  borderRadius: 2,
                  color: "white",

                  "& .MuiTextField-root": { width: 300, color: "white" },

                  "& .MuiInput-underline:after": {
                    border: "none",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 35,
                    color: "white",

                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              ></TextField>
            </Box>
          </Grid>
        </Grid>

        {/* 4th row */}

        <Grid container sx={{ paddingTop: { xs: 2, sm: 3, md: 4 } }}>
          <Grid
            itemdestinationAddr
            xs={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "start", md: "start" },
              alignItems: { xs: "start", sm: "start", md: "start" },
              paddingRight: { xs: 0, sm: 1, md: 0 },
              paddingLeft: { xs: 2, sm: 1, md: 0 },
              paddingBottom: { xs: 2, sm: 0, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="yellow"
                class="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <Typography
                className="fontLatto"
                sx={{
                  color: "white",
                  fontSize: { xs: 12, sm: 11, md: "14px" },
                  paddingX: "10px",
                }}
              >
                Bridge charges 0.01% on every transaction
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", paddingY: { xs: 2, sm: 3, md: 4 } }}>
          <Button
            variant="outlined"
            className="fontLatto"
            sx={{
              width: { xs: 130, sm: 220, md: 350 },
              textAlign: "center",
              backgroundColor: "transparent",
              border: 1,
              borderColor: "white",
              color: "white",
              fontSize: { xs: "10px", sm: "12px", md: "14px" },
            }}
            // onClick={handleOpen}
            onClick={handleMethodCalling}
          >
            {isLoading ? (
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="inherit" size={25} />
              </Stack>
            ) : (
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                Bridge Token
              </Stack>
            )}
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              mt: "80px",
              backdropFilter: "blur(15px)",
            }}
          >
            {/* <Box
              
                sx={{
                  width: "800px", 
                  border: "2px solid blue", 
                }}
            > */}
            <Box sx={style}>
              <div
                style={{
                  borderBottom: "1px solid white",
                  paddingBottom: "10px",
                  marginBottom: "20px",

                  borderRadius: 2,
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
                  Step 1 successfully completed
                </Typography>
              </div>

              <div
                style={{
                  borderBottom: "1px solid white",
                  paddingBottom: "10px",
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
                  Transaction Details
                </Typography>
              </div>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    className="fontLatto"
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: { xs: "12px", md: "14px" },
                      textAlign: "start",
                      pt: 1,
                    }}
                  >
                    Transaction Hash
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
                    {shortAddress(`${txHash}`)}

                    <ContentCopyIcon
                      sx={{
                        marginLeft: 1,
                        color: "#fff",
                        width: 18,
                        height: 18,
                        paddingTop: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(txHash),
                          setSnackBarOpen(true);
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "start",
                      pt: 1,
                    }}
                  >
                    Status
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={{ textAlign: "end", px: 1 }}>
                  <Button
                    startIcon={
                      <DoneIcon
                        sx={{
                          color: "#000",
                          backgroundColor: "black",
                          borderRadius: "48%",
                          width: 12,
                          height: 12,
                          fontSize: "10px",
                        }}
                      />
                    }
                    variant="outlined"
                    sx={{
                      backgroundColor: "#000",
                      color: "#4da14d",
                      width: 90,
                      height: 22,
                      fontSize: "10px",
                      border: 1,
                      borderColor: "black",
                    }}
                  >
                    Success
                  </Button>
                </Grid>
              </Grid>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "start",
                      pt: 1,
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
                    {shortAddress(`${destinationAddr}`)}

                    <ContentCopyIcon
                      sx={{
                        marginLeft: 1,
                        color: "#fff",
                        width: 18,
                        height: 18,
                        paddingTop: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(destinationAddr),
                          setSnackBarOpen(true);
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    className="fontLatto"
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "start",
                    }}
                  >
                    From
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
                    {shortAddress(`${userWalletAdd}`)}

                    <ContentCopyIcon
                      sx={{
                        marginLeft: 1,
                        color: "#fff",
                        width: 18,
                        height: 18,
                        paddingTop: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(userWalletAdd),
                          setSnackBarOpen(true);
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    className="fontLatto"
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "start",
                    }}
                  >
                    Amount :
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
                  {/* <img
                    width={18}
                    alt="solana"
                    src="../solana.png"
                    sx={{ pt: 1 }}
                  /> */}
                  <Typography
                    className="fontLatto"
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "end",
                      px: 1,
                    }}
                  >
                    {depositAmount}
                    {/* <span>($1235)</span> */}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container sx={{ pt: 2 }}>
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
                    Transaction Fee :
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
                      px: 1,
                    }}
                  >
                    0.0185
                    <span>($0.00)</span>
                    </Typography>
                    </Grid>
                    </Grid>

              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    className="fontLatto"
                    variannt="body2"
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      textAlign: "start",
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
                      color: "white",
                      fontSize: "12px",
                      textAlign: "end",
                      px: 1,
                    }}
                  >
                    0.831
                    <span>($0.00)</span>
                  </Typography>
                </Grid>
              </Grid> */}

              <Box
                sx={{
                  textAlign: "center",
                  pt: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white !important",
                  }}
                  className="nextStep"
                >
                  NEXT STEP
                  {"   : "}
                </div>

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
                  onClick={openModal}
                >
                  Proceed to claim
                </Button>
              </Box>
            </Box>
            {/* </Box> */}
          </Modal>

          <Modal
            open={modalOpen}
            onClose={closeModal}
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
                  Steps to Claim
                </Typography>
              </div>
              <Typography
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
                <b>2) Open GMP Explorer:</b> Click to navigate on{" "}
                <a
                  target="_blank"
                  // href={`https://gmp.xqutus.com/pendingtransaction/?txhash=${txHash}`}
                  href={`http://localhost:3001/pendingtransaction`}
                  style={{ color: "#2695FF" }}
                >
                  GMP-Explorer
                </a>
                .
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
                <b>3) Search for Your Transaction:</b> Paste the Transaction
                Hash into the search bar on the GMP Explorer to locate your
                transaction.
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
                <b>4) Copy the Message:</b> Once you find your transaction,
                click the "Copy" button to obtain the required message.
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
                <b>5) Return to Sorolana Bridge:</b> Go back to your{" "}
                <a
                  target="_blank"
                  href="https://sorolan-bridge-new.vercel.app/BridgeAsset/Claim"
                  style={{ color: "#2695FF" }}
                >
                  Sorolana Bridge
                </a>{" "}
                "Claim" section for Claim.
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
                <b> 6) Paste and Claim:</b> In the claim section, paste the
                copied message into the provided input field and click the
                "Claim" button to complete the process.
              </Typography>
              <Typography
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
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  className="modal"
                  variant="outlined"
                  sx={{
                    marginBottom: "10px",
                    // width: 70,
                    height: 29,
                    textAlign: "center",
                    backgroundColor: "black",
                    border: 1,
                    borderColor: "white",
                    color: "white",
                  }}
                  onClick={btnText == 0 ? closeModal : handleTab}
                >
                  {btnText == 0 ? "Proceed to GMP explorer" : ""}
                  {btnText == 1 ? "proceed to claim" : ""}
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Card>
    </>
  );
}
