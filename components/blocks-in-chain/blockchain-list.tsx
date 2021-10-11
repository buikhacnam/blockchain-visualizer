import React from 'react'
import styled from 'styled-components'
import {useBlockchain} from '../../context/global-context'
import BlockCard from './block-card'
const BlockchainList = () => {
    const {state, dispatch} = useBlockchain()
    if(!state?.blockchainState?.chain?.length) return <div>Loading...</div>
    return (
        <ChainListStyled>
            {state.blockchainState.chain.map((block: any, index: number) => {
                return <BlockCard key={block.timestamp} timestamp={block.timestamp} block={block} blockNum={index}/>
            })}
        </ChainListStyled>
    )
}

export default BlockchainList

const ChainListStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    align-items: center;
    padding: 10px;
`