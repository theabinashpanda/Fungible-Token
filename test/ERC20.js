const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for ERC20 token functionalities
describe("ERC20", function() {

    // Test case to verify if transfer of tokens is possible
    it("is possible to transfer", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
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

    // Test case to verify failure when transferring tokens from the wrong address
    it("fails to transfer tokens from the wrong address", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount, notTheNFTOwner] = await ethers.getSigners();
        await ERC20TokenInstance.transfer(otherAccount.address, 10);
        // Expecting revert when transferring from unauthorized address
        await expect(ERC20TokenInstance.connect(notTheNFTOwner).transferFrom(owner.address, notTheNFTOwner.address, 10)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    });

    // Test case to verify if approve and transferFrom functionalities work
    it("is possible to approve and transferFrom", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Approve transfer from owner to otherAccount
        await ERC20TokenInstance.approve(otherAccount.address, 50);
        // Perform transferFrom
        await ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 50);
        // Check balances after transferFrom
        const ownerBalance = await ERC20TokenInstance.balanceOf(owner.address);
        const otherAccountBalance = await ERC20TokenInstance.balanceOf(otherAccount.address);
        // Assertions
        expect(ownerBalance).to.equal(50); 
        expect(otherAccountBalance).to.equal(50); 
    });

    // Test case to verify failure when transferring more tokens than approved
    it("fails to transfer more tokens than approved", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Approve transfer from owner to otherAccount
        await ERC20TokenInstance.approve(otherAccount.address, 50);
        // Expecting revert when transferring more than approved
        await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 100)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    });

    // Test case to verify if increasing allowance is possible
    it("is possible to increase allowance", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Increase allowance from owner to otherAccount
        await ERC20TokenInstance.increaseAllowance(otherAccount.address, 50);
        // Check allowance after increase
        const allowance = await ERC20TokenInstance.allowance(owner.address, otherAccount.address);
        // Assertion
        expect(allowance).to.equal(50); 
    });

    // Test case to verify failure when decreasing allowance below zero
    it("fails to decrease allowance below zero", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Approve transfer from owner to otherAccount
        await ERC20TokenInstance.approve(otherAccount.address, 100);
        // Expecting revert when decreasing allowance below zero
        await expect(ERC20TokenInstance.decreaseAllowance(otherAccount.address, 150)).to.be.revertedWith("ERC20: decreased allowance below zero");
    });

    it("fails to initiate with zero supply", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        await expect(ERC20Token.deploy("Token", "TKN", 0)).to.be.revertedWith("ERC20: Value less than or equal to 0");
    });

    it("fails to approve or transfer to self", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner] = await ethers.getSigners();
        // Expecting revert when approving to self.
        await expect(ERC20TokenInstance.approve(owner, 50)).to.be.revertedWith("ERC20: cannot approve self");
        // Expecting revert when transferring to self
        await expect(ERC20TokenInstance.transfer(owner, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
    });
    
});
