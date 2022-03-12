var Manager = artifacts.require("./Manager.sol");

module.exports = function (deployer) {
  deployer.deploy(Manager, "0xA13F32E14525fd2B16e1073C8A22Bf8C54A81DDE");
};
