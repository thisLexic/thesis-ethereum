var CardManager = artifacts.require("./CardManager.sol");

module.exports = function (deployer) {
  deployer.deploy(CardManager, "Card Manager Deployed");
};
