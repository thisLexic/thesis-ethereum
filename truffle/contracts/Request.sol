pragma solidity ^0.8.7;

import "./Manager.sol";

contract Request {
    address public userAddress;
    string public ipfsHash;

    Manager parentContract;

    constructor(
        Manager _parentContract,
        address _address,
        string memory _ipfsHash
    ) public {
        parentContract = _parentContract;
        userAddress = _address;
        ipfsHash = _ipfsHash;
    }

    function setHash(string memory _ipfsHash) public {
        ipfsHash = _ipfsHash;
    }

    function getHash() public view returns (string memory) {
        return ipfsHash;
    }
}
