import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
	UserOutlined,
	BlockOutlined,
	TransactionOutlined,
	GoldOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
const { Sider } = Layout

interface SiderProps {
	collapsed: boolean
	toggle: () => void
}

const SiderDashboard: React.FC<SiderProps> = ({ toggle, collapsed }) => {
	const [selectedKey, setSelectedKey] = useState('/')

	useEffect(() => {
		setSelectedKey(window.location.pathname)
	})

	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			collapsedWidth={50}
			width={180}
		>
			<div className='logo' />
			<Menu
				mode='inline'
				defaultSelectedKeys={['1']}
				selectedKeys={[selectedKey]}
			>
				<Menu.Item key='/' icon={<BlockOutlined />}>
					<Link href='/'>Blocks on Chain</Link>
				</Menu.Item>
				<Menu.Item
					key='/new-transaction'
					icon={<TransactionOutlined />}
				>
					<Link href='/new-transaction'>New Transaction</Link>
				</Menu.Item>
				<Menu.Item key='/mine' icon={<GoldOutlined />}>
					<Link href='/mine'>Pending</Link>
				</Menu.Item>
				<Menu.Item key='/settings' icon={<SettingOutlined />}>
					<Link href='/settings'>Settings</Link>
				</Menu.Item>
				<Menu.Item key='/my-wallet' icon={<UserOutlined />}>
					<Link href='/my-wallet'>My Wallet</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SiderDashboard
