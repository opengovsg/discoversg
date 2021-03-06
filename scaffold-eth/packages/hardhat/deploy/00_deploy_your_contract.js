// deploy/00_deploy_your_contract.js

//const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("DiscoverSG", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    //args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
  });

  const YourContract = await ethers.getContract("DiscoverSG", deployer);
  // console.log('Minting item and sending to wallet');
  // Test metadata hash 
  const hotWalletAddress = "0xe1324272Fa528eeFD91944aBe03Aa1bb1727b991"

  await YourContract.mintItem(hotWalletAddress, 'Qmeq8NNdNobe16VRVfqaM9yzDvRZzLg877Mft1aouRoBwY'); //natgal
  // await YourContract.mintItem(hotWalletAddress, 'QmcGA17xNwXgXTQi6UNGPp3SmhXqTEWv6KcunsKLXodgBu'); //sentosa
  // await YourContract.mintItem(hotWalletAddress, 'QmfMQ1UWvYGwgRrHtu3qAgRutS8huZbMuYKNeiB4HjhanR'); //esplanade
  // await YourContract.mintItem(hotWalletAddress, 'Qmeq8NNdNobe16VRVfqaM9yzDvRZzLg877Mft1aouRoBwY'); //natgal
  // await YourContract.mintItem(hotWalletAddress, 'Qmeq8NNdNobe16VRVfqaM9yzDvRZzLg877Mft1aouRoBwY'); //natgal

  console.log('Transfering ownership from deployer to wallet');
  await YourContract.transferOwnership(hotWalletAddress);

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");

    To take ownership of yourContract using the ownable library uncomment next line and add the
    address you want to be the owner.
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["DiscoverSG"];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
