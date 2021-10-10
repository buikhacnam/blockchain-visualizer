export const sample = {
	blockchainState: {
		chain: [
			{
				timestamp: '01/01/2018',
				transactions: 'Genesis block',
				previousHash: '0',
				hash:
					'290904ff16ed62e6f320de237b6ce639f5546d048ab328eddfcf8167b4a2fdfe',
				nonce: 0,
			},
			{
				timestamp: 1633866908343,
				transactions: [
					{
						fromAddress:
							'04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863',
						toAddress: 'klk',
						amount: '98',
						signature:
							'3045022100ac98d62af573768f7aaa62d551ac8c026539dc481f641baf6f6cdf449fda8af302200db9d121791dc7e305dc475c7bd1873053c5df70e714a3863e51c49c42201e40',
					},
					{
						fromAddress: null,
						toAddress:
							'04eac26a0bf07b189615a98788ac471aa6dda262b7fa5b80772347684e972d00eb11e9b53e46f4a664bc7490899e90a9e88aae559d228c4a650feca4294fe47863',
						amount: 100,
					},
				],
				previousHash:
					'290904ff16ed62e6f320de237b6ce639f5546d048ab328eddfcf8167b4a2fdfe',
				hash:
					'00e27705512356623d02c156293f6dc099064f6c01d6adf27b2086262ae1b1e3',
				nonce: 395,
			},
		],
		difficulty: 2,
		pendingTransactions: [],
		miningReward: 100,
	},
}
