import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {useBlockchain} from '../context/global-context'
import { Blockchain } from '../utils/blockchain'
import BlockchainList from '../components/blocks-in-chain/blockchain-list'

const Home: NextPage = () => {
  const {state, dispatch} = useBlockchain()
  
  useEffect(() => {
    if(!window.buiCoin){
      window.buiCoin = new Blockchain()
    }
    dispatch({type: 'get_blockchain', blocks: window.buiCoin})
  }, [])

  
  return (
    <div> 
        <BlockchainList />
    </div>
  )
}

export default Home
