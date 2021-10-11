// domain.com/new-transaction
import { Form, Input, Button, Checkbox } from 'antd'
import { Blockchain, Block, Transaction } from '../utils/blockchain'
import Link from 'next/link'
import { useEffect } from 'react'
import { GlobalProvider, useBlockchain } from '../context/global-context'

const NewTransaction = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		console.log('run effect')
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])

	const onFinish = (transaction: any) => {
		dispatch({ type: 'add_transaction', transaction })
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
					rules={[{}]}
				>
					<Input disabled defaultValue={myWalletAddress} />
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
			<Button
				onClick={() => {dispatch({type: 'mine_block'})}}
			>
				Mine
			</Button>
		</div>
	)
}

export default NewTransaction
