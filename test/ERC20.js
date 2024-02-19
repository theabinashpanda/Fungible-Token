const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for ERC20 token functionalities
describe("ERC20", function() {

    describe("constructor",function() {

        it("Sucessfully initialize the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 100000000000000000000000n)).not.to.be.reverted;
        });
    
        it("Should fail to initiate with zero supply", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 0)).to.be.revertedWith("ERC20: Value less than or equal to 0");
        });
    
        it("Should fail to initiate due to excess total supply", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 10000000000000000000000000n)).to.be.revertedWith("ERC20: Total supply exceeds maximum supply");
        });

    });

    describe("transfer Function",function() {
        
        it("Sucessfully transfer tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");100
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer tokens from owner to otherAccount
            await ERC20TokenInstance.transfer(otherAccount.address, 10);
            // Check balances after transfer
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
            // Assertions
            expect(ownerBalance).to.equal(90); 
            expect(otherAccountBalance).to.equal(10); 
        });

        it("Should fail to transfer tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to self
            await expect(ERC20TokenInstance.transfer(owner, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

        it("Should fail to transfer zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            // Expecting revert when transferring zero tokens
            await expect(ERC20TokenInstance.transfer(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

        it("Should fail to transfer tokens to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to the zero address
            await expect(ERC20TokenInstance.transfer("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

    });

    describe("approve Function",function () {
        it("Successfully approve tokens to other address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.approve(otherAccount, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,otherAccount);
            // Assertions
            expect(allowance).to.equal(50);
        });    

        it("Should fail to approve zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.approve(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });
    
        it("Should fail to approve tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when approving to self.
            await expect(ERC20TokenInstance.approve(owner, 50)).to.be.revertedWith("ERC20: cannot approve self");
        });
    
        it("Should fail to approve tokens to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to approve to the zero address
            await expect(ERC20TokenInstance.approve("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: approve to the zero address");
        });

    });

    describe("transferFrom Function",function () {

        // Test case to verify if transferFrom functionalities work
        it("Sucessfully transfer tokens to other address on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            // Perform transferFrom
            await ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,otherAccount2.address, 10);
            // Check balances after transferFrom
            const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
            const otherAccount2Balance = await ERC20TokenInstance.balanceOf(otherAccount2.address);
            // Assertions
            expect(ownerBalance).to.equal(90);
            expect(otherAccount2Balance).to.equal(10); 
        });

        it("Should fail to transfer tokens to other address on behalf of zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Attempt to transfer tokens from the zero address
            await expect(ERC20TokenInstance.transferFrom("0x0000000000000000000000000000000000000000", otherAccount.address, 10)).to.be.revertedWith("ERC20: transfer from the zero address");
        });

        it("Should fail to transfer tokens to zero address on the behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.transferFrom(otherAccount.address,"0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

        // Test case to verify failure when transferring more tokens than approved
        it("Should fail to transfer more tokens than approved", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            // Expecting revert when transferring more than approved
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount2.address, 100)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });

        it("Should fail to transfer tokens to owner on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,owner.address, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

        it("Should fail to transfer zero tokens on behalf of owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,otherAccount2.address, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

    });

    describe("mint Function",function () {

        it("Successfully mint tokens to a address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000);
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.mint(otherAccount.address,10);
            const totalSupply = await ERC20TokenInstance.totalSupply();
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
            // Assertions
            expect(totalSupply).to.equal(1010);
            expect(otherAccountBalance).to.equal(10); 
        });
    
        it("Should fail to mint tokens by non owner of contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000);
            const [owner,otherAccount,otherAccount2] = await ethers.getSigners();
            await expect(ERC20TokenInstance.connect(otherAccount).mint(otherAccount2.address,10)).to.be.revertedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to mint tokens due to excess total supply", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000000000000000000000000n);
            const [owner,otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.mint(otherAccount.address,10)).to.be.revertedWith("ERC20: Total supply exceeds maximum supply");
        });
    
        it("Should fail to mint tokens to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
            const [owner] = await ethers.getSigners();
            await expect(ERC20TokenInstance.mint("0x0000000000000000000000000000000000000000",10)).to.be.revertedWith("ERC20: Cannot mint to zero address");
        });
    
        it("Should fail to mint token to owner itself", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
            const [owner] = await ethers.getSigners();
            await expect(ERC20TokenInstance.mint(owner.address,10)).to.be.revertedWith("ERC20: Cannot mint to self");
        });
    
        it("Should fail to mint zero tokens", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
            const [owner,otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.mint(otherAccount.address,0)).to.be.revertedWith("ERC20: Amount cannot be 0");
        });

    });

    describe("getter Functions",function () {

        it("Token name should be TestToken", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TKN", 100);
            const name = await ERC20TokenInstance.name();
            // Assertions
            expect(name).to.equal("TestToken");
        });
    
        it("Token symbol should be TT", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
            const symbol = await ERC20TokenInstance.symbol();
            // Assertions
            expect(symbol).to.equal("TT"); 
        });
    
        it("Total Supply should be 100", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const totalSupply = await ERC20TokenInstance.totalSupply();
            // Assertions
            expect(totalSupply).to.equal(100);
        });
    
        // Test case to verify if transfer of tokens is possible
        it("Balance of other address should be 10", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");100
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer tokens from owner to otherAccount
            await ERC20TokenInstance.transfer(otherAccount.address, 10);
            // Check balance after transfer
            const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
            // Assertions
            expect(otherAccountBalance).to.equal(10); 
        });
    
        it("Allowance of other address should be 50", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.approve(otherAccount, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,otherAccount);
            // Assertions
            expect(allowance).to.equal(50);
        }); 
    
        it("Decimals should be 18", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
            const decimals = await ERC20TokenInstance.decimals();
            // Assertions
            expect(decimals).to.equal(18); 
        });

    })    

});

describe("Ownable",function () {

    describe("transferOwnership Function",function () {

        it("Successfully transfer ownership", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.transferOwnership(otherAccount.address)).not.to.be.reverted; 
        });
    
        it("Should fail to transfer ownership by non owner of contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.connect(otherAccount).transferOwnership(otherAccount2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Should fail to transfer ownership to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to zero address
            await expect(ERC20TokenInstance.transferOwnership("0x0000000000000000000000000000000000000000")).to.be.revertedWith("Ownable: new owner is the zero address");
        });
    
        it("Should fail to transfer ownership to current owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to the current owner
            await expect(ERC20TokenInstance.transferOwnership(owner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
        });

    });

    describe("getter Functions",function () {
        it("Caller must be the owner of the contract", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
            const [owner] = await ethers.getSigners();
            const Owner = await ERC20TokenInstance.owner();
            // Assertions
            expect(Owner).to.equal(owner.address); 
        });

    });

});