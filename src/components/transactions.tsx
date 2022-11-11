import { useLogs } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"
import { utils } from "ethers"
import PS from "../chain-info/contracts/Splitter.json"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography, Box } from "@mui/material"
import { formatUnits } from "@ethersproject/units"
import React, { useState, useEffect } from 'react';


export const Transactions = () => {

    //const [eventLogs, setEventLogs] = useState([])

    const targetContractAddress = "0x3Cf2a05B66797D83341531Cc6D5b2315EaF2594a"

    const { abi } = PS

    const eventInterface = new utils.Interface(abi)
    const targetContract = new Contract(targetContractAddress, eventInterface)

    const addEmployeeLogs = useLogs(
        {
            contract: targetContract,
            event: 'PayeeAdded',
            args: [],
        },
        {
            fromBlock: 24497252,
            toBlock: 'latest',
        }
    )

    const paymentLogs = useLogs(
        {
            contract: targetContract,
            event: 'ERC20PaymentReleased',
            args: [],
        },
        {
            fromBlock: 24440971,
            toBlock: 'latest',
        }
    )

    return (
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "center" }}>
            <Box>
            <Box>
        <TableContainer component={Paper} sx={{mt: 4}}>
        <Typography sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: 'Audiowide'
          }} >Added Employees</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Shares</TableCell>
            <TableCell align="center">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addEmployeeLogs?.value?.map((log, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {log.data.name}
              </TableCell>
              <TableCell align="center">{log.data.shares.toString()}</TableCell>
              <TableCell align="center">{log.data.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    <Box>
    <TableContainer component={Paper} sx={{mt: 4}}>
        <Typography sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: 'Audiowide'
          }} >Paid Bonuses</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Recipient</TableCell>
            <TableCell align="center">Amount(USDT)</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Token</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentLogs?.value?.map((log, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {log.data.recipient}
              </TableCell>
              <TableCell align="center">{parseFloat(formatUnits(log.data.amount.toString(), 18))}</TableCell>
              <TableCell align="center">{log.data.to}</TableCell>
              <TableCell align="center">{log.data.token}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
    </Container>
    )
}