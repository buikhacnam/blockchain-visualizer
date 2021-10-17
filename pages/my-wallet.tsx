import React from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../context/global-context'
import MyTxTable from '../components/transactions/details-tx-table'

const MyWalletPage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

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
			<p>{window.buiCoin.getBalanceOfAddress(myWalletAddress)}</p>
			<Divider />
			<h1>Transactions</h1>
			<MyTxTable address={myWalletAddress}/>
		</div>
	)
}

export default MyWalletPage
