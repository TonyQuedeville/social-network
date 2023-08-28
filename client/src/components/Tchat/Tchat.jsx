/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Tchat : Affiche la page tchat
	Page Tchat : Route http://localhost:3000/tchat
*/

import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import DisplayMessage from '../DisplayMessage/DisplayMessage.jsx'
import SendMessage from '../SendMessage/SendMessage.jsx'
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant.jsx'
import { io } from "socket.io-client" // npm install socket.io-client

const TchatContainer = styled.div`
	width: ${props => props.larg}%;
	min-height: 88vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const StyleConvList = styled.div`
	width:97%;
	max-width: 500px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`
const MessagesContainer = styled.div`
	height: 95%;	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: end;
	//background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const StyleMessages = styled.div`
	width:97%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	align-items: ${props => (props.align ? 'start' : 'end')};
`

// Composant
const Tchat = (props) => {
	const { convId, larg , type } = props
	const { theme } = useContext(ThemeContext)

	// AuthUser
	const user = useSelector(state => state.user)

	// Champs Conversations
	const [conversationsData, setConversationsData] = useState(undefined)
	const socket = io('http://localhost:3001');
	
	useEffect(() => {
		console.log("tentative de connexion au server tchat !")
		
		socket.on("connect", () => {
			console.log("Connexion au tchat établie !")
			if(user.isAuthenticated) setConnected(socket.connected)
		});

		socket.on("disconnect", () => {
			console.log("déconnexion au tchat !")
			if(user.isAuthenticated) setConnected(socket.connected)
		});

		socket.on("connect_error", (error) => {
			console.error("Erreur de connexion Socket.io :", error)
		});

		socket.on("message", (data) => {
			console.log("Message reçu du serveur tchat:", data)
		});

		// Émettre un message vers le serveur
		socket.emit("chatMessage", "Hello, server!")
	}, [])


	useEffect(() => {
		if (type === "private") {
			console.log(("private"));
			// await requete prive
			// setConversationsData(res.data)
		} else { 
			console.log("group");
			// await requete group
			// setDataMessages(res.data)
		}
	}, [type])

	// Champs Messages
	const [dataMessages, setDataMessages] = useState(undefined)
	const [ connected, setConnected ] = useState(false)

    // Mise à jour de la liste de conversations à chaque changement de selection de conversation
    const handleChargeConversations = (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value
			console.log("send message:", value);

			// await requete conversation privée
			// setDataMessages(res.data)

            // setConversationsData(prev => ({
			// 	...prev,
            //     [e.target.name]: value
            // }))
        }
    }

	//console.log("conversationsData:", conversationsData)

	// Connexion Tchat
    


	return (
		<TchatContainer theme={theme} larg={larg}>
			{connected && (
				<>
					<StyleConvList theme={theme}>
						Conversation 
						{type === "private" && (
							<MenuDeroulant
								name="id" 
								disabled={false} 
								onChange={(e) => {
									handleChargeConversations(e)}}
								theme={theme}
								options={[
									{id: 1, type: 'private', isConnected: true, name: "Tata"}, 
									{id: 2, type: 'private', isConnected: true, name: "Tutu"}, 
									{id: 3, type: 'private', isConnected: false, name: "Alannnn"},
								]}
							/>
						)}
					</StyleConvList>
					<MessagesContainer>
						{/* {dataMessages.datas.map((dataMessage, index) => (
						))} */}
						<StyleMessages align={'Toto' === user.pseudo}>
							<DisplayMessage
								convId={convId}
								pseudo={'Toto' === user.pseudo ? 'moi' : 'pseudo'}
								message={"Message de test en attendant d'avoir le server"}
								dateheure={'25-08-2023 10:44:00'}
							/>
						</StyleMessages>

						<SendMessage convId={convId}/>
					</MessagesContainer>
				</>
			)}
		</TchatContainer>
	)
}

Tchat.defaultProps = {
	convId: 0,
}

Tchat.propTypes = {
	convId: PropTypes.number,
}

export default Tchat