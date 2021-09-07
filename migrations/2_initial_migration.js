const NftDay = artifacts.require("Nftday");

module.exports = function(deployer) {
  deployer.deploy(NftDay);
};