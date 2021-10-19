import React, { useState } from 'react'
import styled from 'styled-components'
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
		<BlockCardStyled>
			<Card title={blockNum > 0? `Block ${blockNum + 1}`: `Block ${blockNum + 1} (Genesis)`} hoverable style={{cursor: 'default'}}>
				<BlockCardContent>
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
				</BlockCardContent>
			</Card>
			<TransactionModal
				blockNum={blockNum}
				timestamp={timestamp}
				isModalVisible={isModalVisible}
				handleCancel={handleCancel}
			/>
		</BlockCardStyled>
	)
}

export default BlockCard

const BlockCardStyled = styled.div`
	/* overflow-wrap: break-word; */
	word-break: break-all;
	display: inline-block;
	margin: 0 10px;

	span {
		display: block;
		font-size: 0.7rem;
		color: #8c8c8c;
	}

	.bt > span {
		color: unset !important;
	}
`
const BlockCardContent = styled.div`
`
