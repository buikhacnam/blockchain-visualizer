import { Modal } from 'antd'
import TransactionTable from './transaction-table'
const TransactionModal = ({
	isModalVisible,
	handleCancel,
	timestamp,
	blockNum,
}: any) => {
	return (
		<Modal
			width={'100%'}
			centered
			title={`Transactions inside Block ${blockNum}`}
			footer={null}
			visible={isModalVisible}
			onCancel={handleCancel}
		>
			<TransactionTable timestamp={timestamp} />
		</Modal>
	)
}

export default TransactionModal
