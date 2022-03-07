// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Product is Ownable {

   struct Transaction{
       address from;
       address to;
       uint32 price;
   }
   
   struct ProductToken{
       address manufacturer;
       uint256 mfg;
       string modelNumber;
       uint32 price;
       uint32 mrp;
   }
   mapping (uint => address) public productToOwner;   




}