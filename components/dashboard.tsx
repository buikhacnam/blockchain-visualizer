import React, { useState } from 'react'
import { Layout, Button } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	EuroCircleOutlined,
} from '@ant-design/icons'
import SiderDashboard from './sider/dashboard-sider'
import styled from 'styled-components'

const { Header, Content } = Layout

export default function Dashboard({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)

	const toggle = () => {
		setCollapsed(!collapsed)
	}

	return (
		<Layout>
			<SiderDashboard toggle={toggle} collapsed={collapsed} />
			<Layout className='site-layout'>
				<HeaderStyled
					className='site-layout-background'
					style={{ padding: 0 }}
				>
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
					<p className='logo-style'>
						<EuroCircleOutlined style={{ color: '#d3af37' }} />
						&nbsp;Bui Coin
					</p>
				</HeaderStyled>
				<Content style={{ height: '100%' }}>{children}</Content>
			</Layout>
		</Layout>
	)
}

const HeaderStyled = styled(Header)`
	&.ant-layout-header {
		background: #ffffff !important;
		height: 50px !important;
		line-height: 50px !important;
	}
`
