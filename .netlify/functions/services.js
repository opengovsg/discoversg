const ethers = require('ethers')
const abi = require('./abi')
const { BufferList } = require("bl");
const _ = require('lodash');
const bluebird = require('bluebird')
const ipfsAPI = require("ipfs-http-client");
const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });
// Provider to connect to local blockchain
const localProviderUrl = "http://localhost:8545";
// Provider to connect via RPCUrl
// https://rpc-mainnet.maticvigil.com/
const rpcProviderUrl = "https://polygon-mainnet.g.alchemy.com/v2/dLLMLJx3t3JroncLDlaU7vRceYS4mOcG";
// const rpcProviderUrl = "https://rpc-mumbai.maticvigil.com"
// const rpcProviderUrl = "https://rinkeby.infura.io/v3/0381915c632140b78efa49ff3f94ac0c";

// Set config with ENVs
const providerUrl = process.env.PROD === 'true' ? rpcProviderUrl : localProviderUrl;
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const deployedContractAddress = process.env.CONTRACT_ADDRESS
const hotWalletAddress = process.env.HOT_WALLET_ADDRESS
const hotWalletPrivateKey = process.env.HOT_WALLET_PRIVATE_KEY || ''
const signer = new ethers.Wallet(hotWalletPrivateKey, provider);


const sendToAddress = async (recipientAddress, tokenId) => {
    // Contract abi isn't providing autocomplete but can reference docs for ERC-721 NFTS
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
    const contract = new ethers.Contract(deployedContractAddress, abi, signer);
    // Check owner is hot wallet i.e. it hasnt been redeemed
    const owner = await contract.ownerOf(tokenId)
    console.log(`tokenId: ${tokenId} owner: ${owner}`);
    if (owner !== hotWalletAddress) throw new Error('TokenId has already been redeemed')

    // Transfer to recipient
    // const txn = await contract.transferFrom(signer.address, recipientAddress, tokenId);
    const txn = await contract.transferFrom(signer.address, recipientAddress, tokenId, { gasLimit: 285000, gasPrice: ethers.utils.parseUnits('500', 'gwei') });
    console.log(txn);
    console.log(txn.maxFeePerGas.toNumber());
    console.log(txn.maxPriorityFeePerGas.toNumber());

    // const est = await contract.estimateGas.transferFrom(signer.address, recipientAddress, tokenId)
    // console.log(est.toNumber());
    return recipientAddress
}

const getTokensForAddress = async (address) => {
    console.log(address, deployedContractAddress, providerUrl);
    // Contract abi isn't providing autocomplete but can reference docs for ERC-721 NFTS
    // https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
    const contract = new ethers.Contract(deployedContractAddress, abi, signer);

    // Check balance of tokens
    const balance = (await contract.balanceOf(address)).toNumber()


    const tokenIndices = [...Array(balance).keys()]

    const results = await bluebird.map(tokenIndices, async (tokenIndex) => {
        const tokenId = (await contract.tokenOfOwnerByIndex(address, tokenIndex)).toNumber()
        console.log('tokenId', tokenId);

        const tokenURI = await contract.tokenURI(tokenId);

        const ipfsHash = tokenURI.replace('https://ipfs.io/ipfs/', '');
        console.log('ipfsHash', ipfsHash);

        const jsonManifestBuffer = await getFromIPFS(ipfsHash);

        let res = null
        try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log('jsonManifest', jsonManifest);
            res = { id: tokenId, uri: tokenURI, owner: address, ...jsonManifest }
        } catch (e) {
            console.log(e);
        }
        return res
    }, { concurrency: 10 })

    return _.uniqBy(_.compact(results), 'uri'); //dedupe to avoid showing multiple of an NFT
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