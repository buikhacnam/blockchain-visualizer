import { Tag } from 'antd'

export const myWalletAddress =
	'04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863'
export const columns = [
	{
		title: 'From',
		dataIndex: 'fromAddress',
		key: 'from',
		render: (text: string) => {
			if (!text) return <span>System</span>

			return (
				<span title={text}>
					<a>
						{text?.length > 15
							? text?.substring(0, 15) + '...'
							: text}
					</a>
					<br />
					{text === myWalletAddress ? (
						<Tag style={{ display: 'inline-block' }} color='green'>
							My Wallet
						</Tag>
					) : null}
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
				<span title={text}>
					<a>
						{text?.length > 15
							? text?.substring(0, 15) + '...'
							: text}
					</a>
					<br />
					{text === myWalletAddress ? (
						<Tag style={{ display: 'inline-block' }} color='green'>
							My Wallet
						</Tag>
					) : null}
				</span>
			)
		},
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		render: (text: string) => <span>{text}</span>,
	},
	{
		title: 'Timestamp',
		dataIndex: 'timestamp',
		key: 'timestamp',
		render: (text: string) => <span>{text}</span>,
	},
]
