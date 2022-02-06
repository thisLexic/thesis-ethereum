pragma solidity ^0.8.7;

import "./Card.sol";
import "./Request.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Manager is AccessControl {
    bytes32 public constant PRC_EMP_ROLE = keccak256("PRC_EMP_ROLE");
    bytes32 public constant PRC_PROF_ROLE = keccak256("PRC_PROF_ROLE");

    event CreateCardEvent(uint256 indexed _idNumber, string _ipfsHash);
    event EditCardEvent(uint256 indexed _idNumber, string _ipfsHash);
    event RenewCardEvent(uint256 indexed _idNumber, string _ipfsHash);

    event RequestCardEvent(address indexed _address, string _ipfsHash);
    event RequestCPDUnitsEvent(uint256 indexed _idNumber, string _ipfsHash);
    event RequestRenewalEvent(uint256 indexed _idNumber, string _ipfsHash);

    struct P_Card {
        Card card;
    }

    struct P_Request {
        Request request;
    }

    mapping(uint256 => P_Card) public cards;
    mapping(uint256 => P_Request) public requests;

    constructor(address root) public {
        _setupRole(DEFAULT_ADMIN_ROLE, root);
    }

    // Employee

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

    // Professional

    modifier onlyPRCProfessional() {
        require(
            hasRole(PRC_PROF_ROLE, msg.sender),
            "You must be a PRC professional to access this function"
        );
        _;
    }

    function requestCard(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCProfessional
    {
        requests[_idNumber].request = new Request(this, _idNumber, _ipfsHash);
        emit RequestCardEvent(msg.sender, _ipfsHash);
    }

    function requestCPDUnits(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCProfessional
    {
        requests[_idNumber].request = new Request(this, _idNumber, _ipfsHash);
        emit RequestCPDUnitsEvent(_idNumber, _ipfsHash);
    }

    function requestRenewal(uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCProfessional
    {
        requests[_idNumber].request = new Request(this, _idNumber, _ipfsHash);
        emit RequestRenewalEvent(_idNumber, _ipfsHash);
    }

    function viewRequest(uint256 _idNumber)
        public
        view
        returns (string memory ipfsHash)
    {
        return (requests[_idNumber].request.getHash());
    }

    // Roles

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

    function addPRCProfessional(address account) public onlyPRCEmployee {
        grantRole(PRC_PROF_ROLE, account);
    }

    function removePRCProfessional(address account) public onlyPRCEmployee {
        revokeRole(PRC_PROF_ROLE, account);
    }
}
