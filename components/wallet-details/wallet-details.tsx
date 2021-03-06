import React, { useEffect } from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../../context/global-context'
import DetailsTxTable from '../transactions/details-tx-table'
import { Blockchain } from '../../utils/blockchain'

const WalletDetails = ({ address }: any) => {
	const { state, dispatch } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain' })
	}, [])

	return (
		<div className='page-wrapper'>
			<h1>Wallet Details</h1>
			<p>
				<b>Address</b>
			</p>
			<span>
				{address?.length > 30
					? address.substring(0, 30) + '...'
					: address}
			</span>
			<br />
			<br />
			<p>
				<b>Balance</b>
			</p>
			<p>{state?.blockchainState?.getBalanceOfAddress(address)}</p>
			{state?.blockchainState?.getBalanceOfAddress(address) < 0 && (
				<span>
					*Please note in real blockchain you cannot send money when
					balance is equal or less than 0
				</span>
			)}

			<Divider />
			<h1>Transactions</h1>
			<DetailsTxTable address={address} />
		</div>
	)
}

export default WalletDetails
