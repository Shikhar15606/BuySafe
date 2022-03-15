// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Brand.sol';

contract Report is Brand {
    struct ReportData {
        uint256 productCount; // keeps the count of products of a particular brand a user has
        bool hasReported;
    }
    event brandReported(address _brandOwner, address _reportedBy);
    event brandReportRevoved(address _brandOwner, address _revokedBy);

    mapping(address => mapping(address => ReportData)) public userBrand; // [user][brand] => details

    modifier canReport(address _brandOwner) {
        require(
            userBrand[msg.sender][_brandOwner].productCount > 0,
            "You are reporting a brand but you dont't own any of it's products"
        );
        require(
            userBrand[msg.sender][_brandOwner].hasReported == false,
            "You can't report a brand twice"
        );
        _;
    }

    function reportBrand(address _brandOwner) public canReport(_brandOwner) {
        userBrand[msg.sender][_brandOwner].hasReported = true;
        brands[_brandOwner].reports++;
        if (brands[_brandOwner].reports > 2) deleteBrand(_brandOwner); // 2 is there ony to ease testing (will be increased in future)
        emit brandReported(_brandOwner, msg.sender);
    }

    function revokeReport(address _brandOwner, address _revokedBy) internal {
        brands[_brandOwner].reports--;
        emit brandReportRevoved(_brandOwner, _revokedBy);
    }
}
