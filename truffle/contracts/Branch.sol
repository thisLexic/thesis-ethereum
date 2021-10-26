pragma solidity ^0.8.7;

import "./BranchManager.sol";

contract Branch {
    string public location;
    uint256 public idNumber;

    BranchManager parentContract;

    constructor(BranchManager _parentContract, uint256 _idNumber, string memory _location) public {
        parentContract = _parentContract;
        idNumber = _idNumber;
        location = _location;
    }
}

