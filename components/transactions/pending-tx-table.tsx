import { useEffect } from 'react'
import { Table } from 'antd'
import { columns } from './table-data'
import styled from 'styled-components'
import { useBlockchain } from '../../context/global-context'
import { Blockchain } from '../../utils/blockchain'

const PendingTxTable = () => {
	const { state, dispatch } = useBlockchain()
    useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		console.log('run effect')
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])
	const pendingTx = state.blockchainState?.pendingTransactions
    if(!pendingTx?.length) return <p>No pending transactions</p>
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
