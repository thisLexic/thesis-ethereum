var Manager = artifacts.require("./Manager.sol");

module.exports = function (deployer) {
  deployer.deploy(Manager, "0x48fb2006833149ACfb79E0A026eBB875E38B41dd");
};
