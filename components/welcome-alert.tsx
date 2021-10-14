import { Alert, Divider, Button } from 'antd'
import styled from 'styled-components'

const WelcomeAlert = () => {
	return (
		<AlertStyle
			message='Welcome to Blockchain Demo'
			description={<AlertContent />}
			type='info'
			showIcon
			banner
		/>
	)
}

const AlertContent = () => {
    return <>
        <span>You can definitely understand how Blockchain works under the hood by playing with this tool. So just go ahead and create transactions, mine blocks and adjust settings.<br /> You will figure things out!</span>
        <Divider style={{margin: '10px 0'}}/>
        <span style={{float: 'right'}}>Code Source: <a rel="noreferrer" target='_blank' href='https://buinam.com/#section-projects'>buinam.com</a></span>
    </>
}

const AlertStyle = styled(Alert)`
`
export default WelcomeAlert
