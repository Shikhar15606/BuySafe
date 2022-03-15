const utils = require('./helpers/utils');
const Market = artifacts.require('./Market.sol');

contract('Report', accounts => {
  let ReportInstance;

  beforeEach(async () => {
    ReportInstance = await Market.new(accounts[0]);
  });

  // ============================== Unit Tests ========================================
  it('A legit buyer can report the brand', async () => {
    await ReportInstance.createBrand('Nike', 'nike.com/logo.png', {
      from: accounts[0],
    });
    await ReportInstance.createProduct(
      new Date().getTime(),
      'Air Jordans',
      1,
      1000,
      { from: accounts[0] }
    );
    const result = await ReportInstance.reportBrand(accounts[0], {
      from: accounts[0],
    });
    assert.equal(result.logs[0].args._brandOwner, accounts[0]);
    assert.equal(result.logs[0].args._reportedBy, accounts[0]);
  });

  it('A legit buyer can not report the brand twice', async () => {
    await ReportInstance.createBrand('Nike', 'nike.com/logo.png', {
      from: accounts[0],
    });
    await ReportInstance.createProduct(
      new Date().getTime(),
      'Air Jordans',
      1,
      1000,
      { from: accounts[0] }
    );
    await ReportInstance.reportBrand(accounts[0], {
      from: accounts[0],
    });
    await utils.shouldThrow(
      ReportInstance.reportBrand(accounts[0], {
        from: accounts[0],
      })
    );
  });

  it('A non buyer can not report the brand', async () => {
    await ReportInstance.createBrand('Nike', 'nike.com/logo.png', {
      from: accounts[0],
    });
    await utils.shouldThrow(
      ReportInstance.reportBrand(accounts[0], { from: accounts[1] })
    );
  });
});
