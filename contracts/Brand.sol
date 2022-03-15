// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Brand {
    struct Company {
        string brandName;
        string logo;
        uint256 reports;
    }

    mapping(address => Company) public brands;
    mapping(string => bool) private exists;
    address[] brandOwners;

    event BrandCreated(address _owner, string _brandName);
    event BrandDeleted(address _owner, string _brandName);

    modifier checkBrand(address _owner) {
        bytes memory temp = bytes(brands[_owner].brandName);
        require(temp.length > 0, 'Not a Registered Brand');
        _;
    }

    modifier checkDoubleBrands() {
        bytes memory temp = bytes(brands[msg.sender].brandName);
        require(temp.length == 0, 'Owner has a brand on the same account');
        _;
    }

    modifier checkBrandName(string memory _brandName) {
        require(exists[_brandName] == false, 'Brand Name Already Exists');
        _;
    }

    function createBrand(string memory _brandName, string memory _logo)
        public
        checkDoubleBrands
        checkBrandName(_brandName)
    {
        brandOwners.push(msg.sender);
        brands[msg.sender] = Company(_brandName, _logo, 0);
        exists[_brandName] = true;
        emit BrandCreated(msg.sender, _brandName);
    }

    function deleteBrand(address _owner) internal {
        delete exists[brands[_owner].brandName];
        emit BrandDeleted(_owner, brands[_owner].brandName);
    }

    function getBrandsLength() public view returns (uint256) {
        return brandOwners.length;
    }
}
