const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require("../../zokrates/code/square/proof.json");

contract('SolnSquareVerifier', accounts => {
    let account_one = accounts[0];
    let contract;

    before('setup contract', async () => {
        let verifier = await Verifier.new({ from: account_one });
        contract = await SolnSquareVerifier.new(verifier.address, { from: account_one });
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('mints a token with a correct solution', async function() {
        let tokenId = 1;
        await contract.mintToken(tokenId, proof.proof, proof.inputs, { from: account_one });

        let tokenOwner = await contract.ownerOf.call(tokenId);
        assert.equal(tokenOwner, account_one);
    });

    it('fails with a repeated solution', async function() {
        let tokenId = 2;
        let failed = false;
        try {
            await contract.mintToken(tokenId, proof.proof, proof.inputs, { from: account_one });
        } catch (e) {
            failed = true;
        }
        assert.equal(failed, true);
    });
});

