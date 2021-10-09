const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const { Blockchain, Transaction} = require('./blockchain')

const myKey = ec.keyFromPrivate('1be1c091f5f3aa4cb6cb6bfa4cfe6308ec39b38be734c42ace77f806dbfdb055')
const myWalletAddress = myKey.getPublic('hex')

let myCoin = new Blockchain()
console.log('my coin started', JSON.stringify(myCoin, null, 4))

const tx1 = new Transaction(myWalletAddress, 'public key of receiver goes here', 10)
tx1.signTransaction(myKey)
myCoin.addTransaction(tx1)

console.log('mining started....')
myCoin.minePendingTransactions(myWalletAddress)

myCoin.getBalanceOfAddress(myWalletAddress)

// try to tamper with the blockchain
myCoin.chain[1].transactions[0].amount = 1

myCoin.isChainValid()

