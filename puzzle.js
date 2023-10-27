const SHA26 = require('crypto-js/sha256')
class Transaction {
constructor(fromAddress , toAddress , amount){
this.fromAddress = fromAddress;
this.toAddress = toAddress;
this.amount = amount;
}
}class Block{
constructor(timestamps , transaction , previousHash = ''){
this.timestamps = timestamps;
this.transaction = transaction;
this.previousHash = previousHash;
this.hash = this.calculateHash();
this.nounce = 0;
}
calculateHash(){
return SHA26(this.index + this.previousHash + this.timestamps +
JSON.stringify(this.data) + this.nounce).toString();
}
mineBlock(difficulty){
while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
this.nounce++;
this.hash = this.calculateHash();
}
console.log("Block mined :" + this.hash);
}
}
class Blockchain{
constructor(){
this.chain = [this.createGenesisisBlock()];
this.difficulty = 2;
this.pendingTransaction = [];
this.miningReward = 100;
}
createGenesisisBlock(){
return new Block("05/09/2022", "Genesis Block","0");
}getLatestBlock(){
return this.chain[this.chain.length - 1]
}
minePendingTransactions(miningRewardAdress){
let block = new Block(Date.now() , this.pendingTransaction);
block.mineBlock(this.difficulty);
console.log("Block successfully mined !");
this.chain.push(block);
this.pendingTransaction = [
new Transaction(null,miningRewardAdress,this.miningReward),17];
}
creatTransaction(transaction){
this.pendingTransaction.push(transaction);
}
getBalanceOfAddress(address){
let balance = 0;
for(const block of this.chain){
for(const trans of block.transaction){
if(trans.fromAddress === address){
balance -= trans.amount;
}
if(trans.toAddress == address){
balance +=trans.amount;
}
}
}
return balance;
} }
console.log("\n*****Solving Mining Puzzles*****")
let AMCoin = new Blockchain();
AMCoin.creatTransaction(new Transaction('address1', 'address2',100));
AMCoin.creatTransaction(new Transaction('address2', 'address1',50));
console.log("\n Starting The Miner...");
AMCoin.minePendingTransactions('Anonymous\'s-address');console.log('\nBalance of Anonymous is' ,AMCoin.getBalanceOfAddress('Anonymous\'s address'));
console.log("\n Starting The Miner Again...");
AMCoin.minePendingTransactions('Anonymous\'s-address');
console.log('\nBalance of Anonymous is',AMCoin.getBalanceOfAddress('Anonymous\'s-address'));
console.log("~By 4701 Abhang Mane");