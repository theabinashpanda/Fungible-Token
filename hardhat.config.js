require("@nomicfoundation/hardhat-toolbox");
require('solidity-coverage');

const fs = require("fs");
let mnemonic = fs.readFileSync(".secret").toString().trim();
let infuraProjectID = fs.readFileSync(".infura").toString().trim();

/** 
 * @type import('hardhat/config').HardhatUserConfig 
 **/

module.exports = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/" + infuraProjectID,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + infuraProjectID,
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
  },
  etherscan:{
    apiKey: fs.readFileSync(".etherscan").toString().trim(),
  },
  sourcify: {
    enabled: false
  },  
  solidity: "0.8.20",
};