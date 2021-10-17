import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useBlockchain } from '../context/global-context'
import { Blockchain } from '../utils/blockchain'
import BlockchainList from '../components/blocks-in-chain/blockchain-list'
import styled from 'styled-components'
import { Button, Divider } from 'antd'

const Home: NextPage = () => {
	const { state, dispatch } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])

	return (
		<HomeStyled className='page-wrapper'>
			<h1>Blocks in Chain</h1>
			<Divider />
			<BlockchainList />
			{/* <NewTransaction>
          <Button
            type='primary'
          >
            Create Transaction
          </Button>
        </NewTransaction> */}
		</HomeStyled>
	)
}

const HomeStyled = styled.div`
	/* background-color: #f0f2f5; */
`

const NewTransaction = styled.div`
	background-color: #ffffff;
	text-align: center;
	padding-top: 30px;
`
export default Home
