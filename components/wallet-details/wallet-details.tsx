import React from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../../context/global-context'
import DetailsTxTable from '../transactions/details-tx-table'

const WalletDetails = ({address}: any) => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

	return (
		<div className='page-wrapper'>
			<h1>Wallet Details</h1>
			<p>
				<b>Address</b>
			</p>
			<span>{address}</span>
			<br />
			<br />
			<p>
				<b>Balance</b>
			</p>
			<p>{window.buiCoin.getBalanceOfAddress(address)}</p>
			<Divider />
			<h1>Transactions</h1>
            <DetailsTxTable address={address} />
		</div>
	)
}

export default WalletDetails
