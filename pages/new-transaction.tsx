// domain.com/new-transaction
import { Form, Input, Button, Checkbox } from 'antd'
import {Blockchain, Block, Transaction} from '../utils/blockchain'
import Link from 'next/link'
import { useEffect } from 'react'
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myWalletAddress = '04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863'
const myKey = ec.keyFromPrivate('1be1c091f5f3aa4cb6cb6bfa4cfe6308ec39b38be734c42ace77f806dbfdb055')
let tx: any

const NewTransaction = () => {

    useEffect(() => {
        console.log('myCoin', window.myCoin)
    }, [])

	const onFinish = (values: any) => {
        tx = new Transaction(myWalletAddress, values.receiver, values.amount)
        tx.signTransaction(myKey)
        window.myCoin.addTransaction(tx)

        console.log('mycoin',window.myCoin)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<div>
			<h1>New Transaction</h1>
         <Link href='/'>Home</Link>

			<Form
				name='basic'
				// labelCol={{ span: 8 }}
				// wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='My Wallet Address'
					name='myaddress'
					rules={[
						{
							
						},
					]}
				>
					<Input disabled defaultValue={myWalletAddress}/>
				</Form.Item>

				<Form.Item
					label='Receiver Address'
					name='receiver'
					rules={[
						{
							required: true,
							message: 'Please input address of receiver!',
						},
					]}
				>
					<Input />
				</Form.Item>

                <Form.Item
					label='Amount'
					name='amount'
					rules={[
						{
							required: true,
							message: 'Please input amount in numbers!',
						},
					]}
				>
					<Input type='number' />
				</Form.Item>
				

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Create Transaction
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default NewTransaction
