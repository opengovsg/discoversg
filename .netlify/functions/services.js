const ethers = require('ethers')
const { Wallet } = require('ethers')
const abi = require('./abi')

// Provider to connect to local blockchain
const localProviderUrl = "http://localhost:8545";
// Provider to connect via RPCUrl
const infuraProviderUrl = "https://rinkeby.infura.io/v3/0381915c632140b78efa49ff3f94ac0c";

// Set config with ENVs
const providerUrl = localProviderUrl;
const provider = new ethers.providers.StaticJsonRpcProvider(providerUrl);

const deployedContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

// Hot Wallet Address 0x9E604F95A8562d40f7e5216731715bac1e57E401
const hotWalletAddress = '0x9E604F95A8562d40f7e5216731715bac1e57E401'
const hotWalletPrivateKey = ''
const signer = new ethers.Wallet(hotWalletPrivateKey, provider);


const sendToAddress = async (recipientAddress) => {
    // Contract abi isn't providing autocomplete but can reference docs for ERC-721 NFTS
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
    const contract = new ethers.Contract(deployedContractAddress, abi, signer);

    // Check balance of tokens
    const balance = (await contract.balanceOf(hotWalletAddress)).toNumber()
    if (balance === 0) throw new Error('All NFTs have been redeemed')

    // Get token id of the zero index
    const tokenId = (await contract.tokenOfOwnerByIndex(hotWalletAddress, 0)).toNumber()
    console.log(tokenId);

    // Transfer to recipient
    await contract.transferFrom(signer.address, recipientAddress, tokenId)

    return recipientAddress
}

module.exports = { sendToAddress }