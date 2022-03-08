const utils = require('./helpers/utils');
const Market = artifacts.require('./Market.sol');
const web3 = require('web3');

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

    it('Start Sale', async () => {
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

      const result = await MarketInstance.openForSale(0, { from: accounts[1] });
      assert.equal(result.logs[0].args._productId, 0);
  });

  it('End Sale', async () => {
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

    const result = await MarketInstance.closeForSale(0, { from: accounts[1] });
    assert.equal(result.logs[0].args._productId, 0);
});
  it('Buy Product', async () => {
    await MarketInstance.createBrand(
      "Nike",
      { from: accounts[1] }
    );

    await MarketInstance.createProduct(
      new Date().getTime(),
      "Air Jordans",
      10,
      100,
      { from: accounts[1] }
    );

    const result = await MarketInstance.buyProduct(0, { from: accounts[2], value: 10});
    assert.equal(result.logs[0].args._productId, 0);
    assert.equal(result.logs[0].args._from, accounts[1]);
    assert.equal(result.logs[0].args._to, accounts[2]);
    assert.equal(result.logs[0].args._price, 10);
  });

  it('Can not buy product from less balance', async () => {
    await MarketInstance.createBrand(
      "Nike",
      { from: accounts[1] }
    );

    await MarketInstance.createProduct(
      new Date().getTime(),
      "Air Jordans",
      10,
      100,
      { from: accounts[1] }
    );

    await utils.shouldThrow(MarketInstance.buyProduct(0, { from: accounts[2], value: 9}));
  });

  it('Can only buy product if its available for sale', async () => {
    await MarketInstance.createBrand(
      "Nike",
      { from: accounts[1] }
    );

    await MarketInstance.createProduct(
      new Date().getTime(),
      "Air Jordans",
      10,
      100,
      { from: accounts[1] }
    );

    await MarketInstance.closeForSale(0, { from: accounts[1] });

    await utils.shouldThrow(MarketInstance.buyProduct(0, { from: accounts[2], value: 10}));
  });
    
  });