import React, { useState, useEffect } from 'react';
import { Container, Box, Button, CircularProgress, Snackbar, Alert, Typography } from "@mui/material"
import TextField from '@mui/material/TextField'
import { MockToken } from "../hooks/usdt"
import { useEthers, useNotifications } from "@usedapp/core"

export const Fund = () => {

    const { notifications } = useNotifications();
    const [amount, setAmount] = useState<number>(0)
    const [addDataSuccess, setAddDataSuccess] = useState(false)

    const { account } = useEthers()
    const isConnected = account !== undefined

    const {fundContract, transactState} = MockToken()

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = Number(event.target.value);   
        setAmount(newAmount);
      }

      const handleFund = () => {
        fundContract(amount)
      }

      const isMining = transactState.status === "Mining"

      useEffect(() => {
        if (
          notifications.filter(
            (notification) =>
              notification.type === "transactionSucceed" &&
              notification.transactionName === "funding"
          ).length > 0
        ) {
          setAddDataSuccess(true)
        }
    
      }, [notifications, addDataSuccess]);

      const handleCloseSnack = () => {
        setAddDataSuccess(false)
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
          }} color="primary.main">Fund Bonus Contract</Typography>
          <Box sx={{
            bgcolor: "transparent",
            alignItems: "left",
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
                sx={{ fontWeight: "bold", marginLeft: 2 }}
                required={true}
                id="outlined-required"
                label="Required"
                defaultValue="amount"
                helperText="Token Amount"
                onChange={handleAmountChange}
              />
              {isConnected? (<Button
                    sx={{ m: 4, }}
                    color="primary" variant="contained"
                    onClick={handleFund}
                    disabled={isMining}>
                    {isMining ? <CircularProgress color="primary" size={35} /> : "Fund"}
              </Button>):(
                <Alert severity="info">Connect Wallet to Fund Contract</Alert>
              )}
              <Snackbar
                open={addDataSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                  Contract Funded
                </Alert>
              </Snackbar>

            </Box>
          </Box>
        </Box>
      </Container>
    )
}