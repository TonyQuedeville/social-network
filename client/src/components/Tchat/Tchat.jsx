/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Tchat : Affiche la page tchat
	Page Tchat : Route http://localhost:3000/tchat
	lien utile: https://socket.io/fr/how-to/use-with-react
*/

import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import { socket } from '../../socket';
import DisplayMessage from '../DisplayMessage/DisplayMessage.jsx'
import SendMessage from '../SendMessage/SendMessage.jsx'
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant.jsx'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

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
	const { larg , type, roomGroupName } = props
	const { theme } = useContext(ThemeContext)

	// AuthUser
	const user = useSelector(state => state.user)

<<<<<<< HEAD
	// Utilisateurs connectés
	const [userListConnect, setUserListConnect] = useState([])
=======
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 09e5ed5 (app-tchat)
=======
>>>>>>> 552cd9c (app-tchat)
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ec54656 (app-tchat)
=======
>>>>>>> 09e5ed5 (app-tchat)
=======
=======
>>>>>>> cb65160 (app-tchat)
>>>>>>> 552cd9c (app-tchat)

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
>>>>>>> 25aae91 (app-tchat)

	// Champs Messages
	const [dataMessages, setDataMessages] = useState([])

	// Champs Conversations

	const [destinataire , setDestinataire] = useState('')

	// Liste des user.followed
	const [ufolList, setUfolList] = useState(user.followed ? 
		user.followed.map((ufol) => {
			const connected = userListConnect.includes(ufol.pseudo) ? 1 : 0;
			return {
				id: ufol.id,
				type: 'private',
				isConnected: connected,
				name: ufol.pseudo
			};
		}
	) : []);

	// Construction du composant
	// Communications server
	useEffect(() => {
		// Réception de la liste des utilisateurs connectés du serveur
		socket.on('connectedUsersList', (userList) => {
			setUserListConnect(userList)
		})

		// Reception des messages
		socket.on('message', (dataMessage) => {
			setDataMessages(previous => [...previous, dataMessage])
		})
	}, [])

	useEffect(() => {
		if(user.followed){
			setUfolList(
				user.followed.map((ufol) => {
					const connected = userListConnect.includes(ufol.pseudo) ? 1 : 0
					return {
						id: ufol.id,
						type: 'private',
						isConnected: connected,
						name: ufol.pseudo
					}
				})
			)
		}
	},[userListConnect, user])

	// Rejoindre la conversation de groupe de discution
	useEffect(() => {
		if (!roomGroupName) {
			socket.emit('quitRoom', {user: user.pseudo}); // quitter la conversation active
		} else { 
			socket.emit('joinRoom', {roomName: roomGroupName, user: user.pseudo})
			setDestinataire(roomGroupName)
		}
	}, [roomGroupName, user])

	// Rejoindre la conversation
    const handleChangeConversations = (e) => {
		if (e && e.target && e.target.name) { 
			setDestinataire(e.target.value)
			// Remise à jour de la liste de conversations à chaque changement de selection de conversation
			setDataMessages([])
        }
    }

	// Notifications des évènements de tchat
	const [notif, setNotif] = useState()

	// Connexion Tchat
    


	// Render
	return (
		<TchatContainer theme={theme} larg={larg}>
			{socket.connect() && (
				<>
					<StyleConvList theme={theme}>
						Conversation 
						{type === "private" && (
							<MenuDeroulant
								name="id" 
								disabled={false} 
								onChange={(e) => {handleChangeConversations(e)}}
								theme={theme}
								options={ufolList}
							/>
						)}
					</StyleConvList>
					<MessagesContainer>
						{dataMessages.map((dataMessage, index) => (
							<StyleMessages key={index} align={dataMessage.user_pseudo === user.pseudo}>
								<DisplayMessage
									pseudo={dataMessage.user_pseudo === user.pseudo ? 'moi' : dataMessage.user_pseudo}
									message={dataMessage.message}
									dateheure={dataMessage.dateheure}
								/>
							</StyleMessages>
						))}
						<SendMessage destinataire={destinataire} type={type}/>
					</MessagesContainer>
				</>
			)}
		</TchatContainer>
	)
}

export default Tchat
