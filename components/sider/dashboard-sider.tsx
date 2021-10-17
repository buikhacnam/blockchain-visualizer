import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
const { Header, Sider, Content } = Layout

export default function SiderDashboard({toggle, collapsed}: any) {

	return (
		<Sider trigger={null} collapsible collapsed={collapsed}>
			<div className='logo' />
			<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
				<Menu.Item key='1' icon={<UserOutlined />}>
					<Link href='/'>Blocks in Chain</Link>
				</Menu.Item>
				<Menu.Item key='2' icon={<VideoCameraOutlined />}>
					<Link href='/new-transaction'>New Transaction</Link>
				</Menu.Item>
				<Menu.Item key='3' icon={<UploadOutlined />}>
					<Link href='/mine'>Pending Transactions</Link>
				</Menu.Item>
				<Menu.Item key='4' icon={<UploadOutlined />}>
					<Link href='/settings'>Settings</Link>
				</Menu.Item>
				<Menu.Item key='5' icon={<UploadOutlined />}>
					<Link href='/my-wallet'>My Wallet</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}
