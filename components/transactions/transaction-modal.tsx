import { Modal } from 'antd'
import TransactionTable from './transaction-table'
import styled from 'styled-components'
const TransactionModal = ({
	isModalVisible,
	handleCancel,
	timestamp,
	blockNum,
}: any) => {
	return (
		<StyledTransactionModal
			width={600}
			centered
			title={`Transactions inside Block ${blockNum}`}
			footer={null}
			visible={isModalVisible}
			onCancel={handleCancel}
		>
			<TransactionTable timestamp={timestamp} />
		</StyledTransactionModal>
	)
}

const StyledTransactionModal = styled(Modal)`
	.ant-modal-body {
		overflow: auto;
	}
`
export default TransactionModal
