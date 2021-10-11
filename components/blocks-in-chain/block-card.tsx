import React, {useState} from 'react'
import styled from 'styled-components'
import { Card, Button } from 'antd'
import TransactionModal from '../transactions/transaction-modal'

interface BlockCardProps {
	blockNum: number
}
const BlockCard = ({ block, blockNum, timestamp }: any) => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<BlockCardStyled>
			<Card title={`Block ${blockNum}`}>
				<BlockCardContent>
					<p>
						Hash <span>{block.hash}</span>
					</p>
					<p>
						Hash of previous block <span>{block.previousHash}</span>
					</p>
					{blockNum === 0 && <br />}

					<p>
						Nonce <span>{block.nonce}</span>
					</p>
					<p>
						Timestamp <span>{block.timestamp}</span>
					</p>
					<Button
						disabled={blockNum === 0}
						type="primary"
						onClick={() => {
							if (blockNum > 0) setIsModalVisible(true)
						}}
						className='bt'
					>
						See Transactions
					</Button>
				</BlockCardContent>
			</Card>
			<TransactionModal blockNum={blockNum} timestamp={timestamp} isModalVisible={isModalVisible} handleCancel={handleCancel}/>
		</BlockCardStyled>
	)
}

export default BlockCard

const BlockCardStyled = styled.div`
	overflow-wrap: break-word;
	
	span {
		display: block;
		font-size: 0.85em;
		color: #8c8c8c;
	}

	.bt > span {
		color: unset !important;
	}
`
const BlockCardContent = styled.div`
	width: 250px;
`
