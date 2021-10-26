var CardManager = artifacts.require("./CardManager.sol");
var BranchManager = artifacts.require("./BranchManager.sol");

module.exports = function (deployer) {
  deployer.deploy(CardManager);
  deployer.deploy(BranchManager);
};
