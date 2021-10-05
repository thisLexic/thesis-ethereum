pragma solidity ^0.8.7;

import "./Branch.sol";

contract Card is Branch {
    struct PRCCard {
        string name;
        uint256 idNumber;
        bool isValid;
        string profession; 
        uint256 dateOfBirth;
        uint256 expirationDate;
        PrcBranch issuedAt;
        uint256 issuedOnCount;
        mapping(uint256 => uint256) issuedOn;
    }

    mapping(uint256 => PRCCard) public cards;

    event InvalidateCard(uint256 _idNumber, uint256 _issuedOn);

    constructor() {
        owner = msg.sender;
    }

    function createCard(
        string memory _name,
        uint256 _idNumber,
        uint256 _idNumberBranch
        string profession; 
        uint256 dateOfBirth;
        uint256 expirationDate;
    ) public onlyOwner {
        PrcBranch memory branch = branches[_idNumberBranch];

        cards[_idNumber].name = _name;
        cards[_idNumber].idNumber = _idNumber;
        cards[_idNumber].profession = _profession;
        cards[_idNumber].dateOfBirth = _dateOfBirth;
        cards[_idNumber].expirationDate = _expirationDate;
        cards[_idNumber].isValid = true;
        cards[_idNumber].issuedAt = branch;
        cards[_idNumber].issuedOnCount = 1;
        cards[_idNumber].issuedOn[1] = block.timestamp;
    }

    function revalidateCard(uint256 _idNumber) public onlyOwner {
        cards[_idNumber].isValid = true;
        cards[_idNumber].issuedOnCount++;
        cards[_idNumber].issuedOn[cards[_idNumber].issuedOnCount] = block
            .timestamp;
    }

    function invalidateCard(uint256 _idNumber) public onlyOwner {
        cards[_idNumber].isValid = false;
        emit InvalidateCard(_idNumber, getCardIssuedOn(_idNumber));
    }

    function getCardIssuedOn(uint256 _idNumber) public view returns (uint256) {
        return cards[_idNumber].issuedOn[cards[_idNumber].issuedOnCount];
    }
}
