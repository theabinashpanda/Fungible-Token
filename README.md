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
![UML](https://www.plantuml.com/plantuml/dpng/dLLDYnD14BtFhoZOIuTDG1OK2RXi40LF0LqyA3BKz5IqiJ-6_aW8w-QtcqowsxOZiwodOQhhlQdtkghcpdcqFYZPD49xiXla11_UVNnxym8U6W201-oSjyZz8ro3Dnxbfp0CSizci8Hm1DsyV7MPsA54pMczOTZtbfm3vDm4xITHtg9s6x8PP8cBGP3symG2L8ccCqPUSg2KPdVwTYOnEqrs3kdL3QHxifE5u31OioLMOPwkebRotXhrXoMIF4_TOZ4-Q4lQmtroQ7CaNYQcENXJl6nH1ihgPWLyDUf2oKPF2aWKE47os3HSedCmDiUz-KawTiW2dBT2VuTMew8gvFQgIqAoIg5KyDX9WhReg9YKt6d76cDGuJ2S-BwcqpUtYUqRjB7Rt4Jo5C6H8NUDk_HyVQh3_H13CjzIpmPBMs62MrT6Qjhz7PgLX5UWJ2ysWYmOBVTZ9flLHzhuBsJDQkm5XkEZkivhu4OxRmFtnhAJx-qoUZw7i-T5G6ZXHRAvhQWES8Ap6QJySpIoNCPxuaAXT7a1l8u7vgm6ilGOdreQXs9Jn0sHuLLkCLNvHjYbtLKgoqDMN59jQJbkXsA3L4DM3qbLOB4tgipfJzRhmjNOvqgu1g6v9NIqIbB-LL7VK_-vdFAQfQUdMLpengKtINK5RLBuV-eII_9t-c8gWhI-YiMrMFowZR-vfhaxWeEIlm40)

## Setting up Development Environment
To get started with the project, follow these steps:
### 1. Open a terminal/PowerShell and see if they are installed:
```
node -v
npm -v
git --version
```

### 2. Clone the repository:
```
git clone https://gitlab.mindfire.co.in/abinash.p/fungible-token.git
```

### 3. Install Hardhat and Initialization
```
npm install --save-dev hardhat
npx hardhat init
```

## Deployment

- Create a .env file and add the necessary keys and IDs according to sample.env file.

- Don't forget to add .env to your .gitignore.

Then, run the following command:

```
npx hardhat run --network <network name> scripts/deploy.js
```

#### Note: 
- To run in localhost, you have to run the following commmand, in a separate terminal: 
```
npx hardhat node
```

## Verifying the Smart Contract

- To verify the contract, run the following command:

    ```
    npx hardhat verify --network <network name> <Deployed Address> <Args1> <Args2> ...
    ```

- [Verified Contract Link](https://sepolia.etherscan.io/address/0xc40705fe1A33f604B755f0a6e26FF9a577708a90#code)

#### Note:
- Pass the exact value of arguements in the above command as that in deploy.js.

## Unit Testing
- Run the following command:
```
npx hardhat test
```

## Code Coverage

- To generate a code coverage report, run the following command:
```
npx hardhat coverage
```
## Slither Analysis
- Install slither by running the following command:
```
pip3 install slither-analyzer
```
- Slither require Python 3.8+.
- To run slither, run the following command:
```
slither .
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
