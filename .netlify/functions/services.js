const ethers = require('ethers')
const { Wallet } = require('ethers')
const abi = require('./abi')


// Provider to connect via RPCUrl

// Provider to connect o local blockchain
const localProviderUrl = "http://localhost:8545";
const localProviderUrlFromEnv = localProviderUrl;
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);

// Set config with ENVs
const provider = localProvider // removeProvider
const deployedContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const mnemonic = process.env.HOT_WALLET_MNEMONIC


// Hot Wallet Address 0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1
const wallet = Wallet.fromMnemonic(mnemonic)

const mintTo = async (address) => {
    return address
}
const getTokens = async () => {
    return wallet.address

    // Contract abi isn't providing autocomplete but can reference docs for ERC-721 NFTS
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
    // const contract = new ethers.Contract(deployedContractAddress, abi, localProvider);

    // Check balance
    // const test = await contract.balanceOf("0x9E604F95A8562d40f7e5216731715bac1e57E401")
    // console.log(test);

    // Transfer to someone
    // const test = await contract.transferFrom(wallet.address)
    // console.log(test);
}
module.exports = { mintTo, getTokens }