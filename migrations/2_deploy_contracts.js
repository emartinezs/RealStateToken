// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
  // await deployer.deploy(Verifier);
  // await deployer.deploy(SolnSquareVerifier, Verifier.address);
  await deployer.deploy(SolnSquareVerifier, "0x7667B93aF6eEf89750CEDB8bd6DCe28953E98586");
};
