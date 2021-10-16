import React, { Children, useState } from 'react'
import Link from 'next/link'
import { Layout, Menu, Button } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	EuroCircleOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
} from '@ant-design/icons'
import SiderDashboard from './sider/dashboard-sider'
import styled from 'styled-components'

const { Header, Sider, Content } = Layout

export default function Dashboard({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)

	const toggle = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<SiderDashboard toggle={toggle} collapsed={collapsed} />
			<Layout className='site-layout'>
				<HeaderStyled className="site-layout-background" style={{ padding: 0 }}>
					{collapsed ? (
						<Button
							style={{ margin: '0 10px 10px 10px' }}
							className='trigger'
							onClick={toggle}
						>
							<MenuUnfoldOutlined />
						</Button>
					) : (
						<Button
							style={{ margin: '0 10px 10px 10px' }}
							className='trigger'
							onClick={toggle}
						>
							<MenuFoldOutlined />
						</Button>
					)}
					<p className='logo-style'><EuroCircleOutlined />&nbsp;Bui Coin</p>
				</HeaderStyled>
				<Content>{children}</Content>
			</Layout>
		</Layout>
	)
}

const HeaderStyled = styled(Header)`
	&.ant-layout-header {
		background: #FFFFFF !important;
		height: 50px !important;
		line-height: 50px !important;
	}
`
