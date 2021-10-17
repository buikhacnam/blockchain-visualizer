import React, {useEffect} from 'react'
import { Divider } from 'antd'
import { useBlockchain } from '../../context/global-context'
import DetailsTxTable from '../transactions/details-tx-table'
import { Blockchain } from '../../utils/blockchain'

const WalletDetails = ({address}: any) => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])

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
			<p>{state.blockchainState?.getBalanceOfAddress(address)}</p>
			<Divider />
			<h1>Transactions</h1>
            <DetailsTxTable address={address} />
		</div>
	)
}

export default WalletDetails