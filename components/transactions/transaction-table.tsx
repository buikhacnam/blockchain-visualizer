import { Table } from 'antd'
import { columns } from './table-data'
import styled from 'styled-components'
import { useBlockchain } from '../../context/global-context'


const TransactionTable = ({ timestamp }: any) => {
	const { state } = useBlockchain()
	const blockSource = state.blockchainState.chain.find(
		(block: any) => block.timestamp === timestamp
	)
	const transactionSource = blockSource?.transactions
	console.log('src', transactionSource)
	return (
		<TableWrapper>
			<TableStyled columns={columns} dataSource={transactionSource} />
		</TableWrapper>
	)
}

export default TransactionTable

const TableWrapper = styled.div``
const TableStyled = styled(Table)``
