pragma solidity ^0.8.7;

import "./CardManager.sol";

contract Card {
    uint256 public idNumber;
    string public ipfsHash;

    CardManager parentContract;

    constructor(CardManager _parentContract, uint256 _idNumber, string memory _ipfsHash) public {
        parentContract = _parentContract;
        idNumber = _idNumber;
        ipfsHash = _ipfsHash;
    }

    function setHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
    
}

