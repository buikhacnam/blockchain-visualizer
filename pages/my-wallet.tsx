import React, {useEffect} from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../context/global-context'
import MyTxTable from '../components/transactions/details-tx-table'
import { Blockchain } from '../utils/blockchain'

const MyWalletPage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()
	
	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		console.log('run effect')
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])
	return (
		<div className='page-wrapper'>
			<h1>My Wallet</h1>
			<p>
				<b>Address</b>
			</p>
			<span>{myWalletAddress}</span>
			<br />
			<br />
			<p>
				<b>Balance</b>
			</p>
			<p>{state.blockchainState?.getBalanceOfAddress(myWalletAddress)}</p>
			<Divider />
			<h1>Transactions</h1>
			
			<MyTxTable address={myWalletAddress}/>
		</div>
	)
}

export default MyWalletPage
