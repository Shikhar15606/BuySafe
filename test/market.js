const utils = require('./helpers/utils');
const Market = artifacts.require('./Market.sol');

contract('Market', accounts => {
    let MarketInstance;
  
    beforeEach(async () => {
      MarketInstance = await Market.new(accounts[0]);
    });
  
    // ============================== Unit Tests ========================================
    it('Change price of product', async () => {
        await MarketInstance.createBrand(
          "Nike",
          { from: accounts[1] }
        );
  
        await MarketInstance.createProduct(
          new Date().getTime(),
          "Air Jordans",
          1,
          1000,
          { from: accounts[1] }
        );

        const result = await MarketInstance.setPrice(0, 5, { from: accounts[1] });
        assert.equal(result.logs[0].args._productId, 0);
        assert.equal(result.logs[0].args._newPrice, 5);
    });

    it('Only Owner can change price of product', async () => {
        await MarketInstance.createBrand(
          "Nike",
          { from: accounts[1] }
        );
  
        await MarketInstance.createProduct(
          new Date().getTime(),
          "Air Jordans",
          1,
          1000,
          { from: accounts[1] }
        );

        await utils.shouldThrow(MarketInstance.setPrice(0, 5, { from: accounts[2] }));
    });

    it('Price must be less than MRP', async () => {
        await MarketInstance.createBrand(
          "Nike",
          { from: accounts[1] }
        );
  
        await MarketInstance.createProduct(
          new Date().getTime(),
          "Air Jordans",
          1,
          1000,
          { from: accounts[1] }
        );

        await utils.shouldThrow(MarketInstance.setPrice(0, 2000, { from: accounts[1] }));
    });

    
  });