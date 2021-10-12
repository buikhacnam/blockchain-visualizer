import React from 'react'
import styled from 'styled-components'
import { useBlockchain } from '../../context/global-context'
import BlockCard from './block-card'
const BlockchainList = () => {
	const { state, dispatch } = useBlockchain()
	if (!state?.blockchainState?.chain?.length) return <div>Loading...</div>
	return (
		<ChainListWrapper>
			<ChainListStyled>
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
			</ChainListStyled>
		</ChainListWrapper>
	)
}

export default BlockchainList

const ChainListWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

const ChainListStyled = styled.div`
    padding: 20px;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
`
