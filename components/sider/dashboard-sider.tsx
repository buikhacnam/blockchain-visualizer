import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	UserOutlined,
	BlockOutlined,
	TransactionOutlined,
	GoldOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
const { Header, Sider, Content } = Layout

export default function SiderDashboard({ toggle, collapsed }: any) {
	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			collapsedWidth={50}
			width={180}
			
		>
			<div className='logo' />
			<Menu mode='inline' defaultSelectedKeys={['1']}>
				<Menu.Item key='1' icon={<BlockOutlined />}>
					<Link href='/'>Blocks in Chain</Link>
				</Menu.Item>
				<Menu.Item key='2' icon={<TransactionOutlined />}>
					<Link href='/new-transaction'>New Transaction</Link>
				</Menu.Item>
				<Menu.Item key='3' icon={<GoldOutlined />}>
					<Link href='/mine'>Pending</Link>
				</Menu.Item>
				<Menu.Item key='4' icon={<SettingOutlined />}>
					<Link href='/settings'>Settings</Link>
				</Menu.Item>
				<Menu.Item key='5' icon={<UserOutlined />}>
					<Link href='/my-wallet'>My Wallet</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
