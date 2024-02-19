const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe block for ERC20 token functionalities
describe("ERC20", function() {

    describe("Constructor",function() {

        it("Sucessfull Initialization", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 100000000000000000000000n)).not.to.be.reverted;
        });
    
        it("Fails to initiate with zero supply", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 0)).to.be.revertedWith("ERC20: Value less than or equal to 0");
        });
    
        it("Fails to initiate while passing excess totalSupply", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            await expect(ERC20Token.deploy("Token", "TKN", 10000000000000000000000000n)).to.be.revertedWith("ERC20: Total supply exceeds maximum supply");
        });

    });

    describe("transfer function",function() {
        
        // Test case to verify if transfer of tokens is possible
        it("Sucessfully transfer tokens to other account", async () => {
            
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

        it("Fails to transfer tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to self
            await expect(ERC20TokenInstance.transfer(owner, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

        it("Fails to transfer zero amount", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            // Expecting revert when transferring zero amount
            await expect(ERC20TokenInstance.transfer(otherAccount, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

        it("Fails to transfer tokens to zero address", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when transferring to the zero address
            await expect(ERC20TokenInstance.transfer("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

    });

    describe("approve Function",function () {
       
        it("Successfully approve tokens to other account", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner,otherAccount] = await ethers.getSigners();
            await ERC20TokenInstance.approve(otherAccount, 50);
            const allowance = await ERC20TokenInstance.allowance(owner,otherAccount);
            // Assertions
            expect(allowance).to.equal(50);
        });    
    
        it("Fails to approve tokens to self", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Expecting revert when approving to self.
            await expect(ERC20TokenInstance.approve(owner, 50)).to.be.revertedWith("ERC20: cannot approve self");
        });
    
        it("Fails to approve tokens to zero address", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to approve to the zero address
            await expect(ERC20TokenInstance.approve("0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: approve to the zero address");
        });

    });

    describe("transferFrom",function () {
        
        // Test case to verify if transferFrom functionalities work
        it("Sucessfully transferFrom owner by other account", async () => {
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

        it("Fails to transfer from zero address", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Attempt to transfer from the zero address
            await expect(ERC20TokenInstance.transferFrom("0x0000000000000000000000000000000000000000", otherAccount.address, 10)).to.be.revertedWith("ERC20: transfer from the zero address");
        });

        it("Fails to transfer to zero address", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            await expect(ERC20TokenInstance.transferFrom(otherAccount.address,"0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

        // Test case to verify failure when transferring more tokens than approved
        it("Fails to transfer more tokens than approved", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            // Expecting revert when transferring more than approved
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address, otherAccount2.address, 100)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });

        it("Fails to transferFrom to owner", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,owner.address, 10)).to.be.revertedWith("ERC20: cannot transfer to self");
        });

        it("Fails to transferFrom to zero address", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,"0x0000000000000000000000000000000000000000", 10)).to.be.revertedWith("ERC20: transfer to the zero address");
        });

        it("Fails to transferFrom zero amount", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Approve transfer from owner to otherAccount
            await ERC20TokenInstance.approve(otherAccount.address, 50);
            await expect(ERC20TokenInstance.connect(otherAccount).transferFrom(owner.address,otherAccount2.address, 0)).to.be.revertedWith("ERC20: Amount should be greater than 0");
        });

    });

    describe("mint Function",function () {

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
    
        it("Fails to implement mint due to total supply exceeds", async () => {
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 1000000000000000000000000n);
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

    describe("transferOwnerShip function",function () {

        it("Successfully transfer ownership", async () => {
        
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.transferOwnership(otherAccount.address)).not.to.be.reverted; 
        });
    
        it("Fails to transfer ownership by other account", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner, otherAccount,otherAccount2] = await ethers.getSigners();
            // Transfer ownership from owner to otherAccount
            await expect(ERC20TokenInstance.connect(otherAccount).transferOwnership(otherAccount2.address)).to.be.rejectedWith("Ownable: caller is not the owner");
        });
    
        it("Fails to transfer ownership to zero address", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to zero address
            await expect(ERC20TokenInstance.transferOwnership("0x0000000000000000000000000000000000000000")).to.be.revertedWith("Ownable: new owner is the zero address");
        });
    
        it("Fails to transfer ownership to current owner", async () => {
            
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("Token", "TKN", 100);
            const [owner] = await ethers.getSigners();
            // Attempt to transfer ownership to the current owner
            await expect(ERC20TokenInstance.transferOwnership(owner.address)).to.be.revertedWith("Ownable: new owner is already the current owner");
        });

    });

    describe("All state variable functions",function () {

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
        it("Balance of other account should be 10", async () => {
            
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
    
        it("Allowance of other account should be 50", async () => {
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
    
        it("Owner should be 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", async () => {
            const ownerAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
            const ERC20Token = await ethers.getContractFactory("ERC20Token");
            const ERC20TokenInstance = await ERC20Token.deploy("TestToken", "TT", 100);
            const Owner = await ERC20TokenInstance.owner();
            // Assertions
            expect(Owner).to.equal(ownerAddress); 
        });

    })    

});