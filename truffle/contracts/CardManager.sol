pragma solidity ^0.8.7;

import "./Card.sol";
import "./Branch.sol";

contract CardManager {
    
    struct P_Card {
        Card card;
    }
    
    mapping(uint => P_Card) public cards;
    
    function createCard(Branch _branch, string memory _name, uint256 _idNumber) public {
        cards[_idNumber].card = new Card(this, _branch, _idNumber, _name);
    }
}
