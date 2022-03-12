const Product = artifacts.require('./Market.sol');

module.exports = function (deployer) {
  deployer.deploy(Product);
};
