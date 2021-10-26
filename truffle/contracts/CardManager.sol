pragma solidity ^0.8.7;

import "./Card.sol";

contract CardManager {
    
    event cardCreated(uint _idNumber, string _ipfsHash);

    struct P_Card {
        Card card;
    }
    
    mapping(uint => P_Card) public cards;
    
    function createCard(string memory _branch, string memory _name, uint256 _idNumber, string memory _ipfsHash) public {
        cards[_idNumber].card = new Card(this, _branch, _idNumber, _name, _ipfsHash);
        emit cardCreated(_idNumber, _ipfsHash);
    }

    function viewCard(uint256 _idNumber) public view returns(string memory ipfsHash){
        return (cards[_idNumber].card.getHash());
    }
    
}
