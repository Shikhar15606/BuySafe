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
        accounts[1],
        "Nike",
        { from: accounts[0] }
      );
      assert.equal(result.logs[0].args._brandName, "Nike");
      assert.equal(result.logs[0].args._owner, accounts[1]);
  });

  it('Only admin can create a Brand', async () => {
    await utils.shouldThrow(BrandInstance.createBrand(
      accounts[1],
      "Nike",
      { from: accounts[2] }
    ));
  });

  it('Brand name must be unique', async () => {
    const result = await BrandInstance.createBrand(
      accounts[1],
      "Nike",
      { from: accounts[0] }
    );
    await utils.shouldThrow(BrandInstance.createBrand(
      accounts[2],
      "Nike",
      { from: accounts[0] }
    ));
  });

  it('Owner can have only 1 Brand', async () => {
    const result = await BrandInstance.createBrand(
      accounts[1],
      "Nike",
      { from: accounts[0] }
    );
    await utils.shouldThrow(BrandInstance.createBrand(
      accounts[1],
      "Reebok",
      { from: accounts[0] }
    ));
  });
});