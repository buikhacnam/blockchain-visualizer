import type { NextPage } from 'next'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import sha256 from 'crypto-js/sha256'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'
import {Blockchain, Block, Transaction} from '../utils/blockchain'
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
declare global {
  interface Window {
      myCoin:any;
  }
}
const myWalletAddress = '04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863'
const myKey = ec.keyFromPrivate('1be1c091f5f3aa4cb6cb6bfa4cfe6308ec39b38be734c42ace77f806dbfdb055')
const Home = () => {
  // const myKey = ec.keyFromPrivate('1be1c091f5f3aa4cb6cb6bfa4cfe6308ec39b38be734c42ace77f806dbfdb055')
  // const myWalletAddress = myKey.getPublic('hex')
  // console.log('mywalletaddress',myWalletAddress)
  // console.log('mykey',myKey)
  // let myCoin = new Blockchain()
  // let tx: any
  useEffect(() => {

      if(!window.myCoin){
         window.myCoin = new Blockchain()
      }
    //console.log('myCoin', myCoin)
  }, [])
  return (
    <div>
      <Link href='/new-transaction'>Create transactions</Link>
      {/* <button
        onClick = {() => {
          
          tx = new Transaction(myWalletAddress, 'public key', 10)
          console.log('tx', tx)
          tx.signTransaction(myKey)
        }}
      >
        sign transaction
      </button>
      <button
        onClick = {() => {
          myCoin.addTransaction(tx)
        }}
      >
        add transaction
      </button>
      <button
        onClick = {() => {
          myCoin.minePendingTransactions(myWalletAddress)
        }}
      >
        Mine
      </button>
      <button
        onClick = {() => {
          myCoin.getBalanceOfAddress(myWalletAddress)
        }}
      >
        get balance
      </button> */}
    </div>
  )
}

export default Home

const useTransaction = (fromAddress:string, toAddress: string, amount: number) => {
  const [signature, setSignature] = useState('')

  const calculateHash = () => {
		return sha256(fromAddress + toAddress + amount).toString()
	}

  const newTransaction = () => {
    return {
      fromAddress,
      toAddress,
      amount,
    }
  }

  const	signTransaction = (signingKey: any) => {
		if (signingKey.getPublic('hex') !== fromAddress) {
			console.log('You cannot sign transactions for other wallets!')
		}
		const hashTx = calculateHash()
		const sig = signingKey.sign(hashTx, 'base64')
		setSignature(sig.toDER('hex'))
	}

  return {
    newTransaction,
    calculateHash,
    signTransaction
  }
}


const genesisBlock =  {
  timestamp: '1/1/2018',
  transactions: 'Genesis block',
  previousHash: '0',
  hash: "53f1b72206b69e26b3e907fbd8d2bcb876dd3bd9bc46000e14a3f453e953271b",
  nonce: 0,
  difficulty: 4,
  pendingTransactions: [],
  miningReward: 100
}
const useBlockChain = (timestamp?: any, transactions?: any, previousHash = '') => {
  const [pendingTransactions, setPendingTransactions] = useState([])
  const [miningReward, setMiningReward] = useState(100)
  const [difficulty, setDifficulty] = useState(4)
  const [chain, setChain] = useState([genesisBlock])
  const [nonce, setNonce] = useState(0)

  const calculateHash = () => {
		return sha256(
			previousHash +
			timestamp +
			JSON.stringify(transactions) +
			nonce
		).toString()
	}


  return {
    chain,
    genesisBlock,
  }
}