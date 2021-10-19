import { Form, Input, Button, Divider, message } from 'antd'
import { Blockchain } from '../utils/blockchain'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useBlockchain } from '../context/global-context'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

message.config({
	duration: 7
})
const NewTransactionPage: NextPage = () => {
	const router = useRouter()
	const [form] = Form.useForm()
	const {  dispatch, myWalletAddress } = useBlockchain()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain' })
	}, [])

	const onFinish = (transaction: any) => {
		setLoading(true)

		setTimeout(() => {
			dispatch({ type: 'add_transaction', transaction })
			form.resetFields()
			setLoading(false)
			message.success(
				'Transaction has been created successfully! Let\'s wait for the block to be mined'
			)
			router.push('/mine')
		}, 2500)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<NewTransactionWrapper className='page-wrapper'>
			<h1>Create Transaction</h1>
			<p>Transfer money to others</p>
			<Divider />
			<Form
				form={form}
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				layout='vertical'
				style={{
					marginTop: '20px',
					backgroundColor: '#fff',
					padding: '20px',
				}}
			>
				<Form.Item
					label='My Wallet Address'
					name='myaddress'
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

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						style={{ marginTop: '10px' }}
						loading={loading}
						disabled={loading}
					>
						Sign and Create Transaction
					</Button>
				</Form.Item>
			</Form>
			<Divider />
			<div style={{}}>
				<p>Let&apos;s go ahead and mine a block now!</p>
				<Link href='/mine' passHref>
					<Button>Start Mining</Button>
				</Link>
			</div>
		</NewTransactionWrapper>
	)
}

const NewTransactionWrapper = styled.div``
export default NewTransactionPage
