# Fungible Token Implementation

## Objective
The objective of this project is to implement a basic fungible token adhering to the ERC20 standard without utilizing external libraries like OpenZeppelin. This token will support standard functionalities such as transferring tokens, approving and transferring on behalf of another address, and querying token balances.

## Functionalities 
1. **Total Supply:** The total supply of the token should be fixed and initialized during deployment.
   
2. **Decimals:** The token should support a specified number of decimals.
   
3. **Balances:** Each address should have a balance associated with it, representing the number of tokens owned by that address.
   
4. **Transfers:** Users should be able to transfer tokens to other addresses. Transfers should only be allowed if the sender has a sufficient balance.
   
5. **Approvals:** Allowances should be implemented, allowing one address to approve another address to spend a certain amount of tokens on its behalf.
   
6. **Transfer on Behalf:** Implement the ability to transfer tokens on behalf of another address with the approval mechanism.
   
7. **Events:** Emit appropriate events such as Transfer and Approval for better transparency.

## UML Design
![UML](https://www.plantuml.com/plantuml/dpng/dLN1QXin4BtlLmpaiiOsb41BCJGab1PwChIXbrAMiJHkHRMIaBGs9es_lVQkf2foKKXFPcVdFSrxEq--THwj7thPD49vibja19y-V7v__GeU6W201zmuRv7vHvY3rnxbby4OUMXdi8BX1Bf-_UQoSOCI5QFrjaNEBJa7o9WUbA-Yl4NbjcGJo18JHf3oYmW2x2FDHcjvoO5Iwltvx4IYzuhi0kAZCwGusUeWQ8pLEseBpFDJb4e-Mjt_PGaaBrEtN8u_j2FbuJuwj3qHhoBJ0hpE7dOe1qhgPXdyRjI5iXqzoI11O8NaiMcOHETWN8vx_OjKs90bE6-5-W6TmfwAaZlqcoWagUooFGgleYVTE5aezcZCcULRVFlk9d9yXoxicAiqrmXE36bNtANJw_CSxgSmqN9Bl3MMTa8FRbtOfsZ_j3JB2Q-Wrrni1LdGIXx6pdRgc0FJodaxCAzjU_QlMmNl5Z1vbnM44bv4uxhY2n_X36zd4FkdQc2vh7DYeaVfKf3VXXTwcW-Ic52lXV-O9JuaFS6BtZpdAG6PbrC44kH95evPl4C2YWskd1f3NNRMZooox4hiIoNCGIXc2HtTHId_ceXpub_p29Oid9vdSSDcl96gL5VGHON_fowoH7-h7wOaY7TBTgiibxzlmdzGqzoUm4Cl_m00)

## Setting up Development Environment
To get started with the project, follow these steps:
### 1. Open a terminal/PowerShell and see if they are installed:
```sh
node -v
npm -v
git --version
```

### 2. Clone the repository:
```sh
git clone https://gitlab.mindfire.co.in/abinash.p/fungible-token.git
```

### 3. Install Hardhat and Initialization
```sh
npm install --save-dev hardhat
npx hardhat init
```

## Deployment

### 1. LocalHost
- Start a node in a terminal with
    ```sh
    npx hardhat node
    ```
- Then we run the script on a second terminal to --network localhost:
    ```sh
    npx hardhat run --network localhost scripts/deploy.js
    ```
### 2. Goerli

- To deploy to Goerli, we need to add the network to the hardhat.config.js.

- But in addition we need to supply our seed phrase and infura endpoint.

- Add the .infura and .secret files.

- <b> Don't forget to add .infura and .secret to your .gitignore. Update the hardhat.config.js to read the .infura and .secret files and deploy to goerli.</b>

- Then, run the following command:
    ```
    npx hardhat run --network goerli scripts/deploy.js
    ```

### 3. Sepolia

- To deploy to sepolia, we need to add the network to the hardhat.config.js.

- But in addition we need to supply our seed phrase and infura endpoint.

- Add the .infura and .secret files.

- <b> Don't forget to add .infura and .secret to your .gitignore. Update the hardhat.config.js to read the .infura and .secret files and deploy to sepolia.</b>

- Then, run the following command:
    ```
    npx hardhat run --network sepolia scripts/deploy.js
    ```

## Verifying the Smart Contract

- Add the .etherscan file to your hardhat project.
- Add the .etherscan to .gitignore.
- Run the following command:
```sh
    npx hardhat verify --network <network name> <Deployed Address> <Args1> <Args2> ...
```
- [Verified Contract Link](https://sepolia.etherscan.io/address/0x33ad683F1E67b0a98c66E305213156e16A540075)

## Unit Testing
- Run the following command:
```sh
npx hardhat test
```

## Code Coverage

- For checking whether all testcases are covered or not, run the following command:
```
npx hardhat coverage
```

## Contributers
[Abinash Panda](https://gitlab.mindfire.co.in/abinash.p)

GitHub: [theabinashpanda](https://github.com/theabinashpanda)


## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements
Special thanks to the contributors and reviewers who have contributed to the development and improvement of this project.

## Contact
For any inquiries or assistance, please contact [Abinash Panda](mailto:mfsi.abinash.p@gmail.com).