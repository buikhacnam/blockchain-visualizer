import React, { createContext, useContext, useReducer } from 'react'
import { Blockchain, Transaction, Block } from '../utils/blockchain'
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const myWalletAddress = '04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863'
const myKey = ec.keyFromPrivate('1be1c091f5f3aa4cb6cb6bfa4cfe6308ec39b38be734c42ace77f806dbfdb055')


// will update types below later:
type AppProviderProps = { children: React.ReactNode }
type Action = any
type State = any
type Dispatch = any



const GlobalContext = createContext<{state: State; dispatch: Dispatch}>({} as any)

const reducer = (state: State, action: Action) => {
	const blockchain = window.buiCoin
	switch (action.type) {
		case 'get_blockchain': {
			return {
				blockchainState: action.blocks,
			}
		}

		case 'add_transaction': {
			let tx = new Transaction(myWalletAddress, action.transaction.receiver, action.transaction.amount)
        	tx.signTransaction(myKey)
			return {
				blockchainState: blockchain.addTransaction(tx),
			}
		}

		case 'mine_block': {
			return {
				blockchainState: blockchain.minePendingTransactions(myWalletAddress),
			}
		}

		case 'get_balance': {
			return {
				blockchainState: blockchain.getBalanceOfAddress(myWalletAddress),
			}
		}

		case 'check_valid': {
			return {
				blockchainState: blockchain.isChainValid(),
			}
		}

		case 'change_difficulty' : {
			return {
				blockchainState: blockchain.changeDifficulty(action.difficulty),
			}
		}

		case 'change_mining_reward' : {
			return {
				blockchainState: blockchain.changeMiningReward(action.miningReward),
			}
		}

		default: {
			return state
		}
	}
}

const initialState = {}
const GlobalProvider = ({ children }: AppProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const value = { state, dispatch }
	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	)
}


const useBlockchain = () => {
	const context = useContext(GlobalContext)

	return {
		...context,
		myWalletAddress
	}
}

export { GlobalProvider, useBlockchain }
