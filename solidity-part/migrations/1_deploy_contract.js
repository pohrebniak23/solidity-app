// const Demo_Contract = artifacts.require("Demo");

// module.exports = function(deployer) {
//   deployer.deploy(Demo_Contract);
// };

const Contract_Game = artifacts.require("ContractGame");

module.exports = function(deployer) {
  deployer.deploy(Contract_Game);
};