pragma solidity ^0.8.7;

import "./Card.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CardManager is AccessControl {
    bytes32 public constant PRC_EMP_ROLE = keccak256("PRC_EMP_ROLE");

    event CreateCardEvent(uint256 indexed _idNumber, string _ipfsHash);
    event EditCardEvent(uint256 indexed _idNumber, string _ipfsHash);
    event RenewCardEvent(uint256 indexed _idNumber, string _ipfsHash);

    struct P_Card {
        Card card;
    }

    mapping(uint256 => P_Card) public cards;

    constructor(address root) public {
        _setupRole(DEFAULT_ADMIN_ROLE, root);
    }

    modifier onlyPRCEmployee() {
        require(
            hasRole(PRC_EMP_ROLE, msg.sender),
            "You must be a PRC employee to access this function"
        );
        _;
    }

    function createCard(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit CreateCardEvent(_idNumber, _ipfsHash);
    }

    function editCard(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit EditCardEvent(_idNumber, _ipfsHash);
    }

    function renewCard(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_idNumber].card = new Card(this, _idNumber, _ipfsHash);
        emit RenewCardEvent(_idNumber, _ipfsHash);
    }

    function viewCard(uint256 _idNumber)
        public
        view
        returns (string memory ipfsHash)
    {
        return (cards[_idNumber].card.getHash());
    }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Restricted to admins."
        );
        _;
    }

    function addPRCEmployee(address account) public onlyAdmin {
        grantRole(PRC_EMP_ROLE, account);
    }

    function removePRCEmployee(address account) public onlyAdmin {
        revokeRole(PRC_EMP_ROLE, account);
    }
}
