const utils = require('./helpers/utils');
const Brand = artifacts.require('./Brand.sol');

contract('Brand', accounts => {
  let BrandInstance;

  beforeEach(async () => {
    BrandInstance = await Brand.new(accounts[0]);
  });

  // ============================== Unit Tests ========================================
  it('Create a Brand', async () => {
      const result = await BrandInstance.createBrand(
        "Nike",
        { from: accounts[0] }
      );
      assert.equal(result.logs[0].args._brandName, "Nike");
      assert.equal(result.logs[0].args._owner, accounts[0]);
  });

  it('Brand name must be unique', async () => {
    await BrandInstance.createBrand(
      "Nike",
      { from: accounts[0] }
    );
    await utils.shouldThrow(BrandInstance.createBrand(
      "Nike",
      { from: accounts[1] }
    ));
  });

  it('Owner can have only 1 Brand', async () => {
    await BrandInstance.createBrand(
      "Nike",
      { from: accounts[0] }
    );
    await utils.shouldThrow(BrandInstance.createBrand(
      "Reebok",
      { from: accounts[0] }
    ));
  });
});