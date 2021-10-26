pragma solidity ^0.8.7;

import "./Branch.sol";
import "./CardManager.sol";

contract Card {
    string public name;
    uint256 public idNumber;
    bool public isValid;
    Branch public branch;
    uint256 public issuedOnCount;
    mapping(uint256 => uint256) public issuedOn;

    CardManager parentContract;

    constructor(CardManager _parentContract, Branch _branch, uint256 _idNumber, string memory _name) public {
        parentContract = _parentContract;
        name = _name;
        idNumber = _idNumber;
        isValid = true;
        branch = _branch;
        issuedOnCount = 1;
        issuedOn[1] = block.timestamp;
    }
}

