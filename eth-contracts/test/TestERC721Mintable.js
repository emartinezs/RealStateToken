var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('ERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const totalSupply = 5;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i=0; i<totalSupply; i++) {
                await this.contract.mint(account_one, i+1, { from: account_one });
            }
        })

        it('should return total supply', async function () { 
            let supply = await this.contract.totalSupply.call();
            assert.equal(supply, totalSupply); 
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_one);
            assert.equal(balance, totalSupply);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = 1;
            let tokenUri = await this.contract.tokenURI.call(tokenId);
            assert.equal(tokenUri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"+tokenId);
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 1;
            await this.contract.transferFrom(account_one, account_two, tokenId, { from: account_one });
            let tokenOwner = await this.contract.ownerOf.call(tokenId);
            assert.equal(tokenOwner, account_two);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let failed = false;
            try {
                await this.contract.mint(account_one, i+1, { from: account_two });
                failed = false;
            } catch(e) {
                failed = true;
            }
            assert.equal(failed, true);
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one);
        })

    });
})