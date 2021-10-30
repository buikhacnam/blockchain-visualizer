const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
	public fromAddress: string | null
	public toAddress: string
	public amount: string
	public timestamp: number
	public signature?: string
	constructor(fromAddress: string | null, toAddress: string, amount: string) {
		this.fromAddress = fromAddress
		this.toAddress = toAddress
		this.amount = amount
		this.timestamp = Date.now()
	}

	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
	}

	signTransaction(signingKey: any) {
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
	public timestamp: number
	public transactions: Transaction[]
	public hash: string
	public previousHash: string
	public nonce: number
	public color: string
	public previousColor: string
	constructor(timestamp: number, transactions: Transaction[], previousHash: string, previousColor: string) {
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

	mineBlock(difficulty: number) {
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
	public chain: Block[]
	public pendingTransactions: Transaction[]
	public difficulty: number
	public miningReward: string
	constructor() {
		this.chain = [this.createGenesisBlock()]
		this.difficulty = 2
		this.pendingTransactions = []
		this.miningReward = "100"
	}

	createGenesisBlock() {
		return new Block(1483228800000, [], '0', '#B8B8B8')
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

	minePendingTransactions(miningRewardAddress: string) {
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

	addTransaction(transaction: Transaction) {
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

	getBalanceOfAddress(address: string) {
		let balance = 0

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= Number(trans.amount)
				}
				if (trans.toAddress === address) {
					balance += Number(trans.amount)
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

	changeSettings(difficulty: number, miningReward: string) {
		this.difficulty = difficulty
		this.miningReward = miningReward
	}

	getTransactionsOfAddress(address: string) {
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
}

export {
	Blockchain,
    Block,
    Transaction
}