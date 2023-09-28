# Example of PERC20 (Private ERC20)

This project demonstrates a basic voting contract with the following features

- All state variables are private
- Allows only owner to register new voters
- Allows only registered voters to cast their votes
- Allows only registered voters to retrieve the current vote count

### Deployed contract address

0xA669BEab0C5745681b089C714582004b8528EA41

### Build

To compile contracts, use following command:

```sh
npm run compile
```

### Testing & Deployment

<b>NOTE</b>: tests are not compatible with hardhat network / ganache, so you have to start Swisstronik local node or use public testnet

Create `.env` file from example

```sh
cp example.env .env
```

Add `PRIVATE_KEY` and `VOTER_PRIVATE_KEY` in `.env` with actual private key to interact with network. If you're using other network than local testnet you also should replace `url` in `hardhat.config.ts`

To run tests, use following command:

```sh
npm run test
```

To deploy contracts, use check `scripts/deploy.ts` script and use following command:

```sh
npm run deploy
```
