const ethers = require('ethers')
const abi = require('./abi')
const { BufferList } = require("bl");

const ipfsAPI = require("ipfs-http-client");
const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });


// Provider to connect to local blockchain
const localProviderUrl = "http://localhost:8545";
// Provider to connect via RPCUrl
const infuraProviderUrl = "https://rinkeby.infura.io/v3/0381915c632140b78efa49ff3f94ac0c";

// Set config with ENVs
const providerUrl = localProviderUrl;
const provider = new ethers.providers.StaticJsonRpcProvider(providerUrl);

const deployedContractAddress = process.env.CONTRACT_ADDRESS
const hotWalletAddress = process.env.HOT_WALLET_ADDRESS
const hotWalletPrivateKey = process.env.HOT_WALLET_PRIVATE_KEY || ''
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

const getTokensForAddress = async (address) => {
    // Contract abi isn't providing autocomplete but can reference docs for ERC-721 NFTS
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
    const contract = new ethers.Contract(deployedContractAddress, abi, signer);

    // Check balance of tokens
    const balance = (await contract.balanceOf(address)).toNumber()

    const results = [];
    for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        // Get token id of the zero index
        const tokenId = (await contract.tokenOfOwnerByIndex(address, tokenIndex)).toNumber()
        console.log('tokenId', tokenId);

        const tokenURI = await contract.tokenURI(tokenId);

        const ipfsHash = tokenURI.replace('https://ipfs.io/ipfs/', '');
        console.log('ipfsHash', ipfsHash);

        const jsonManifestBuffer = await getFromIPFS(ipfsHash);

        try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log('jsonManifest', jsonManifest);
            results.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
        } catch (e) {
            console.log(e);
        }
    }

    return results
};
const getFromIPFS = async (hashToGet) => {
    for await (const file of ipfs.get(hashToGet)) {
        console.log(file.path);
        if (!file.content) continue;
        const content = new BufferList();
        for await (const chunk of file.content) {
            content.append(chunk);
        }
        return content;
    }
};

module.exports = { sendToAddress, getTokensForAddress }