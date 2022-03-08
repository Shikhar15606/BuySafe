// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Brand.sol";

contract ProductFactory is Brand {
   struct Product{
       address manufacturer;
       string model;
       uint256 mfg;
       uint256 price;
       uint256 mrp;
       bool forSale;
   }

   Product[] public products;
   mapping (uint => address) public productToOwner;

   event ProductCreated(address _manufacturer, uint _productId);

    modifier onlyProductOwner(uint _productId) {
        require(productToOwner[_productId] == msg.sender, "Only Product Owner can perform this operation");
        _;
    }

    modifier isValidPrice(uint _productId, uint _price){
        require(_price <= products[_productId].mrp, "Price must be less than MRP");
        _;
    }

    modifier isAvailableForSale(uint _productId){
        require(products[_productId].forSale == true, "The product is not available for sale");
        _;
    }

   function createProduct(uint _mfg, string memory _model, uint _price, uint _mrp) public checkBrand(msg.sender){
       products.push(Product(msg.sender,_model,_mfg,_price,_mrp,true));
       uint _productId = products.length - 1;
       productToOwner[_productId] = msg.sender;
       emit ProductCreated(msg.sender, _productId);
   }
}