import React, { createContext, useContext, useReducer } from 'react'
import { Blockchain } from '../utils/blockchain'

// will update types below later:
type AppProviderProps = { children: React.ReactNode }
type Action = any
type State = any
type Dispatch = any



const GlobalContext = createContext<{state: State; dispatch: Dispatch}>({} as any)

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'update_blockchain': {
			return {
				blockchainState: action.blocks,
			}
		}

		case 'add_transaction': {
			const blockchain = window.buiCoin
			return {
				blockchainState: blockchain.addTransaction(action.transaction),
			}
		}

		default: {
			return state
		}
	}
}

const initialState = {empty: true}
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

	return context
}

export { GlobalProvider, useBlockchain }
