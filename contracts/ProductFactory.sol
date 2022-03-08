// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Brand.sol";

contract ProductFactory is Brand {
   struct Product{
       address manufacturer;
       uint256 mfg;
       string model;
       uint32 price;
       uint32 mrp;
       bool forSale;
   }

   Product[] public products;
   mapping (uint => address) public productToOwner;

   event ProductCreated(address _manufacturer, uint _productId);

    modifier onlyProductOwner(uint _productId) {
        require(productToOwner[_productId] == msg.sender);
        _;
    }

    modifier isValidPrice(uint _productId, uint _price){
        require(_price <= products[_productId].mrp);
        _;
    }

    modifier isAvailableForSale(uint _productId){
        require(products[_productId].forSale == true);
        _;
    }

   function createProduct(uint256 _mfg, string memory _model, uint32 _price, uint32 _mrp) public checkBrand(msg.sender){
       products.push(Product(msg.sender,_mfg,_model,_price,_mrp,true));
       uint _productId = products.length - 1;
       productToOwner[_productId] = msg.sender;
       emit ProductCreated(msg.sender, _productId);
   }
}