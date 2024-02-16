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

8. **Mint:** Creates amount tokens and assigns them to account, increasing the total supply. Emits a transfer event with from set to the zero address.

## UML Design
![UML](https://www.plantuml.com/plantuml/dpng/fLLjQniz4Fn-lsBX-NB1DZm4MegX8QQqK6XmQ5Be2-MGxzQDgAGLaiwEIPFVtdkHvCl9DIxzP5ZDZDQpixfBwvXnjHHPnfL3isObmlkt7z-S_myF6G00Rb0vk3LCsJMQV6r8pe5LbK5hWQiAxx6QWgC3nGqJDSwXRfJFNxmy6yWjj3RK7EUqLMWEKAr6LQ4vKNGswtuUsCewmqht21DmeUEWOB3acgDoqq069gbMxWpci28IgGRhsiGeuRiwMI0sySwGtAjuaNzep95ZugRMMkpo1XLuAN3515CbBjVnTbQMlVOH5XE2jYqlihevJM5an53aCSjAmPgpPGljipEBXA8JYCEAGUZ0zexh4323LQuDRZZLTlc7S2ZS7ZvwbeR_G5B5rnmDa1AxZf7tY0cKfAmpTUaerkAmOazvSb4FVGBgnI0UPFl_totFBVr41S45wmnNFw1GJEAeP7ToHQ8lnl4NW_cEZguMdukRJzVN7xxu0ycqRfM-1IzUNmJmToZy_EqHy361HY5cmOvTLUI-eg55bzMyZ-n-CSVeBNTtN5snUn_R19yEfhMhc7khfj1RDIXmnHqFFXM9L7m1ueB5SKrXVFrmrVQBxtD-8c-qxtRC_Vi-P5FD_SOU8VbKjdureGm6zLLlMr8_-eOyxH-EvFeK6oFo_EkGlE89TGAwDWWLbbmoOMCRhzfj6kpHRFRhmd-LadAte5bsYQggfVWD)

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
