const utils = require('./helpers/utils');
const ProductFactory = artifacts.require('./ProductFactory.sol');

contract('ProductFactory', accounts => {
  let ProductFactoryInstance;

  beforeEach(async () => {
    ProductFactoryInstance = await ProductFactory.new(accounts[0]);
  });

  // ============================== Unit Tests ========================================
  it('Create a Product', async () => {
    const result1 = await ProductFactoryInstance.createBrand(
        accounts[1],
        "Nike",
        { from: accounts[0] }
      );
      assert.equal(result1.logs[0].args._brandName, "Nike");
      assert.equal(result1.logs[0].args._owner, accounts[1]);

    const result2 = await ProductFactoryInstance.createProduct(
        new Date().getTime(),
        "Air Jordans",
        1,
        1000,
        { from: accounts[1] }
      );
      assert.equal(result2.logs[0].args._manufacturer, accounts[1]);
      assert.equal(result2.logs[0].args._productId, 0);
  });

  it('Do not create a product without brand', async () => {
    await utils.shouldThrow(ProductFactoryInstance.createProduct(
      new Date().getTime(),
      "Air Jordans",
      1,
      1000,
      { from: accounts[1] }
    ));
  });


});