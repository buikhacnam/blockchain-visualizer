import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Divider, message } from 'antd'
import { useBlockchain } from '../context/global-context'
import { Blockchain } from '../utils/blockchain'

const { Option } = Select
message.config({
	maxCount: 1,
})
const SettingsPage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()
	const [settings, setSettings] = useState({
		difficulty: state.blockchainState?.difficulty,
		miningReward: state.blockchainState?.miningReward,
	})

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain' })
	}, [])

	const onFinish = () => {
		dispatch({
			type: 'change_settings',
			difficulty: settings.difficulty,
			miningReward: settings.miningReward,
		})

		message.success('settings saved')
	}
	return (
		<div className='page-wrapper'>
			<h1>Settings</h1>
			<p>Set up the amount of mining rewards and difficulty levels</p>
			<Divider />
			<Form onFinish={onFinish} layout='vertical'>
				<Form.Item
					name='miningReward'
					label='Mining Reward / Difficulty'
				>
					<Input
						value={settings.miningReward}
						type='number'
						onChange={e => {
							setSettings({
								...settings,
								miningReward: Number(e.target.value),
							})
						}}
						style={{
							width: 200,
						}}
					/>
					<Select
						value={settings.difficulty}
						style={{
							width: 200,
							marginTop: 5,
						}}
						onChange={value => {
							setSettings({ ...settings, difficulty: value })
						}}
					>
						<Option value={1}>Difficulty - Level 1</Option>
						<Option value={2}>Difficulty - Level 2</Option>
						<Option value={3}>Difficulty - Level 3</Option>
						<Option value={4}>Difficulty - Level 4</Option>
						<Option value={5}>Difficulty - Level 5</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' onClick={onFinish}>
						Save
					</Button>
				</Form.Item>
			</Form>
			<Divider />
			<span>* Difficulty - Level 5 may crash your old computer :))</span>
		</div>
	)
}

export default SettingsPage
