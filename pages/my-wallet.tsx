import React, { useEffect } from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../context/global-context'
import MyTxTable from '../components/transactions/details-tx-table'
import { Blockchain } from '../utils/blockchain'
import type { NextPage } from 'next'

const MyWalletPage: NextPage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		console.log('run effect')
		dispatch({ type: 'get_blockchain' })
	}, [])
	return (
		<div className='page-wrapper'>
			<h1>My Wallet</h1>
			<p>
				<b>Address</b>
			</p>
			<span>
				04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9
				<br />
				b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863
			</span>
			<br />
			<br />
			<p>
				<b>Balance</b>
			</p>
			<p>
				{state?.blockchainState?.getBalanceOfAddress(myWalletAddress)}
			</p>
			{state?.blockchainState?.getBalanceOfAddress(myWalletAddress) <
				0 && (
				<span>
					*Please note in real blockchain you cannot send money when
					balance is equal or less than 0
				</span>
			)}
			<Divider />
			<h1>Transactions</h1>

			<MyTxTable address={myWalletAddress} />
		</div>
	)
}

export default MyWalletPage
