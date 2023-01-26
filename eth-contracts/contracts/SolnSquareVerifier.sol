// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {

    Verifier verifier;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
    }

    uint256 solutionIndex = 1;

    // TODO define an array of the above struct
    // Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 solutionKey, address account);

    constructor(address verifierAddress) {
        verifier = Verifier(verifierAddress);
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function _addSolution(uint[2] memory input) internal {
        bytes32 solutionKey = keccak256(abi.encodePacked(input));
        solutions[solutionKey] = Solution({
            index: solutionIndex,
            account: msg.sender
        });
        emit SolutionAdded(solutionKey, msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mintNFT(address to, uint256 tokenId, Verifier.Proof memory proof, uint[2] memory input) public {
        bytes32 solutionKey = keccak256(abi.encodePacked(input));
        require(solutions[solutionKey].index != 0, "Solution already used");
        require(verifier.verifyTx(proof, input), "Invalid solution");

        _addSolution(input);
        super.mint(to, tokenId);
    }
}
  


























