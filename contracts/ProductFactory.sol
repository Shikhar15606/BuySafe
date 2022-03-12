// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Brand.sol';

contract ProductFactory is Brand {
    struct Product {
        address manufacturer;
        string model;
        uint256 mfg;
        uint256 price;
        uint256 mrp;
        bool forSale;
    }

    Product[] public products;
    mapping(uint256 => address) public productToOwner;

    event ProductCreated(address _manufacturer, uint256 _productId);

    modifier onlyProductOwner(uint256 _productId) {
        require(
            productToOwner[_productId] == msg.sender,
            'Only Product Owner can perform this operation'
        );
        _;
    }

    modifier isValidPrice(uint256 _productId, uint256 _price) {
        require(
            _price <= products[_productId].mrp,
            'Price must be less than MRP'
        );
        _;
    }

    modifier isAvailableForSale(uint256 _productId) {
        require(
            products[_productId].forSale == true,
            'The product is not available for sale'
        );
        _;
    }

    function createProduct(
        uint256 _mfg,
        string memory _model,
        uint256 _price,
        uint256 _mrp
    ) public checkBrand(msg.sender) {
        products.push(Product(msg.sender, _model, _mfg, _price, _mrp, true));
        uint256 _productId = products.length - 1;
        productToOwner[_productId] = msg.sender;
        emit ProductCreated(msg.sender, _productId);
    }

    function productCount() public view returns (uint256) {
        return products.length;
    }
}
