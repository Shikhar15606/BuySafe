const utils = require('./helpers/utils');
const ProductFactory = artifacts.require('./ProductFactory.sol');

contract('ProductFactory', accounts => {
  let ProductFactoryInstance;

  beforeEach(async () => {
    ProductFactoryInstance = await ProductFactory.new(accounts[0]);
  });

  // ============================== Unit Tests ========================================
  it('Create a Product', async () => {
    await ProductFactoryInstance.createBrand('Nike', 'nike.com/logo.png', {
      from: accounts[1],
    });

    const result = await ProductFactoryInstance.createProduct(
      new Date().getTime(),
      'Air Jordans',
      1,
      1000,
      { from: accounts[1] }
    );
    assert.equal(result.logs[0].args._manufacturer, accounts[1]);
    assert.equal(result.logs[0].args._productId, 0);
  });

  it('Do not create a product without brand', async () => {
    await utils.shouldThrow(
      ProductFactoryInstance.createProduct(
        new Date().getTime(),
        'Air Jordans',
        1,
        1000,
        { from: accounts[1] }
      )
    );
  });

  it('Product price must be less than MRP', async () => {
    await ProductFactoryInstance.createBrand('Nike', 'nike.com/logo.png', {
      from: accounts[1],
    });

    await utils.shouldThrow(
      ProductFactoryInstance.createProduct(
        new Date().getTime(),
        'Air Jordans',
        2000,
        1000,
        { from: accounts[1] }
      )
    );
  });
});
