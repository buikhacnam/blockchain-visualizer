import { Alert, Divider, Button } from 'antd'
import styled from 'styled-components'

const WelcomeAlert = () => {
	return (
		<AlertStyle
			message='Welcome to Bui Coin - Blockchain Demo'
			description={<AlertContent />}
			type='info'
			showIcon
			banner
		/>
	)
}

const AlertContent = () => {
	return (
		<>
			<span>
				You can definitely understand how Blockchain works under the
				hood by playing with this tool. So just go ahead and create
				transactions, mine blocks and adjust settings.
				<br /> Blockchain will not be that hard to understand anymore!
			</span>
			<Divider style={{ margin: '16px 0' }} />
			<span>
				About:{' '}
				<a
					rel='noreferrer'
					target='_blank'
					href='https://buinam.com/#section-projects'
				>
					Buinam.com
				</a>{' '}
				&nbsp; |&nbsp; Code Source:{' '}
				<a
					href='https://github.com/buikhacnam/blockchain-nextjs/tree/main'
					rel='noreferrer'
					target='_blank'
				>
					Github
				</a>
			</span>
		</>
	)
}

const AlertStyle = styled(Alert)``
export default WelcomeAlert
