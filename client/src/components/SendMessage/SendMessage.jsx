/*
	Projet Zone01 : Social network
	Tony Quedeville 
	24/08/2023
	Composant SendMessage : Affiche une fenetre d'édition et envoi du message tchat
*/

import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import TextArea from '../TextArea/TextArea.jsx'
import Icone from '../Icone/Icone.jsx'
import Emoji from '../Emoji/Emoji.jsx'
import IcnSendMessage from '../../assets/icn/icn-send-message.webp'
import IcnEmoji from '../../assets/icn/icn-emoji.webp'
import { socket } from '../../socket';
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

// css
const StyleSendMessage = styled.div`
    width: 97%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`
const StyleMessage = styled.div`
    width: 97%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

// Composant
const SendMessage = (props) => {
    const { theme } = useContext(ThemeContext)

    // AuthUser
	const user = useSelector(state => state.user)

    // Champs du message
    const [messageData, setMessageData] = useState({
        destinataire: props.destinataire,
        type: props.type,
        user_id: user.id,
        user_pseudo: user.pseudo,
        message: '',
        dateheure: ''
    })

    // Pour ré-initialiser le message à chaque fois qu'une conversation est sélectionnée
    useEffect(() => {
        setMessageData({
            destinataire: props.destinataire,
            type: props.type,
            user_id: user.id,
            user_pseudo: user.pseudo,
            message: '',
            dateheure: ''
        })
    }, [props, user])

	// Mise à jour de messageData à chaque changement
    const handleChangeMessage = (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value

            switch(e.target.name) {
                default :
                    break
            }

            setMessageData(prev => ({
				...prev,
                [e.target.name]: value,
                dateheure: FrenchFormatDateConvert()
            }))
        }
    }

    // Emoji
    const [showEmojWindow, setShowEmojWindow] = useState(false)
	
    const handleEmojiClick = () => {
        setShowEmojWindow(true)
	}

    const handleSetEmoj = (selectedEmoj) => {
        setMessageData({
            ...messageData,
            message: `${messageData.message} ${selectedEmoj}`,
        })
    }

	const handleSendMessageClick = () => {
        setMessageData({
            ...messageData,
            destinataire: props.destinataire,
            type: props.type,
            user_id: user.id,
            user_pseudo: user.pseudo,
            message: '',
        })
        socket.emit('message', messageData, () => {})
	}

    return (
        <StyleSendMessage theme={theme}>
            <StyleMessage>
                <TextArea
                    id="tchat-message"
                    name="message"
                    label=""
                    title="message"
                    placeholder="c'est là qu'tu cause !"
                    rows={3}
                    cols={32}
                    value={messageData.message}
                    onChange={handleChangeMessage}
                />
                <Icone 
                    alt="Emoji"
                    image={IcnEmoji}
                    onClick={() => handleEmojiClick()}
                />
                <Icone 
                    alt="Envoyer"
                    image={IcnSendMessage}
                    disabled={messageData.message ? false : true}
                    onClick={() => handleSendMessageClick()}
                />
            </StyleMessage>

            {showEmojWindow && (
                <Emoji
                    onClose={() => {setShowEmojWindow(false)}}
                    onSelectEmoj={handleSetEmoj}
                />						
            )}
        </StyleSendMessage>
    )
}

export default SendMessage