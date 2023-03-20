const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('StoreFund', function () {
  beforeEach(async function() {
    [owner, wallet1, wallet2] = await ethers.getSigners();
    StoreFund = await ethers.getContractFactory('StoreFund', owner);
    Test = await ethers.getContractFactory('testcoin', wallet1);
    storeFund = await StoreFund.deploy();
    test = await Test.deploy();

    test.connect(wallet1).transfer(wallet2.address, 50000);

    await test.connect(wallet1).approve(storeFund.address, 50000);
    await test.connect(wallet2).approve(storeFund.address, 50000);

    TEST = ethers.utils.formatBytes32String('Test');

  });

  describe('Deposit', function () {
    it('should deposit funds', async function () {
      await storeFund.connect(wallet1).deposit(test.address, 1000);
      await storeFund.connect(wallet2).deposit(test.address, 2000);

      expect(await test.balanceOf(wallet1.address)).to.equal(49000);
      expect(await test.balanceOf(wallet2.address)).to.equal(48000);

      expect(await storeFund.balances(wallet1.address, test.address)).to.equal(1000);
      expect(await storeFund.balances(wallet2.address, test.address)).to.equal(2000);
    });

    it("amount should be larger than 0", async function () {
      await expect(storeFund.connect(wallet1).deposit(test.address, 0)).to.be.revertedWith("Amount should be larger than 0.");
    });
  })

  describe('Withdraw', function () {
    it('should withdraw funds', async function () {
      await storeFund.connect(wallet1).deposit(test.address, 50000);
      await storeFund.connect(wallet1).withdraw(test.address, 10000);

      expect(await test.balanceOf(wallet1.address)).to.equal(10000);
      expect(await storeFund.balances(wallet1.address, test.address)).to.equal(40000);
    })

    it("amount should be larger than 0", async function () {
      await expect(storeFund.connect(wallet1).withdraw(test.address, 0)).to.be.revertedWith("Amount should be larger than 0.");
    });

    it('should not allow withdrawing more than has been deposited', async function () {
      await expect(storeFund.connect(wallet1).withdraw(test.address, 100000)).to.be.revertedWith("Insufficient funds.");
    })
  })
})