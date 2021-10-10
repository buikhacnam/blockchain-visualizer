import {Modal} from 'antd'
const TransactionModal = ({isModalVisible, handleCancel}: any) => {
    return <Modal title="Basic Modal" footer={null} visible={isModalVisible}  onCancel={handleCancel}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
}

export default TransactionModal