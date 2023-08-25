/*
	Projet Zone01 : Social network
	Tony Quedeville 
	24/08/2023
	Composant DisplayMessage : Affiche un message reçu du tchat
*/

import React, { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

// css
const StyleMessage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	margin: 5px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
`
const StyleInfoMessage = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 5px;
	font-style: italic;
	font-size: 0.8em;
	color: grey;
`

// Composant
const DisplayMessage = (props) => {
    const { pseudo, dateheure, message } = props
    const { theme } = useContext(ThemeContext)

    return (
        <StyleMessage theme={theme}>
			<StyleInfoMessage>
				<div>{pseudo}</div>
				<div>{FrenchFormatDateConvert(dateheure)}</div>
			</StyleInfoMessage>
			<>
				{ message }
			</>
        </StyleMessage>
    )
}

export default DisplayMessage