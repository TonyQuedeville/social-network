/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Tchat : Affiche la page tchat
	Page Tchat : Route http://localhost:3000/tchat
*/

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'

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
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
	
const Tchat = (props) => {
	const { larg } = props
	const { theme } = useContext(ThemeContext)

		//border-color: ${props => (props.theme === 'light' ? 'black' : 'white')};

		//<TchatContainer theme={theme}>Tchat</TchatContainer>
	return (
		<TchatContainer larg={larg} theme={theme}>Tchat</TchatContainer>
	)
}

Tchat.defaultProps = {
	larg: null,
}

Tchat.propTypes = {
larg: PropTypes.number,
}

export default Tchat