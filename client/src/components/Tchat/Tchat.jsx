import React from 'react'
//import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'

const TchatContainer = styled.div`
	width: ${props => props.larg}%;
	min-height: 88vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1px;
	border: solid 1px;
	border-radius: 10px;
`
	
const Tchat = (props) => {
	const { larg } = props
	//const { theme } = useContext(ThemeContext)

		//border-color: ${props => (props.theme === 'light' ? 'black' : 'white')};

		//<TchatContainer theme={theme}>Tchat</TchatContainer>
	return (
		<TchatContainer larg={larg}>Tchat</TchatContainer>
	)
}

Tchat.defaultProps = {
	larg: null,
}

Tchat.propTypes = {
larg: PropTypes.number,
}

export default Tchat