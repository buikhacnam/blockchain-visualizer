import WalletDetails from '../../components/wallet-details/wallet-details'
import { useRouter } from 'next/router'
import { Blockchain } from '../../utils/blockchain'
import { useEffect } from 'react'
import { useBlockchain } from '../../context/global-context'
import styled from 'styled-components'

const WalletDetailsPage = () => {
	const router = useRouter()
	const { state, dispatch } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])
	return (
		<div className='page-wrapper'>
			<WalletDetails address={router.query.walletAddress} />
		</div>
	)
}

export default WalletDetailsPage
