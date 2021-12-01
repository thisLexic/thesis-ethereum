pragma solidity ^0.8.7;

import "./Card.sol";

contract CardManager {
    
    event CreateCardEvent(uint indexed _idNumber, string _ipfsHash);
    event EditCardEvent(uint indexed _idNumber, string _ipfsHash);
    event RenewCardEvent(uint indexed _idNumber, string _ipfsHash);
    struct P_Card {
        Card card;
    }
    
    mapping(uint => P_Card) public cards;
    
    function createCard(uint256 _idNumber,  string memory _name, string memory _ipfsHash) public {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit CreateCardEvent(_idNumber, _ipfsHash);
    }

    function editCard(uint256 _idNumber,  string memory _name, string memory _ipfsHash) public {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit EditCardEvent(_idNumber, _ipfsHash);
    }

    function renewCard(uint256 _idNumber,  string memory _name, string memory _ipfsHash) public {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit RenewCardEvent(_idNumber, _ipfsHash);
    }

    function viewCard(uint256 _idNumber) public view returns(string memory ipfsHash){
        return (cards[_idNumber].card.getHash());
    }
    
}
