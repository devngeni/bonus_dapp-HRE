import React from 'react'
import {Config, DAppProvider, BSCTestnet} from "@usedapp/core"
import {MuiNavBar} from "./components/NavBar"
import { AddEmployee } from './components/addEmployee'
import { Fund } from './components/fund'
import { ReleaseBonus } from './components/releaseBonus'
import {Transactions} from './components/transactions'
import {Container} from "@mui/material"
import { Routes, Route } from "react-router-dom";


const config: Config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  networks: [BSCTestnet],
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000
  }
}


function App() {
  return (
    <DAppProvider config={config}>
       <MuiNavBar />
      <Container maxWidth="md">
      <Routes>
      <Route path="/" element={<AddEmployee />}/>
        <Route path="/AddEmployee" element={<AddEmployee />}/>
        <Route path="/Fund" element={<Fund />}/>
        <Route path="/ReleaseBonus" element={<ReleaseBonus />}/>
        <Route path="/Transactions" element={<Transactions />}/>
      </Routes>
      </Container>
    </DAppProvider>
  );
}

export default App;
