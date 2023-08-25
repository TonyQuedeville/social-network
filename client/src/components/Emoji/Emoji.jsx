/*
	Projet Zone01 : Social network
	Tony Quedeville 
	25/08/2023
	Composant NewPost : Affiche une fenetre d'emoji
*/

import React, {useContext} from 'react'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import Button from '../Button/Button.jsx'
import EmojiPicker from 'emoji-picker-react' //https://www.npmjs.com/package/emoji-picker-react

// css
const StyleWindow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	position: absolute;
	top: 55%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 360px;
	height: 540px;
	padding: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 9999;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
	box-shadow: 10px 5px 25px 0px black;

	overflow: auto;
	overflow-x: hidden;
	scrollbar-width: none; /* Masque l'ascenseur Firefox */
	-ms-overflow-style: none; /* Masque l'ascenseur IE 10+ */
	&::-webkit-scrollbar {
	width: 0; /* Masque l'ascenseur Chrome, Safari et Opera */
}
`

// Composant
const Emoji = ({onClose, onSelectEmoj}) => {
    const { theme } = useContext(ThemeContext)

    const handleClose = () => {
		onClose()
	}

    const handleChangeEmoj = (e) => {
        onSelectEmoj(e.emoji)
    }

    return (
        <StyleWindow theme={theme}>
            <EmojiPicker 
                height={500} 
                onEmojiClick={handleChangeEmoj}
            />
            <Button 
                text="Fermer" 
                onClick={handleClose}
            />
        </StyleWindow>
    )
}

export default Emoji