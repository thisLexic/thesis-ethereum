pragma solidity ^0.8.7;

import "./Ownable.sol";

contract Branch is Owner {
    struct PrcBranch {
        string location;
        uint256 idNumber;
    }

    mapping(uint256 => PrcBranch) public branches;

    function createBranch(string memory _location, uint256 _idNumber)
        public
        onlyOwner
    {
        branches[_idNumber] = PrcBranch(_location, _idNumber);
    }
}
