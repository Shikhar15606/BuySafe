// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ProductFactory.sol';

contract Market is ProductFactory {
    event priceUpdated(uint256 _productId, uint256 _newPrice);
    event saleStarted(uint256 _productId);
    event saleClosed(uint256 _productId);
    event buySuccess(
        uint256 _productId,
        address _from,
        address _to,
        uint256 _price
    );

    modifier hasEnoughMoney(uint256 _productId) {
        require(
            msg.value >= products[_productId].price,
            'The amount is not sufficient'
        );
        _;
    }

    function setPrice(uint256 _productId, uint256 _price)
        public
        onlyProductOwner(_productId)
        isValidPrice(_productId, _price)
    {
        products[_productId].price = _price;
        emit priceUpdated(_productId, _price);
    }

    function openForSale(uint256 _productId)
        public
        onlyProductOwner(_productId)
    {
        products[_productId].forSale = true;
        emit saleStarted(_productId);
    }

    function closeForSale(uint256 _productId)
        public
        onlyProductOwner(_productId)
    {
        products[_productId].forSale = false;
        emit saleClosed(_productId);
    }

    function buyProduct(uint256 _productId)
        public
        payable
        isAvailableForSale(_productId)
        hasEnoughMoney(_productId)
    {
        address payable _seller = payable(productToOwner[_productId]);
        address payable _buyer = payable(msg.sender);
        _seller.transfer(products[_productId].price);
        _buyer.transfer(msg.value - products[_productId].price);
        productToOwner[_productId] = msg.sender;
        emit buySuccess(
            _productId,
            _seller,
            _buyer,
            products[_productId].price
        );
    }
}
