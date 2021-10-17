import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Divider } from 'antd'
import { useBlockchain } from '../context/global-context'
import { Blockchain } from '../utils/blockchain'

const { Option } = Select
const SettingsPage = () => {
	const { state, dispatch, myWalletAddress } = useBlockchain()
	const [settings, setSettings] = useState({
		difficulty: 2,
		miningReward: 100,
	})

	useEffect(() => {
		if (!window.buiCoin) {
			window.buiCoin = new Blockchain()
		}
		dispatch({ type: 'get_blockchain', blocks: window.buiCoin })
	}, [])

	const onFinish = () => {
		console.log('value', settings)
        dispatch({ type: 'change_difficulty', difficulty: settings.difficulty })
        dispatch({ type: 'change_mining_reward', miningReward: settings.miningReward })
	}
	return (
		<div className='page-wrapper'>
            <h1>Settings</h1>
            <p>Set up the amount of mining rewards and difficulty levels</p>
            <Divider />
			<Form layout='inline' onFinish={onFinish}>
				<Form.Item name='miningReward' label='Mining Reward'>
					<span>
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
								margin: '0 8px',
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
					</span>
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