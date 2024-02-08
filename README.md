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

## Deliverables
1. **Contract Design:** The contract design is represented in UML format using PlantUML online editor.

2. **Contract Implementation:** The ERC20 token contract is implemented in Solidity, adhering to the provided requirements.

3. **Unit Tests:** Comprehensive unit tests are developed to ensure the functionality and integrity of the ERC20 token.

4. **Deployment:** The ERC20 token is deployed on a testnet after conducting thorough code review. Complete source code is provided for browsing in the explorer

## UML Design
![UML](https://www.plantuml.com/plantuml/dpng/dLJ1Qjmm4BtxAmPwSLWRIg2bB3Gab1PwAhIXLpEMPukeB1b9JWXf_hrQHvggChL9z-ArFE_DlF5xldOUhPz7LLLIUx8d50IVFtxzSFaQ7Yi8lqVidRSe_1Duur5zcwT9FTGNS8GvG2xVl2tBUbIe1NqvrJWCbfm35CBCsczWmaMx4rc6M19oagHzao20OoBfZL4b0ofbxizzcSBSQx8Df5itaHx8RWo1qsJD7TK5Odk2jOPFren_E2B5otIrxNAvJLiv1SfZucZ0c-pc3jLChEbY0TuiIb3LomwouYXf0_vKLKAXSx2OuDRy91sTq49GAlKFw3IEL1ovXx5FmxEoBdDCV3I69GS0x-Vz5RU6BZh7_RDs2nxmx06NR_6GIQdFetV7E7O3psDd1vtKqiiqTB7M0vpXmVkf_laqigpF1n9oHEKuBU_YWwqa7R80nU3mwrhNSd3OM5pSH6Sn95aiGdbRkovPjUMeb9LxFV_AY2knBzSWjR24ZcvOotgYy8U6xxdDIvQ1zbdSt2yvtw1Ynxs2BWdzFv699QrvDyRCaESuIt3R_hgAt_MgkWxWyoV_Dm00)

## Setting up Development Environment
To get started with the project, follow these steps:
1. Open a terminal/PowerShell and see if they are installed:
```sh
node -v
npm -v
git --version
```

2. Clone the repository:
```sh
git clone https://gitlab.mindfire.co.in/abinash.p/fungible-token.git
```

3. Install Hardhat and Initialization
```sh
npm install --save-dev hardhat
npx hardhat init
```

## Contributers
[Abinash Panda](https://gitlab.mindfire.co.in/abinash.p)


## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements
Special thanks to the contributors and reviewers who have contributed to the development and improvement of this project.

## Contact
For any inquiries or assistance, please contact [Abinash Panda](mailto:mfsi.abinash.p@gmail.com).