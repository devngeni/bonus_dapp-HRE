import Mock from "../chain-info/contracts/MockERC20.json"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractFunction } from "@usedapp/core"

export const MockToken = () => {
    const {abi} = Mock

    const tokenAddress = "0xFEF0D52722e914b37C3f655CAb7992FaCc739099"

    const contractAddress = "0x5B6d87d9a6FcA0602100be5a52cc5cfFE480cbdC"

    const mockInterface = new utils.Interface(abi)
    const mockErc20Contract = new Contract(tokenAddress, mockInterface)

    const {send: transact, state: transactState} = useContractFunction(
        mockErc20Contract, "transfer", {transactionName: "funding"}
    )

    const fundContract = (amount: number) => {
        const amountAsString = amount.toString()
        const usdtAmount = utils.parseEther(amountAsString)
        transact(contractAddress, usdtAmount)
    }

    return {fundContract, transactState}
}