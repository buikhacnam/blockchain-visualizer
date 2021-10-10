import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {GlobalProvider, useBlockchain} from '../context/global-context'
import { Blockchain } from '../utils/blockchain'

const Home: NextPage = () => {
  const {state, dispatch} = useBlockchain()
  
  useEffect(() => {
    if(!window.buiCoin){
      window.buiCoin = new Blockchain()
    }
    dispatch({type: 'update_blockchain', blocks: window.buiCoin})
  }, [])

  
  return (
    <div> 
          <Link href='/new-transaction'>new transaction</Link>
        {JSON.stringify(state, null, 2)}
    </div>
  )
}

export default Home
