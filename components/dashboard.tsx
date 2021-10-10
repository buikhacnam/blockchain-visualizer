import React, { Children, useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons'
import SiderDashboard from './sider/dashboard-sider'

const { Header, Sider, Content } = Layout

export default function Dashboard({children}: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)

	const toggle = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout>
			<SiderDashboard toggle={toggle} collapsed={collapsed} />
			<Layout className='site-layout'>
				<Header
					className='site-layout-background'
					style={{ padding: 0 }}
				>
					{collapsed ? (
						<button className='trigger' onClick={toggle}>
							open
						</button>
					) : (
						<button className='trigger' onClick={toggle}>
							close
						</button>
					)}
				</Header>
				<Content>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}
