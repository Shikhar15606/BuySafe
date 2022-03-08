// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Brand {
    mapping (address => string) public brands;
    mapping (string => bool) private exists;

    event BrandCreated(address _owner, string _brandName);

    modifier checkBrand(address _owner){
        bytes memory temp = bytes(brands[_owner]);
        require(temp.length > 0, "Not a Registered Brand");
        _;
    }

    modifier checkDoubleBrands {
        bytes memory temp = bytes(brands[msg.sender]);
        require(temp.length == 0, "Owner has a brand on the same account");
        _;
    }

    modifier checkBrandName(string memory _brandName) {
        require(exists[_brandName] == false,"Brand Name Already Exists");
        _;
    }

    function createBrand (string memory _brandName) public checkDoubleBrands checkBrandName(_brandName) {
       brands[msg.sender] = _brandName;
       exists[_brandName] = true;
       emit BrandCreated(msg.sender, _brandName);
    }
}