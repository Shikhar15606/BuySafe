const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;
const url = process.env.PROD_BLOCKCHAIN_URL;

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    develop: {
      port: 8545,
      network_id: '*',
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, url);
      },
      network_id: 3,
    },
  },
  solc: {
    // Turns on the Solidity optimizer. For development the optimizer's
    // quite helpful, just remember to be careful, and potentially turn it
    // off, for live deployment and/or audit time. For more information,
    // see the Truffle 4.0.0 release notes.
    //
    // https://github.com/trufflesuite/truffle/releases/tag/v4.0.0
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  compilers: {
    solc: {
      version: '0.8.12',
      parser: 'solcjs',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
