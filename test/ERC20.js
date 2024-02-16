const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for ERC20 token functionalities
describe("ERC20", function() {

    it("Token name should be TestToken", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TKN", 100);
        const name = await ERC20TokenInstance.name();
        // Assertions
        expect(name).to.equal("TestToken");
    });

    it("Token symbol should be TT", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
        const symbol = await ERC20TokenInstance.symbol();
        // Assertions
        expect(symbol).to.equal("TT"); 
    });

    it("Total Supply should be 100", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const totalSupply = await ERC20TokenInstance.totalSupply();
        // Assertions
        expect(totalSupply).to.equal(100);
    });

    it("Decimals should be 18", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
        const decimals = await ERC20TokenInstance.decimals();
        // Assertions
        expect(decimals).to.equal(18); 
    });

    it("is possible to see the owner", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
        const [owner] = await ethers.getSigners();
        const Owner = await ERC20TokenInstance.owner();
        // Assertions
        expect(Owner).to.equal(owner.address); 
    });

    // Test case to verify if transfer of tokens is possible
    it("is possible to transfer", async () => {
        // Deploy ERC20Token contract
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

    // Test case to verify failure when transferring tokens from the wrong address
    it("Fails to transfer tokens from the wrong address", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount, otherAccount2] = await ethers.getSigners();
        await ERC20TokenInstance.transfer(otherAccount.address, 10);
        // Expecting revert when transferring from unauthorized address
        await expect(ERC20TokenInstance.connect(otherAccount2).transferFrom(owner.address, otherAccount2.address, 10)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    });

    // Test case to verify if approve and transferFrom functionalities work
    it("is possible to approve and transferFrom", async () => {
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

    // Test case to verify failure when transferring more tokens than approved
    it("Fails to transfer more tokens than approved", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Approve transfer from owner to otherAccount
        await ERC20TokenInstance.approve(otherAccount.address, 50);
        // Expecting revert when transferring more than approved
        await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount.address, 100)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    });

    it("Fails to initiate with zero supply", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        await expect(ERC20Token.deploy("Token", "TKN", 0)).to.be.revertedWith("ERC20: Value less than or equal to 0");
    });

    it("Fails to approve or transfer to self", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner,otherAccount] = await ethers.getSigners();
        // Expecting revert when approving to self.
        await expect(ERC20TokenInstance.approve(owner, 50)).to.be.revertedWith("ERC20: cannot approve self");
        // Expecting revert when transferring to self
        await expect(ERC20TokenInstance.transfer(owner, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
    });

    it("is possible to transfer owner", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Transfer ownership from owner to otherAccount
        await expect(ERC20TokenInstance.transferOwnership(otherAccount.address)).not.to.be.reverted;
        
    });
    
    it("Fails to transfer owner", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
        // Transfer ownership from owner to otherAccount
        await expect(ERC20TokenInstance.connect(otherAccount).transferOwnership(otherAccount2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
    });

    it("Fails to transfer ownership to zero address", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner] = await ethers.getSigners();
        // Attempt to transfer ownership to zero address
        await expect(ERC20TokenInstance.transferOwnership("0x0000000000000000000000000000000000000000")).to.be.revertedWith("Ownable: new owner is the zero address");
    });
    
    it("Fails to transfer ownership to current owner", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner] = await ethers.getSigners();
        // Attempt to transfer ownership to the current owner
        await expect(ERC20TokenInstance.transferOwnership(owner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
    });
    
    it("Fails to transfer from zero address", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Attempt to transfer from the zero address
        await expect(ERC20TokenInstance.transferFrom("0x0000000000000000000000000000000000000000", otherAccount.address, 10)).to.be.revertedWith("ERC20: transfer from the zero address");
    });
    
    it("Fails to transfer to zero address", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Attempt to transfer to the zero address
        await expect(ERC20TokenInstance.transfer("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        await expect(ERC20TokenInstance.transferFrom(otherAccount.address,"0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
    });
    
    // Test case to verify that it fails to approve to zero address
    it("Fails to approve to zero address", async () => {
        // Deploy ERC20Token contract
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner, otherAccount] = await ethers.getSigners();
        // Attempt to approve to the zero address
        await expect(ERC20TokenInstance.approve("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: approve to the zero address");
    });

    // Test case to verify that it fails to approve or transfer zero amount
    it("Fails to transfer zero amount", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
        const [owner,otherAccount] = await ethers.getSigners();
        // Expecting revert when transferring zero amount
        await expect(ERC20TokenInstance.transfer(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
    });
    
    it("Successfully mint to a address", async () => {
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

    it("Fails to implement mint by other address", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000);
        const [owner,otherAccount,otherAccount2] = await ethers.getSigners();
        await expect(ERC20TokenInstance.connect(otherAccount).mint(otherAccount2.address,10)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Total supply exceeds when implementing mint", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000000);
        const [owner,otherAccount] = await ethers.getSigners();
        await expect(ERC20TokenInstance.mint(otherAccount.address,10)).to.be.revertedWith("ERC20: Total supply exceeds maximum supply");
    });

    it("Fails to implement mint to zero address", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
        const [owner] = await ethers.getSigners();
        await expect(ERC20TokenInstance.mint("0x0000000000000000000000000000000000000000",10)).to.be.revertedWith("ERC20: Cannot mint to zero address");
    });

    it("Fails to implement mint to self", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
        const [owner] = await ethers.getSigners();
        await expect(ERC20TokenInstance.mint(owner.address,10)).to.be.revertedWith("ERC20: Cannot mint to self");
    });

    it("Fails to implement mint zero amount", async () => {
        const ERC20Token = await ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100000);
        const [owner,otherAccount] = await ethers.getSigners();
        await expect(ERC20TokenInstance.mint(otherAccount.address,0)).to.be.revertedWith("ERC20: Amount cannot be 0");
    });
});