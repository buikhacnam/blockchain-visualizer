import { Table, Tag, Space } from 'antd'
import styled from 'styled-components'
import { useBlockchain } from '../../context/global-context'

const myWalletAddress =
	'04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863'
const columns = [
	{
		title: 'From',
		dataIndex: 'fromAddress',
		key: 'from',
		render: (text: string) => {
			if (!text) return <span>System</span>

			return (
				<span>
					<a>{text?.substring(0, 15) + '...'}</a><br/>
                    {text === myWalletAddress ? <Tag style={{display: 'inline-block'}} color="green">My Wallet</Tag> : null}
				</span>
			)
		},
	},
	{
		title: 'To',
		dataIndex: 'toAddress',
		key: 'to',
        render: (text: string) => {
			if (!text) return <span>System</span>

			return (
				<span>
					<a>{text?.substring(0, 15) + '...'}</a><br/>
                    {text === myWalletAddress ? <Tag style={{display: 'inline-block'}} color="green">My Wallet</Tag> : null}
				</span>
			)
		},
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
	},
	// {
	// 	title: 'Timestamp',
	// 	dataIndex: 'timestamp',
	// 	key: 'timestamp',
	// },
	// {
	//     title: 'Signature',
	//     dataIndex: 'signature',
	//     key: 'signature',
	// }
	// {
	// 	title: 'Status',
	// 	key: 'tags',
	// 	dataIndex: 'tags',
	// 	render: (tags: any) => (
	// 		<>
	// 			{tags.map((tag: any) => {
	// 				let color = 'green'
	// 				return (
	// 					<Tag color={color} key={tag}>
	// 						{tag.toUpperCase()}
	// 					</Tag>
	// 				)
	// 			})}
	// 		</>
	// 	),
	// },
]

const data = [
	{
		key: '1',
		from: '0040fb40d14cc3aa01f...',
		amount: 32,
		to: 'New York No. 1 Lake Park',
		tags: ['valid'],
		timestamp: '2020-01-01',
	},
	{
		key: '2',
		from: '0040fb40d14cc3aa01f...',
		amount: 42,
		to: 'London No. 1 Lake Park',
		tags: ['valid'],
		timestamp: '2020-01-01',
	},
	{
		key: '3',
		from: '0040fb40d14cc3aa01f...',
		amount: 32,
		to: 'Sidney No. 1 Lake Park',
		tags: ['valid'],
		timestamp: '2020-01-01',
	},
]
const TransactionTable = ({ timestamp }: any) => {
	const { state, myWalletAddress } = useBlockchain()
	const blockSource = state.blockchainState.chain.find(
		(block: any) => block.timestamp === timestamp
	)
	const transactionSource = blockSource.transactions
	console.log('src', transactionSource)
	return (
		<TableStyled>
			<Table columns={columns} dataSource={transactionSource} />
		</TableStyled>
	)
}

export default TransactionTable

const TableStyled = styled.div`
	width: 100%;
`
