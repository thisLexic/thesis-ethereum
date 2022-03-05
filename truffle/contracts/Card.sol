pragma solidity ^0.8.7;

import "./Manager.sol";

contract Card {
    address public addr;
    uint256 public idNumber;
    string public ipfsHash;

    Manager parentContract;

    constructor(
        Manager _parentContract,
        address _address,
        uint256 _idNumber,
        string memory _ipfsHash
    ) public {
        parentContract = _parentContract;
        addr = _address;
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
