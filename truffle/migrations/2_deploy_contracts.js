var Manager = artifacts.require("./Manager.sol");

module.exports = function (deployer) {
  deployer.deploy(Manager, "0xF43d5012E79E163f621582ddBd77708C7dd81ecc");
};
