import { Button, Spin, Divider, message } from 'antd'
import { Blockchain, Block, Transaction } from '../utils/blockchain'
import Link from 'next/link'
import { useState } from 'react'
import { useBlockchain } from '../context/global-context'
import styled from 'styled-components'
import PendingTxTable from '../components/transactions/pending-tx-table'
import {useRouter} from 'next/router'
import type { NextPage } from 'next'



const MinePage: NextPage = () => {
	const {  dispatch } = useBlockchain()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onChange = () => {
		setLoading(true)
		setTimeout(() => {
			dispatch({ type: 'mine_block' })
			setLoading(false)
			message.success('Block mined successfully!')
			router.push('/')
		}, 1500)
	}

	return (
		<>
			{loading ? (
				<Spin tip='Mining block...' size='large'>
					<MinePageWrapper className='page-wrapper'>
						<h1>Pending Transactions</h1>
						<PendingTxTable />
					</MinePageWrapper>
				</Spin>
			) : (
				<MinePageWrapper className='page-wrapper'>
					<MineButtonWrapper>
						<Button
							type='primary'
							size='large'
							onClick={onChange}
							style={{ marginTop: '10px' }}
						>
							Mine A BLock
						</Button>
					</MineButtonWrapper>
					<Divider />
					<h1>Pending Transactions</h1>
					<p>Pending transactions will be added to the next block once it is mined</p>
					<PendingTxTable />
				</MinePageWrapper>
			)}
		</>
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
