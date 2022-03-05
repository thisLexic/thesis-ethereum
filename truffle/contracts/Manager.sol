pragma solidity ^0.8.7;

import "./Card.sol";
import "./Request.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Manager is AccessControl {
    bytes32 public constant PRC_EMP_ROLE = keccak256("PRC_EMP_ROLE");
    bytes32 public constant PRC_PROF_ROLE = keccak256("PRC_PROF_ROLE");

    event CreateCardEvent(address indexed _address, uint256 _idNumber, string _ipfsHash, uint256 _time);
    event EditCardEvent(address indexed _address, uint256 _idNumber, string _ipfsHash, uint256 _time);
    event RenewCardEvent(address indexed _address, uint256 _idNumber, string _ipfsHash, uint256 _time);

    event RequestCardEvent(address indexed _address, string _ipfsHash, uint256 _time);
    event RequestCPDUnitsEvent(address indexed _address, string _ipfsHash, uint256 _time);
    event RequestRenewalEvent(address indexed _address, string _ipfsHash, uint256 _time);

    struct P_Card {
        Card card;
    }

    struct P_Request {
        Request request;
    }

    mapping(address => P_Card) public cards;
    mapping(address => P_Request) public requests;

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

    function createCard(address _address, uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_address].card = new Card(this, _address, _idNumber, _ipfsHash);
        emit CreateCardEvent(_address, _idNumber, _ipfsHash, block.timestamp);
    }

    function editCard(address _address, uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_address].card = new Card(this, _address, _idNumber, _ipfsHash);
        emit EditCardEvent(_address, _idNumber, _ipfsHash, block.timestamp);
    }

    function renewCard(address _address, uint256 _idNumber, string memory _ipfsHash)
        public
        onlyPRCEmployee
    {
        cards[_address].card = new Card(this, _address, _idNumber, _ipfsHash);
        emit RenewCardEvent(_address, _idNumber, _ipfsHash, block.timestamp);
    }

    function viewCard(address _address)
        public
        view
        returns (string memory ipfsHash)
    {
        return (cards[_address].card.getHash());
    }

    // Professional

    modifier onlyPRCProfessional() {
        require(
            hasRole(PRC_PROF_ROLE, msg.sender),
            "You must be a PRC professional to access this function"
        );
        _;
    }

    function requestCard(address _address, string memory _ipfsHash)
        public
    {
        requests[_address].request = new Request(this, _address, _ipfsHash);
        emit RequestCardEvent(msg.sender, _ipfsHash, block.timestamp);
    }

    function requestCPDUnits(address _address, string memory _ipfsHash)
        public
        onlyPRCProfessional
    {
        requests[_address].request = new Request(this, _address, _ipfsHash);
        emit RequestCPDUnitsEvent(_address, _ipfsHash, block.timestamp);
    }

    function requestRenewal(address _address, string memory _ipfsHash)
        public
        onlyPRCProfessional
    {
        requests[_address].request = new Request(this, _address, _ipfsHash);
        emit RequestRenewalEvent(_address, _ipfsHash, block.timestamp);
    }

    function viewRequest(address _address)
        public
        view
        returns (string memory ipfsHash)
    {
        return (requests[_address].request.getHash());
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
