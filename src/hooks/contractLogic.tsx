import { useState, useEffect } from "react"
import {useCall, useContractFunction, useSendTransaction } from "@usedapp/core"
import PS from "../chain-info/contracts/Splitter.json"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"

export const ContractLogic = () => {
    //const {chainId} = useEthers()
    const { abi } = PS

    const bonusAddress = "0x5B6d87d9a6FcA0602100be5a52cc5cfFE480cbdC"


    const contractInterface = new utils.Interface(abi)
    const bonusContract = new Contract(bonusAddress, contractInterface)

    const { send: addEmployee, state: addEmployeeState } =
        useContractFunction(bonusContract, "_addPayee", { transactionName: "add payee" })

    const sendEmployeeInfo = (name: string, address: string, shares: number) => {
        //const mintCost = mintAmount * 0.0013
        //const asString = mintCost.toString()
        addEmployee(name, address, shares)
    }

    const {send: releaseBonus, state: releaseBonusState} = 
        useContractFunction(bonusContract, "releaseERC", {transactionName: "bonusrelease"})

    const releaseBonusCall = (tokenAddress: string, payeeAddress: string) => {
        releaseBonus(tokenAddress, payeeAddress)
    }

    const {send: bulkAward, state: bulkAwardState} = 
        useContractFunction(bonusContract, "bulkReleaseERC", {transactionName: "bulkrelease"})

    const bulkSend = (tokenAddress: string) => {
        bulkAward(tokenAddress)
    }

   
    return { sendEmployeeInfo, addEmployeeState, releaseBonusCall, releaseBonusState, bulkSend, bulkAwardState}
}