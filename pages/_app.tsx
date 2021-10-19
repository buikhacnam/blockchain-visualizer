import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { GlobalProvider } from '../context/global-context'
import Dashboard from '../components/dashboard'
import WelcomeAlert from '../components/welcome-alert'
import { useEffect } from 'react'
import Head from 'next/head'

declare global {
	interface Window {
		buiCoin: any
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	const handler = (e: any) => {
		e.preventDefault()
		e.returnValue = true
	}
	useEffect(() => {
		window.addEventListener('beforeunload', handler)
		return () => window.removeEventListener('beforeunload', handler)
	}, [])
	return (
		<GlobalProvider>
			<Head>
				<title>Bui Coin - Blockchain Demo</title>
				<meta
					name='description'
					content='Bui Coin is a platform for learning the fundamental of blockchain'
				/>
			</Head>
			<Dashboard>
				<WelcomeAlert />
				<Component {...pageProps} />
			</Dashboard>
		</GlobalProvider>
	)
}
export default MyApp
