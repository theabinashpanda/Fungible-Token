(async () => {
    try {
        const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
        const ERC20TokenInstance = await ERC20Token.deploy("Token","TKN",1);
        await ERC20TokenInstance.waitForDeployment();
        //deployed() and address are no longer there for hardhat-toolbox
        console.log(`Deploy contract at ${await ERC20TokenInstance.getAddress()}`);
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
  })();
   