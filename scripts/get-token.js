const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = async function(callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contract = await SolnSquareVerifier.deployed();

        const tokenId = process.argv[4];
        const account = accounts[0];

        let tokenURI = await contract.tokenURI.call(tokenId);
        console.log(tokenURI);
    } catch (e) {
        callback(e);
        return;
    }

    callback();
};