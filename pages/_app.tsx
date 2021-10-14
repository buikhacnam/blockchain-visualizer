import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import { GlobalProvider } from '../context/global-context'
import Dashboard from '../components/dashboard'
import WelcomeAlert from '../components/welcome-alert'
declare global {
	interface Window {
		buiCoin: any
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GlobalProvider>
			<Dashboard>
				<WelcomeAlert />
				<Component {...pageProps} />
			</Dashboard>
		</GlobalProvider>
	)
}
export default MyApp
