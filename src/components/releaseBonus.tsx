import React, { useState, useEffect } from 'react';
import { Container, Box, Button, CircularProgress, Snackbar, Alert, Typography } from "@mui/material"
import TextField from '@mui/material/TextField'
import {ContractLogic} from "../hooks/contractLogic"
import { useEthers, useNotifications } from "@usedapp/core"


export const ReleaseBonus = () => {

    const { notifications } = useNotifications();
    const [address, setAddress] = useState<string>('0x')
    const [receiverAddress, setReceiverAddress] = useState<string>('0x')
    const [bonusSendSuccess, setBonusSendSuccess] = useState(false)
    const [bulkSendSuccess, setBulkSendSuccess] = useState(false)
    const [bulkTokenAddress, setBulkTokenAddress] = useState<string>('0x')

    const { account } = useEthers()
    const isConnected = account !== undefined

    const {releaseBonusCall, releaseBonusState, bulkSend, bulkAwardState} = ContractLogic()

    const handleTokenAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newToken = event.target.value == "" ? "" : String(event.target.value); 
        setAddress(newToken)
      }

      const handlePayeeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newReceiver = event.target.value == "" ? "" : String(event.target.value); 
        setReceiverAddress(newReceiver)
      }

      const handleBonus = () => {
        releaseBonusCall(address, receiverAddress)
      }

      const handleBulkTokenAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bulkAddress = event.target.value == "" ? "" : String(event.target.value); 
        setBulkTokenAddress(bulkAddress)
      }

      const handleBulkBonus = () => {
        bulkSend(bulkTokenAddress)
      }

    const isMining = releaseBonusState.status === "Mining"

    const isMining2 = bulkAwardState.status === "Mining"

    useEffect(() => {
        if (
          notifications.filter(
            (notification) =>
              notification.type === "transactionSucceed" &&
              notification.transactionName === "bonusrelease"
          ).length > 0
        ) {
          setBonusSendSuccess(true)
        }
    
      }, [notifications, bonusSendSuccess]);


      const handleCloseSnack = () => {
        setBonusSendSuccess(false)
      }

      useEffect(() => {
        if (
          notifications.filter(
            (notification) =>
              notification.type === "transactionSucceed" &&
              notification.transactionName === "bulkrelease"
          ).length > 0
        ) {
          setBulkSendSuccess(true)
        }
    
      }, [notifications, bulkSendSuccess]);

      const handleBulkCloseSnack = () => {
        setBulkSendSuccess(false)
      }

    return (
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "center" }}>
        <Box>
          <Typography sx={{
            display: "flex",
            justifyContent: "center",
            mt: 13,
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: 'Audiowide'
          }} color="primary.main">Award Bonus</Typography>
          <Box sx={{
            bgcolor: "transparent",
           
            flexDirection: "column",
            minHeight: 400,
            minWidth: { sx: "auto", md: 400 },
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            marginTop: 3,


          }}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 3,
              mt: 7,
            }}>
              <TextField
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                FormHelperTextProps={{ style: { color: "white" } }}
                sx={{ fontWeight: "bold" }}
                required={true}
                id="outlined-required"
                label="Required"
                defaultValue="Token Address"
                helperText="IERC20 Token"
                onChange={handleTokenAddress}
              />
              <TextField
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                FormHelperTextProps={{ style: { color: "white" } }}
                sx={{ fontWeight: "bold" }}
                required={true}
                id="outlined-required"
                label="Required"
                defaultValue="address"
                helperText="Employee Address"
                onChange={handlePayeeAddress}
              />
              {isConnected ? (<Button
                    sx={{ m: 4, }}
                    color="primary" variant="contained"
                    onClick={handleBonus}>
                    {isMining ? <CircularProgress color="primary" size={35} /> : "Release Bonus"}
              </Button>):(
                <Alert severity="info">Connect Wallet to Award Bonus</Alert>
              )}
              <Snackbar
                open={bonusSendSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                  Bonus Awarded
                </Alert>
              </Snackbar>

            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 3,
              mt: 7,
            }}>
              <TextField
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                FormHelperTextProps={{ style: { color: "white" } }}
                sx={{ fontWeight: "bold" }}
                required={true}
                id="outlined-required"
                label="Required"
                defaultValue="Token Address"
                helperText="IERC20 Token"
                onChange={handleBulkTokenAddress}
              />
              {isConnected ? (<Button
                    sx={{ m: 4, }}
                    color="primary" variant="contained"
                    onClick={handleBulkBonus}>
                    {isMining2 ? <CircularProgress color="primary" size={35} /> : "Bulk Release Bonus"}
              </Button>):(
                <Alert severity="info">Connect Wallet to Bulk Award Bonus</Alert>
              )}
              <Snackbar
                open={bulkSendSuccess}
                autoHideDuration={5000}
                onClose={handleBulkCloseSnack}>
                <Alert onClose={handleBulkCloseSnack} severity="success">
                  Bonus Awarded
                </Alert>
              </Snackbar>

            </Box>
          </Box>
        </Box>
      </Container>
    )
}