import React, { useState, useEffect } from 'react';
import { useEthers, useNotifications } from "@usedapp/core"
import { Container, Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material"
import type { } from '@mui/lab/themeAugmentation';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField'
import {ContractLogic} from "../hooks/contractLogic"


export const AddEmployee = () => {

    const { notifications } = useNotifications();
    const [employeeName, setEmployeeName] = useState<string>('')
    const [employeeaddress, setEmployeeAddress] = useState<string>('0x')
    const [shares, setShares] = useState<number>(0)


    const { account } = useEthers()
    const { sendEmployeeInfo, addEmployeeState} = ContractLogic()
    
    const isConnected = account !== undefined

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value == "" ? "" : String(event.target.value);   
        setEmployeeName(newName);
      }

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = event.target.value == "" ? "" : String(event.target.value);   
        setEmployeeAddress(newAddress);
      }
    
    const handleSharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newShares = Number(event.target.value);   
        setShares(newShares);
      }

      const sendInfo = () => {
        sendEmployeeInfo(employeeName, employeeaddress, shares)
      }

    const isMining = addEmployeeState.status === "Mining"

    const [addDataSuccess, setAddDataSuccess] = useState(false)


    useEffect(() => {
        if (
          notifications.filter(
            (notification) =>
              notification.type === "transactionSucceed" &&
              notification.transactionName === "add payee"
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
          }} color="primary.main">Add Employees</Typography>
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
                sx={{ fontWeight: "bold", mb: 2 }}
                required={true}
                id="outlined-required"
                placeholder="name"
                helperText="Employee Name"
                label="Required"
                onChange={handleNameChange}
                
              />
              <TextField
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                FormHelperTextProps={{ style: { color: "white" } }}
                sx={{ fontWeight: "bold", mb: 2 }}
                required={true}
                id="outlined-required"
                label="Required"
                placeholder="Address"
                helperText="Employee Address"
                onChange={handleAddressChange}
                
              />
              <TextField
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                FormHelperTextProps={{ style: { color: "white" } }}
                sx={{ fontWeight: "bold" }}
                required={true}
                id="outlined-required"
                label="Required"
                placeholder="0"
                helperText="Employee Shares"
                onChange={handleSharesChange}
              />
              <Box sx={{
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                {isConnected ? (
                  <Button
                    sx={{ m: 4, }}
                    color="primary" variant="contained"
                    onClick={sendInfo}
                    disabled={isMining}>
                    {isMining ? <CircularProgress color="primary" size={35} /> : "Add Employee"}
                  </Button>
                ) : (
                  <Alert severity="info">Connect Wallet to Add employee data</Alert>
                )
                }
              </Box>
              <Snackbar
                open={addDataSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                  Employee Added
                </Alert>
              </Snackbar>

            </Box>
          </Box>
        </Box>
      </Container>
    )
}