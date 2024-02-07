# Fungible Token Implementation

## Objective
The objective of this project is to implement a basic fungible token adhering to the ERC20 standard without utilizing external libraries like OpenZeppelin. This token will support standard functionalities such as transferring tokens, approving and transferring on behalf of another address, and querying token balances.

## Requirements
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

4. **Deployment:** The ERC20 token is deployed on a testnet after conducting thorough code review. Complete source code is provided for browsing in the explorer.

5. **Slither Static Analysis Report:** (Optional) A Slither static analysis report is generated to ensure code quality and security of the token implementation.

6. **Conceptual Learning:** (Optional) Conceptual learning of ERC223 and ERC777 standards for additional insights into token standards.

## Guidelines
1. Utilize Hardhat tool for development.
2. Follow the NatSpec coding convention for documenting the codebase.
3. Maintain all deliverables in a Mindfire Gitlab repository.
4. Ensure to get the contract design reviewed before implementation for accuracy and efficiency.

## Getting Started
To get started with the project, clone the repository and follow the setup instructions provided in the README.md file.

## Contributers
[Abinash Panda](https://gitlab.mindfire.co.in/abinash.p)


## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements
Special thanks to the contributors and reviewers who have contributed to the development and improvement of this project.

## Contact
For any inquiries or assistance, please contact [Abinash Panda](mailto:mfsi.abinash.p@gmail.com).
