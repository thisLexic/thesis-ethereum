pragma solidity ^0.8.7;

import "./Branch.sol";

contract BranchManager {
    
    struct P_Branch {
        Branch branch;
    }
    
    mapping(uint => P_Branch) public branches;
    
    function createBranch(uint256 _idNumber, string memory _location) public {
        branches[_idNumber].branch = new Branch(this, _idNumber, _location);
    }

    
}
