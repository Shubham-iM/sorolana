import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Container, Typography, Grid, Button } from '@mui/material';
import BridgeAssetNavbar from '@/component/BridgeAssetNavbar';
import DoneIcon from "@mui/icons-material/Done";
import { useState, useEffect } from "react";
import axios from "axios";



function createData(name, calories, fat, carbs, protein, status) {
  return { name, calories, fat, carbs, protein, status };
}


// const rows = [
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26', '12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26', '12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26', '12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26','12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26', '12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),
//     createData('0x3cc..........5fee25', '0X4ax..........3Lee26', '12 SOL ($1235)', '0.0185 ($0.00)', '0.0185 ($0.00)','success'),

// ];



export default function TransactionHistory() {
  const [DepositMessage, setDepositMessage] = useState([])
  const apiUrl = process.env.NEXT_PUBLIC_HOST_API_KEY
  console.log("apiurl--->", apiUrl)
  useEffect(() => {
    handleGet()
  }, []);

  const handleGet = async () => {
    try {

      console.log("getttttt")
      axios.get(`https://sorolan-bridge-new-git-main-ssinghbb.vercel.app/api/getMessage`).then((response) => {
        console.log("response form api ", response)
        let data = response.data.data
        console.log("data---->", data)

        setDepositMessage(data)
      })
    } catch (error) {
      console.log("🚀 ~ file: TransactioHistory.js:55 ~ handleGet ~ error:", error)

    }
  }
  return (

    <Container >
      <BridgeAssetNavbar />

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', pt: 14 }}>
        <Typography

          className="fontFamily "
          variannt="h6"
          sx={{
            color: "white",
            fontSize: "25px",
            textAlign: "center",

          }}
        >
          Transaction History
        </Typography>




        <Table
          sx={{
            minWidth: 650,
            mt: 5,
            border: '1px solid white',
            borderRadius: '10px',
            borderCollapse: 'separate',
            borderSpacing: '0 10px',
          }}
          size="small"
          aria-label="a dense table"
        >  <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: 'white' }}>To</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>From</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Amount</TableCell>
              {/* <TableCell align="center" sx={{ color: 'white' }}>Transaction Fee</TableCell> */}
              <TableCell align="center" sx={{ color: 'white' }}>Gas Fee</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DepositMessage.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  borderBottom: '1px solid white',
                  fontSize: "12px",
                }}
              >
                <TableCell component="th" scope="row" align="center" sx={{ color: 'white' }}>
                  {row.toaddress && row.toaddress.length > 15
                    ? row.toaddress.substring(0, 15) + '...'
                    : row.toaddress}
                </TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{row.fromaddress && row.fromaddress.length > 15
                  ? row.fromaddress.substring(0, 15) + '...'
                  : row.fromaddress}</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{row.amount}</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>{row.fee}</TableCell>
                {/* <TableCell align="center" sx={{ color: 'white' }}>{row.protein}</TableCell> */}
                <TableCell align="center">
                  <Grid container justifyContent="flex-end" sx={{ px: 1 }}>
                    {row.status === "pending" ?
                      <Button
                        startIcon={
                          <DoneIcon
                            sx={{
                              color: "#000",
                              backgroundColor: "red",
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
                          color: "red",
                          width: { xs: 70, sm: 90 },
                          height: 22,
                          fontSize: "8px",
                          border: 1,
                          borderColor: "red",
                        }}
                      >
                        {row.status}
                      </Button> :
                      <Button
                        startIcon={
                          <DoneIcon
                            sx={{
                              color: "#000",
                              backgroundColor: "green",
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
                          width: { xs: 70, sm: 90 },
                          height: 22,
                          fontSize: "8px",
                          border: 1,
                          borderColor: "green",
                        }}
                      >
                        {row.status}
                      </Button>
                    }
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        {/* <table>
    <thead>
        <tr>
            <th>Fish</th>
            <th>Beef</th>
            <th>Chicken</th>
            <th>test</th>
            <th>test</th>
            <th>test</th>

        </tr>
    </thead>
    <tbody>
    <tr style={{border:"1px solid red"}}>
        <td data-title="Fish">Sturgeon</td>
        <td data-title="Beef">Jersey</td>
        <td data-title="Chicken">Speckled</td>
        <td data-title="Duck">Mallard</td>
        <td data-title="Duck">Mallard</td>
        <td data-title="Duck">Mallard</td>
    </tr>
    <tr style={{border:"1px solid red"}}>
        <td data-title="Duck">Mallard</td>
        <td data-title="Fish">Salmon</td>
        <td data-title="Beef">Tauros</td>
        <td data-title="Chicken">Australorp</td>
        <td data-title="Duck">Saxony</td>
        <td data-title="Duck">Mallard</td>
    </tr>
    <tr style={{border:"1px solid red",borderRadius:'20px'}}>
        <td data-title="Duck">Mallard</td>
        <td data-title="Fish">Tuna</td>
        <td data-title="Beef">Sussex</td>
        <td data-title="Chicken">Braekel</td>
        <td data-title="Duck">Alabio</td>
        <td data-title="Duck">Mallard</td>
    </tr>
</tbody>

</table> */}

      </TableContainer>
    </Container>


  );
}