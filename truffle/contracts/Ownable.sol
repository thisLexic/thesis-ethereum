pragma solidity ^0.8.7;

contract Owner {
    address owner;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You must be an owner to perform this function."
        );
        _;
    }
}
