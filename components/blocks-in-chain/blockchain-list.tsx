import React from 'react'
import { useBlockchain } from '../../context/global-context'
import BlockCard from './block-card'

const BlockchainList = () => {
	const { state } = useBlockchain()
	if (!state?.blockchainState?.chain?.length) return <div>Loading...</div>
	return (
		<div className='chain-list-wrapper'>
			<div className='chain-list-styled'>
				{state.blockchainState.chain.map(
					(block: any, index: number) => {
						return (
							<BlockCard
								key={block.timestamp}
								timestamp={block.timestamp}
								block={block}
								blockNum={index}
							/>
						)
					}
				)}
			</div>
		</div>
	)
}

export default BlockchainList
