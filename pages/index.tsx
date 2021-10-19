import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useBlockchain } from '../context/global-context'
import { Blockchain } from '../utils/blockchain'
import BlockchainList from '../components/blocks-in-chain/blockchain-list'
import styled from 'styled-components'
import { Divider } from 'antd'

const Home: NextPage = () => {
	const { state, dispatch } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain' })
	}, [])

	return (
		<HomeStyled className='page-wrapper'>
			<h1>Blocks on Chain</h1>
			<Divider />
			<BlockchainList />
		</HomeStyled>
	)
}

const HomeStyled = styled.div``
export default Home
