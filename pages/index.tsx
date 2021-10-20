import type { NextPage } from 'next'
import BlockchainList from '../components/blocks-in-chain/blockchain-list'
import styled from 'styled-components'
import { Divider } from 'antd'

const Home: NextPage = () => {

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
