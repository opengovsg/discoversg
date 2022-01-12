/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  // const toAddress = "0x9E604F95A8562d40f7e5216731715bac1e57E401"

  // console.log("\n\n 🎫 Minting to " + toAddress + "...\n");

  // const { deployer } = await getNamedAccounts();
  // const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  // // Test metadata hash 
  // const testHash = "QmZP1DFfaiDXg2QexETG846jwELj4CMUJsKoWajSoi2iSa"

  // await yourCollectible.mintItem(toAddress, testHash, { gasLimit: 400000 })
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
