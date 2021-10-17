import { useEffect } from 'react'
import { Table, Empty, Button } from 'antd'
import { columns } from './table-data'
import styled from 'styled-components'
import { useBlockchain } from '../../context/global-context'
import { Blockchain } from '../../utils/blockchain'
import Link from 'next/link'

const PendingTxTable = () => {
	const { state, dispatch } = useBlockchain()
	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])
	const pendingTx = state.blockchainState?.pendingTransactions
	if (!pendingTx?.length)
		return (
			<Empty>
				<Link href='new-transaction' passHref>
					<Button>Create Transaction</Button>
				</Link>
			</Empty>
		)
	return (
		<TableWrapper>
			<TableStyled columns={columns} dataSource={pendingTx} />
		</TableWrapper>
	)
}

export default PendingTxTable

const TableWrapper = styled.div`
	margin-top: 10px;
`
const TableStyled = styled(Table)``
