import WalletDetails from '../../components/wallet-details/wallet-details'
import { useRouter } from 'next/router'

const WalletDetailsPage = () => {
    const router = useRouter()
    return <><WalletDetails address={router.query.walletAddress}/></>
}

export default WalletDetailsPage

// export async function getStaticPaths() {
//     const paths:any = []
//     const addresses = window.buiCoin.getAllAddresses()
//     addresses.forEach((add: any) => {
//         paths.push({
//             params: {
//                 address: add
//             }
//         })
//     })
//     return {
//         paths,
//         fallback: 'blocking'
//     }
// }