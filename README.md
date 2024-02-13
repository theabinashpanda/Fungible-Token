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
![UML](https://www.plantuml.com/plantuml/dpng/dLNHRjCm57tFLrowbqnj93G9X2OnhIiPgYZjj6MJ44AHczo2XMD7jjDf6kiFy0xF_1fVWfl5ZfTEWT6NrlUUU-npVAzxh3IHkYfOy2p75UK85n_UdoncwIn-6y_VkEWqFfySF4-dyoG-FnrFOXZy_lbz04Gr6GUynoMBT_7SO7xygZ5rC15VaJlSsUN9R3f9Jo_dasIwCDZXmENgNURZcPVTjDcpy-dLE8czv5wRZA_YUUAbecWG19Hhb2kIMHbm6u3vt9Abqf9a-Ww6e8KcxA8gItOJxiCXLAReuCNBNU2ICC8pNAn2akSIbGAIPQBYkhVA_E1gXT8LISneIP7haIq2KbYQfH1ibuCm9gwtUpiISSrHZi0kLOayHzbx45AMKgmnxDJy-ociabCfYfQb8NcQkYYgluQ0QmE5n7gqCjI7bci4MdYBDM4LEdtx3mZ6jJR2mjgNjiYAxA6v2uAC4UMtQjCb4HZjb7-6b9C2Eo5rKooj6ASqzNgfIHN6zct1HslGwoCB_mHfqrAg1zn7O1XSQwZ7Z5rixL1VQ6aTbfY7fSGr5PLQTBpYUFqmjEzJxa4XShgYA45mTbCZGtiBcU36c2hJGePRizB3ngWHt1lb1LBAgQRMfiw5Rc1RRkRGuk-Z3SjkFCUC5eGfDxclcaJVL6-yKMv6s6dkOFq1TgtTUjRqTYl2R_ADDxVzVRcphJUk7MJ_djqfLTtQfseO0kMPHA9mRBKyTg8yn_pA7wmkIuv_Pr7LidvhUgds8BKA_q-TPR7-zjzCby4-6TvZ4KNVZkn_ON1iYgk2_G40)

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