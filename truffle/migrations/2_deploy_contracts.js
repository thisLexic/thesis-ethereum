var Card = artifacts.require("./Card.sol");

module.exports = function (deployer) {
  deployer.deploy(Card);
};
