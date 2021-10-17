import { Form, Input, Button, Checkbox, Divider } from 'antd'
import { Blockchain, Block, Transaction } from '../utils/blockchain'
import Link from 'next/link'
import { useEffect } from 'react'
import { useBlockchain } from '../context/global-context'
import styled from 'styled-components'
import PendingTxTable from '../components/transactions/pending-tx-table'

const MinePage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

	return (
		<MinePageWrapper className='page-wrapper'>
			<h1>Start Mining A BLock</h1>
			<MineButtonWrapper>
				<Button
					type='primary'
					size='large'
					onClick={() => {
						dispatch({ type: 'mine_block' })
					}}
					style={{ marginTop: '10px'}}
				>
					Mine
				</Button>
			</MineButtonWrapper>
			<Divider />
			<h1>Pending Transactions</h1>
			<PendingTxTable />
		</MinePageWrapper>
	)
}

const MinePageWrapper = styled.div`
	margin: 20px;
	h1 {
		font-size: 2rem;
		margin-bottom: 4px;
	}

	p {
		font-size: 1rem;
	}
`

const MineButtonWrapper = styled.div``
export default MinePage
