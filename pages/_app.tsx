import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import {GlobalProvider} from '../context/global-context'
import {useEffect} from 'react'
declare global {
	interface Window {
		buiCoin: any
	}
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    
  }, [])
  return <GlobalProvider><Component {...pageProps} /></GlobalProvider>
}
export default MyApp
