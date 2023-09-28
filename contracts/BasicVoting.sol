// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title A basic voting smart contract
contract BasicVoting {
    address private owner;
    mapping(address => bool) private registeredVoters;
    mapping(address => bool) private hasVoted;
    VoteCount private voteCount;

    struct VoteCount {
        uint votesFor;
        uint votesAgainst;
    }

    /// @dev Modifier to ensure that a function can only be called by the contract owner
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    /// @dev Modifier to ensure that only registered voters and the contract owner can interact with certain functions
    modifier onlyRegisteredVoter() {
        require(
            registeredVoters[msg.sender] || msg.sender == owner,
            "Only registered voters can interact"
        );
        _;
    }

    /// @dev Contract constructor, initializes the contract owner to the deployer
    constructor() {
        owner = msg.sender;
    }

    /// @dev Allows the contract owner to register a voter
    /// @param _voter The address of the voter to be registered
    function registerVoter(address _voter) external onlyOwner {
        registeredVoters[_voter] = true;
    }

    /// @dev Allows registered voters to cast their vote
    /// @param choice The choice made by the voter (true for "for", false for "against")
    function castVote(bool choice) external onlyRegisteredVoter {
        require(!hasVoted[msg.sender], "Address already voted!");
        if (choice) {
            voteCount.votesFor++;
        } else {
            voteCount.votesAgainst++;
        }
    }

    /// @dev Allows registered voters to retrieve the current vote count
    /// @return votesFor The number of votes in favor
    /// @return votesAgainst The number of votes against
    function getVoteCount()
        external
        view
        onlyRegisteredVoter
        returns (uint, uint)
    {
        return (voteCount.votesFor, voteCount.votesAgainst);
    }
}
