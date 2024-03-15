// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@poolzfinance/poolz-helper-v2/contracts/Nameable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TemplateContract
/// @notice This is a template contract
/// @author The Poolz
contract TemplateContract is Nameable, Ownable {
    uint256 public counter;
    uint256 private number;

    event NumberStored(uint256 number);
    event OnlyOwner(address owner);

    constructor() Nameable("TemplateContract", "1.0.0") Ownable(_msgSender()) {}

    function increment() external returns (uint256) {
        return counter++;
    }

    function decrement() external returns (uint256) {
        return counter--;
    }

    function store(uint256 num) external {
        number = num;
        emit NumberStored(num);
    }

    function retrieve() external view returns (uint256) {
        return number;
    }

    function ownerEvent() external onlyOwner {
        emit OnlyOwner(_msgSender());
    }
}
