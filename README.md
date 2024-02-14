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
![UML](https://www.plantuml.com/plantuml/dpng/dLLHYnCn47xVNp5mBodNWXmeKl2u8We-5VJmGP5bcfrgC9k49DjIpkjljzqcCMObn_cqx6I-R-VxCZDxvpnQF_IoQOJoPBV82Jwy-_ZsvWKyD0003xXntYBtZt0DNdkKdmPZv87DO0d32NJpyjKqSOCI5QVrbc7NMN8Ea7CzA5z5UOlARSaca2KkZ23bvn44s4UQZTPooe5Iwltvsub4xnNPESHNPqXrPAk5e35MxuWLcAUhA9Myjxh_mn98dgTkiHWVj2FbuJuwj3qHBoFJ7BpENdOe1qhgPXbyDUf2oKPFCaWGM25vR1ekqJaOc-DU_oGLEcG1pbkXlaEhiASYv0xz9Wf9AjkiZy9HzAGTAml17eqvitoDfszk8yStQ4EFkKfoZU34a7h5JPrUd-jmFuI9bblgcB6q4tfmwy8-HVk_GxESy0fwtOcj80jQoSEOoMRbaTB-2rcz6Zk0uVWeBl4Qk5REsu5xRTdPxNOPd9x3nUai89Jm8jhS5bH7ECFP36B-9HfOfl6EkEXHkZJshyE1lgY193t4QwlYcEs7i1SIlCZDPYdT26kdVXUvBCrMTakbf_cK7RF54MQhc8rAXN5T59drJvPRmfNOvqgu1g6u9NIqYbB-LL7NKVSv7-wIfQEdMTom6NTTbUeAsgZm_zH5bkXlzM9AWhYridsrMFow3N-tfhaxWOTU_WO0)

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

- [Verified Contract Link](https://sepolia.etherscan.io/address/0xaBe91fF39293F273f51eBd90fC85691E9fc57Dd5#code)

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

## Contributers
[Abinash Panda](https://gitlab.mindfire.co.in/abinash.p)

GitHub: [theabinashpanda](https://github.com/theabinashpanda)


## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements
Special thanks to the contributors and reviewers who have contributed to the development and improvement of this project.

## Contact
For any inquiries or assistance, please contact [Abinash Panda](mailto:mfsi.abinash.p@gmail.com).
