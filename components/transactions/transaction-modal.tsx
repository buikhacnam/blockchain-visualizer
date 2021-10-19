import { Modal } from 'antd'
import TransactionTable from './transaction-table'
import styled from 'styled-components'

interface TransactionModalProps {
	isModalVisible: boolean
	handleCancel: () => void
	timestamp: number
	blockNum: number
}
const TransactionModal: React.FC<TransactionModalProps> = ({
	isModalVisible,
	handleCancel,
	timestamp,
	blockNum,
}) => {
	return (
		<StyledTransactionModal
			width={'80%'}
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
