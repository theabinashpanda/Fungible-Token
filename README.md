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
![UML](https://www.plantuml.com/plantuml/dpng/fLNlQzim4Ftkl-AWNrmQmoXiZC1AmzXWi9AoTh0V3AFObrLCbeGa9mrT-xTFbYN5jJAJiNo9kRltT7xtJhxKXYZJDYpBA3UergH2-F3kqzlp5_2GWVtX1hc1MqMuNgFArqeqSo1rhL1heBp6UwndOCI1u8Qm5kVGMkRpbwzE1tGBAPMmwLniEQe3K2tHFgeZIOl2_JsGbJQALEOHpi24ZWE3mefAYjpC0XX88rfkJc4EAo5Ooa5ScnWfV5T74yGctblLzYoUv3yQCy8GTjDAoNQvhGguj7156E4LBjVnT59LZdiAHHWJsmuNKMvECnW9CIHvpBAA4PjRTgMzTue8A1r175OqWYlMTrG6WociSwbmGqMhbtyn1yVjuTGpDvo0u6pd2lC-SGQLuDgejZ8YnkACOYjvmj-NFe7eoI0cilrhkvsv5R-GGtXvUnJbFw7afC5HIE-QbHzi4QTU3iOwIhd62JTmjVXItdo-llxurLSqHCgEydlGuir5GFs0qizVJnHF4LY6w0NjLUN2V4Cb5iwYUU_KqJwUm9QQEygloBqtQLgMpADJgPnxXMRGApG8K4uD3VAK2LNSzxXESKep61y_NApzcdjN7uaRRRSUO_-zZyP6Sx-V4o1lnaulwyKWK1_riYNnoHlZQNzD9CUdjT4Gpxy5wPqzXfw1R1L2RNLf2DEnZTVT4WtMfoX-N_XlK19sUvbbb_Qajc5_0000)

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

- [Verified Contract Link](https://sepolia.etherscan.io/address/0x289d4F2c43De1D17B66d29906E46A56710661C12#code)

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
