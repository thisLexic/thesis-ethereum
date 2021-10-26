pragma solidity ^0.8.7;

import "./CardManager.sol";

contract Card {
    string public name;
    uint256 public idNumber;
    bool public isValid;
    string public branch;
    uint256 public issuedOnCount;
    mapping(uint256 => uint256) public issuedOn;
    string public ipfsHash;

    CardManager parentContract;

    constructor(CardManager _parentContract, string memory _branch, uint256 _idNumber, string memory _name, string memory _ipfsHash) public {
        parentContract = _parentContract;
        name = _name;
        idNumber = _idNumber;
        isValid = true;
        branch = _branch;
        issuedOnCount = 1;
        issuedOn[1] = block.timestamp;
        ipfsHash = _ipfsHash;
    }

    function setHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}

