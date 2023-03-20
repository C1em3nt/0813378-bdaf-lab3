async function main() {

    StoreFund = await ethers.getContractFactory('StoreFund');
    storeFund = await StoreFund.deploy();

 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });