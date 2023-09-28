const hre = require("hardhat")
const { sendSignedShieldedQuery, sendShieldedTransaction } = require("./utils");
const {expect} = require("chai");

describe("Basic Voting", function () {
  let votingSystem, owner, voter

  before(async () => {
    // Deploy BasicVoting
    const VotingSystem = await hre.ethers.getContractFactory("BasicVoting")
    votingSystem = await VotingSystem.deploy()
    await votingSystem.deployed()

    // We restore wallet from private key, since hardhat signer does not support
    // transaction signing without sending it
    owner = new hre.ethers.Wallet(
      process.env.PRIVATE_KEY, 
      new hre.ethers.providers.JsonRpcProvider(hre.network.config.url)
    )

    voter = new hre.ethers.Wallet(
      process.env.VOTER_PRIVATE_KEY, 
      new hre.ethers.providers.JsonRpcProvider(hre.network.config.url)
    )

  })

  // it('Example how to obtain balance with signed query', async () => {
  //   const req = await sendSignedShieldedQuery(
  //     wallet,
  //     perc20.address,
  //     perc20.interface.encodeFunctionData("balanceOf", [wallet.address]),
  //   );
  
  //   const balance = perc20.interface.decodeFunctionResult("balanceOf", req)[0]
  //   console.log('balance: ', balance)
  // })

  it('State variables should be private', async function () {
    // Attempting to access state variables directly and expecting it to fail
    await expect(() => votingSystem.owner()).to.throw("votingSystem.owner is not a function");
    await expect(() => votingSystem.registeredVoters(owner.address)).to.throw("votingSystem.registeredVoters is not a function");
    await expect(() => votingSystem.voteCount()).to.throw("votingSystem.voteCount is not a function");
  });

  it('Allow contract owner register voters', async function () {
    await sendShieldedTransaction(
      owner,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("registerVoter", [voter.address]),
    )
  });

  it('Registered voters can cast votes', async function () {
    await sendShieldedTransaction(
      owner,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("registerVoter", [voter.address]),
    )
    await sendShieldedTransaction(
      voter,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("castVote", [true]),
    )
  });

  it('Registered voters can retrieve vote count', async function () {
    await sendShieldedTransaction(
      owner,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("registerVoter", [voter.address]),
    )
    await sendShieldedTransaction(
      voter,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("castVote", [true]),
    )

    await sendShieldedTransaction(
      voter,
      votingSystem.address,
      votingSystem.interface.encodeFunctionData("getVoteCount", []),
    )
  });

})
