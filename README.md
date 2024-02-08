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
![UML](https://www.plantuml.com/plantuml/dpng/dLHDQzmm4BtxLmpquh0sb41BMMX8A2tqL6X3BwMOiJnRHFLX93aXfDdVNjcHLDK6BPkzh3sQzpHlzhszjWwDcwIeAguScGCoWiyVltwuV0sF5VZF8_RM6MJk2NRWj4FnRHf7yL1Vm1uc3xfyytRRsAD0nUZBeSPXC6Gj86DwKgw8yW_A7iWaa276HqxADH44A2DDhxNOSg0G-dw-Ev7eUqMcWVXgHr83cU8WE8v6tr6zmfoSOgFaaz7o7qiWEKzTsovVjt4t1q-vZnmDE9sztA6OAEcwM80tYnOKzRA7h3c8Ai2Vgee9j1OMGzpgtwI2ArhmMhdw1Pr2IQkIVP1z73ufwpBlX2Ffrpm3ViI5lB-AxJ-X2nQoXUOIWMT8Lh3v8dUPcdgUljk7oHjudZmhT5nnn-FSgyqUOORx8CJ-K7rcsTO7OboYi2awxy91ALR7B4iXG-aNM_Nc2KhUIirDC5U2_EUoOnQSeb6srsPvMNMMxrp7nAwnvshO0LVC45gwILgs4_a76hvdJj-m37IQnKxz4lOYrIleeiANgOiiSR-d8nmPyWndwMtRFrVX_xsghZruak8l)

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