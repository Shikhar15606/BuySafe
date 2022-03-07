// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Brand is Ownable {
    mapping (address => string) public brands;
    mapping (string => bool) private exists;

    event BrandCreated(address _owner, string _brandName);

    modifier checkDoubleBrands(address _brandOnwer) {
        bytes memory temp = bytes(brands[_brandOnwer]);
        require(temp.length == 0, "Owner has a brand on the same account");
        _;
    }

    modifier checkBrandName(string memory _brandName) {
        require(exists[_brandName] == false,"Brand Name Already Exists");
        _;
    }

    function createBrand (address _brandOnwer, string memory _brandName) public onlyOwner checkDoubleBrands(_brandOnwer) checkBrandName(_brandName) {
       brands[_brandOnwer] = _brandName;
       exists[_brandName] = true;
       emit BrandCreated(_brandOnwer, _brandName);
    }
}