const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proof = require("../zokrates/code/square/proof.json");

module.exports = async function(callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contract = await SolnSquareVerifier.deployed();

        const tokenId = 0;
        const account = accounts[0];

        await contract.mintToken(tokenId, proof.proof, proof.inputs, {from: account});
        console.log("Minted token " + tokenId + " for address " + account);
    } catch (e) {
        callback(e);
        return;
    }

    callback();
};