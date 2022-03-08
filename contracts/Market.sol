// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ProductFactory.sol";

contract Market is ProductFactory {

    event priceUpdated(uint _productId, uint _newPrice);
    event saleStarted(uint _productId);
    event saleClosed(uint _productId);
    event buySuccess(uint _productId, address _from, address _to, uint _price);

    modifier hasEnoughMoney(uint _productId){
        require(msg.value >= products[_productId].price, "The amount is not sufficient");
        _;
    }

    function setPrice(uint _productId, uint _price) public onlyProductOwner(_productId) isValidPrice(_productId, _price){
        products[_productId].price = _price;
        emit priceUpdated(_productId, _price);    
    }

    function openForSale(uint _productId) public onlyProductOwner(_productId){
        products[_productId].forSale = true;
        emit saleStarted(_productId);
    }

    function closeForSale(uint _productId) public onlyProductOwner(_productId){
        products[_productId].forSale = false;
        emit saleClosed(_productId);
    }

    function buyProduct(uint _productId) public payable isAvailableForSale(_productId) hasEnoughMoney(_productId){
        address payable _seller = payable(productToOwner[_productId]);
        address payable _buyer = payable(msg.sender);
        _seller.transfer(products[_productId].price);
        _buyer.transfer(msg.value-products[_productId].price);
        productToOwner[_productId] = msg.sender;
        emit buySuccess(_productId, _seller, _buyer, products[_productId].price);    
    }
}

