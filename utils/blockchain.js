const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress
		this.toAddress = toAddress
		this.amount = amount
		this.timestamp = Date.now()
	}

	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
	}

	signTransaction(signingKey) {
		if (signingKey.getPublic('hex') !== this.fromAddress) {
			throw new Error('You cannot sign transactions for other wallets!')
		}
		const hashTx = this.calculateHash()
		const sig = signingKey.sign(hashTx, 'base64')
		this.signature = sig.toDER('hex')

		console.log('Transaction is sign successfully. Signature: ', this.signature)
	}

	isValid() {
		if (this.fromAddress === null) return true
		if (!this.signature || this.signature.length === 0) {
			throw new Error('No signature in this transaction')
		}
		const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
		return publicKey.verify(this.calculateHash(), this.signature)
	}
}

class Block {
	constructor(timestamp, transactions, previousHash, previousColor) {
		this.timestamp = timestamp
		this.transactions = transactions
		this.previousHash = previousHash
		this.hash = this.calculateHash()
		this.nonce = 0
		this.color = this.getRandomColor()
		this.previousColor = previousColor
	}

	calculateHash() {
		return SHA256(
			this.previousHash +
				this.timestamp +
				JSON.stringify(this.transactions) +
				this.nonce
		).toString()
	}

	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !==
			Array(difficulty + 1).join('0')
		) {
			this.nonce++
			// the hash of the block wont change if we dont change the content of the block, so "nonce" above solve the problem
			this.hash = this.calculateHash()
		}
		console.log('block mined: ', this.hash)
	}

	hasValidTransactions() {
		for (const tx of this.transactions) {
			if (!tx.isValid()) return false
		}
		return true
	}

	getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	  }
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()]
		this.difficulty = 2
		this.pendingTransactions = []
		this.miningReward = 100
	}

	createGenesisBlock() {
		return new Block('1483228800000', 'Genesis block', '0', '#B8B8B8')
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1]
	}

	// addBlock(newBlock) {
	//     newBlock.previousHash = this.getLatestBlock().hash
	//     //newBlock.hash = newBlock.calculateHash()
	//     newBlock.mineBlock(this.difficulty)
	//     this.chain.push(newBlock)
	// }

	minePendingTransactions(miningRewardAddress) {
		const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward)
		this.pendingTransactions.push(rewardTx)
		let prevHash = this.getLatestBlock().hash
		let prevColor = this.getLatestBlock().color
		let block = new Block(Date.now(), this.pendingTransactions, prevHash, prevColor)
		block.mineBlock(this.difficulty)

		// console.log(
		// 	`Block successfully mined by ${miningRewardAddress}. pending transactions ${JSON.stringify(
		// 		this.pendingTransactions
		// 	)} will be added to the new block`
		// )
		console.log(
			`Block successfully mined by ${miningRewardAddress}`
		)
		this.chain.push(block)

		// this.pendingTransactions = [
		// 	new Transaction(null, miningRewardAddress, this.miningReward),
		// ]

		this.pendingTransactions = []
	}

	addTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Transaction must include from and to address')
		}
		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid transaction to chain')
		}
		this.pendingTransactions.push(transaction)
		console.log(
			`pending transaction has made from ${transaction.fromAddress} to ${transaction.toAddress} with the amount of ${transaction.amount}`
		)
	}

	getBalanceOfAddress(address) {
		let balance = 0

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount
				}
				if (trans.toAddress === address) {
					balance += trans.amount
				}
			}
		}
		console.log(`balance of ${address} is`, balance)
		return balance
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i]
			const previousBlock = this.chain[i - 1]

			if (!currentBlock.hasValidTransactions()) {
				console.log('invalid transaction')
				return false
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				console.log('invalid hash')
				return false
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				console.log('invalid previous hash')
				return false
			}
		}

		return true
	}

	changeDifficulty(difficulty) {
		this.difficulty = difficulty
	}

	changeMiningReward(miningReward) {
		console.log(`mining reward has been changed to ${miningReward}`)
		this.miningReward = miningReward
		console.log(`mining reward has been changed to 2 ${this.miningReward}`)
	}

	getTransactionsOfAddress(address) {
		let transactions = []
		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address || trans.toAddress === address) {
					transactions.push(trans)
				}
				
			}
		}
		return transactions
	}

	getAllAddresses() {
		let address = []
		let seen = {}

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (!seen[trans.fromAddress]) {
					address.push(fromAddress)
					seen[trans.fromAddress] = 1
				}
				else if (!seen[trans.toAddress]) {
					address.push(toAddress)
					seen[trans.toAddress] = 1
				}
				
			}
		}
		return address
	}
}

module.exports = {
    Blockchain,
    Block,
    Transaction
}
