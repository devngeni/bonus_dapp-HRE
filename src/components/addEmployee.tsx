import React, { useState, useEffect } from "react";
import { useEthers, useNotifications } from "@usedapp/core";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ContractLogic } from "../hooks/contractLogic";

import Papa from "papaparse";

export const AddEmployee = () => {
  const { notifications } = useNotifications();
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeAddress, setEmployeeAddress] = useState<string>("0x");
  const [shares, setShares] = useState<number>(0);
  const [data, setData] = useState("");
  const [dataJson, setDataJson] = useState<any[]>([]);

  const { account } = useEthers();
  const { sendEmployeeInfo, addEmployeeState, sendCSVData } = ContractLogic();

  const isConnected = account !== undefined;

  let setAddressArray: any = [];
  let setSharesArray: any = [];
  let setNameArray: any = [];

  const handleChange = (e: any) => {
    setData(e.target.files[0]);
    // console.log("data", e.target.files[0]);
  };

  const addingEmployee = (e: any) => {
    if (e) {
      e.preventDefault();
      Papa.parse(data, {
        header: true,
        delimiter: ",",
        complete: (results: any) => {
          // console.log(results.data);
          setDataJson(results.data);
        }
      });
    }

    sendCSV();
  };

  const sendCSV = () => {
    // for (let i = 0; i < dataJson.length - 1; i++) {
    //   setAddressArray.push(dataJson[i].address);
    //   console.log(setAddressArray);
    // }

    // for (let i = 0; i < dataJson.length - 1; i++) {
    //   setSharesArray.push(dataJson[i].amount);
    // }

    // for (let i = 0; i < dataJson.length - 1; i++) {
    //   setNameArray.push(dataJson[i].name);
    // }

    sendCSVData(setNameArray, setAddressArray, setSharesArray);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value === "" ? "" : String(event.target.value);
    setEmployeeName(newName);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress =
      event.target.value === "" ? "" : String(event.target.value);
    setEmployeeAddress(newAddress);
  };

  const handleSharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newShares = Number(event.target.value);
    setShares(newShares);
  };

  const sendInfo = () => {
    sendEmployeeInfo(employeeName, employeeAddress, shares);
  };

  const isMining = addEmployeeState.status === "Mining";

  const [addDataSuccess, setAddDataSuccess] = useState(false);

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "add payee"
      ).length > 0
    ) {
      setAddDataSuccess(true);
    }
  }, [notifications, addDataSuccess]);

  const handleCloseSnack = () => {
    setAddDataSuccess(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center"
      }}
    >
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "rigth",
            mt: 7,
            fontWeight: "bold",
            fontSize: 26,
            fontFamily: "Audiowide",
            textDecoration: "underline"
          }}
          color="primary.main"
        >
          Add Employees
        </Typography>
        <Box
          sx={{
            bgcolor: "transparent",
            alignItems: "left",
            flexDirection: "column",
            minHeight: 400,
            minWidth: { sx: "auto", md: 400 },
            marginRight: "auto",
            marginLeft: "auto",
            justifyContent: "center",
            cursor: "pointer",
            mt: 7
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 1,
              mt: 7
            }}
          >
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
            <Box
              sx={{
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Button variant="contained" component="label">
                <input type="file" onChange={handleChange} />
              </Button>
              <Button
                sx={{ mt: 7, m: 2 }}
                color="primary"
                variant="contained"
                onClick={addingEmployee}
              >
                Submit CSV
              </Button>

              {isConnected ? (
                <Button
                  sx={{ mt: 8, ml: 9 }}
                  color="primary"
                  variant="contained"
                  onClick={sendInfo}
                  disabled={isMining}
                >
                  {isMining ? (
                    <CircularProgress color="primary" size={35} />
                  ) : (
                    "Add Employee"
                  )}
                </Button>
              ) : (
                <Alert severity="info">
                  Connect Wallet to Add employee data
                </Alert>
              )}
              <Snackbar
                open={addDataSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
              >
                <Alert onClose={handleCloseSnack} severity="success">
                  Employee Added
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
