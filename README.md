# BDAF lab3 - Simple ERC20 Safe

## Setting
  [Dependencise](https://github.com/C1em3nt/0813378-bdaf-lab3/blob/main/package.json)
  
  Every libraries are in [node_modules](https://github.com/C1em3nt/0813378-bdaf-lab3/tree/main/node_modules).
  
  Default network is goerli.
## Test
### Test on network:
```
npx hardhat run scripts/deploy.js --network <your network>
```
### Test on localhost:
  
  ```
  npx hardhat node
  ```
  
  - Open another terminal:
  ```
  npx hardhat test test/test.js --network localhost
  ```

  ![image](https://user-images.githubusercontent.com/87816657/226351241-dad3e61f-4aa5-451e-b454-38ae59bc76a4.png)

## Deploy
```
npx hardhat run scripts/deploy.js --network goerli
```
[My contract](https://goerli.etherscan.io/address/0x8d063dbEB60cE973443E096A932575a980EA8520)
## Verify
```
npx hardhat verify --network goerli <DEPLOYED_CONTRACT_ADDRESS>
```
