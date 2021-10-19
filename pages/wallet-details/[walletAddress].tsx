import WalletDetails from '../../components/wallet-details/wallet-details'
import { useRouter } from 'next/router'
import { Blockchain } from '../../utils/blockchain'
import { useEffect } from 'react'
import { useBlockchain } from '../../context/global-context'
import type { NextPage } from 'next'

const WalletDetailsPage: NextPage = () => {
	const router = useRouter()
	const { state, dispatch } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain' })
	}, [])
	return (
		<div className='page-wrapper'>
			<WalletDetails address={router.query.walletAddress} />
		</div>
	)
}

export default WalletDetailsPage
