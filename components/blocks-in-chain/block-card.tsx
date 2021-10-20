import React, { useState } from 'react'
import { Card, Button } from 'antd'
import TransactionModal from '../transactions/transaction-modal'

interface BlockCardProps {
	blockNum: number,
	timestamp: number,
	block: any
}

const BlockCard: React.FC<BlockCardProps> = ({ block, blockNum, timestamp }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<div className='block-card-style'>
			<Card title={blockNum > 0? `Block ${blockNum + 1}`: `Block ${blockNum + 1} (Genesis)`} hoverable style={{cursor: 'default'}}>
				<div>
					<p title={block.hash}>
						Hash{' '}
						<span style={{ color: block.color }}>
							{block.hash.substring(0, 50) + '...'}
						</span>
					</p>
					<p title={block.previousHash}>
						Hash of previous block{' '}
						<span style={{ color: block.previousColor }}>
							{block.previousHash.length > 1
								? block.previousHash.substring(0, 50) + '...'
								: block.previousHash}
						</span>
					</p>

					<p>
						Nonce <span>{block.nonce}</span>
					</p>
					<p>
						Timestamp <span>{block.timestamp}</span>
					</p>
					<Button
						style={{ marginTop: '10px' }}
						disabled={blockNum === 0}
						type='primary'
						onClick={() => {
							if (blockNum > 0) setIsModalVisible(true)
						}}
						className='bt'
					>
						See Transactions
					</Button>
				</div>
			</Card>
			<TransactionModal
				blockNum={blockNum}
				timestamp={timestamp}
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
			/>
		</div>
	)
}

export default BlockCard

