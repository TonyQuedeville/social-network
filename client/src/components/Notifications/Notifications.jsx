/*
	Projet Zone01 : Social network
	Tony Quedeville 
	16/08/2023
	Composant Notifications : Fenêtre des notifications
*/

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { Loader } from '../../utils/Atom.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import Notification from '../Notification/Notification.jsx'
import Popup from '../Popup/Popup.jsx'
import NewEvent from '../NewEvent/NewEvent.jsx'
import Event from '../Event/Event.jsx'

// css
const StyleWindow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	position: absolute;
	top: 2%;
	left: 65%;
	//transform: translate(50%, -370%);
	width: 30%;
	max-height: 80%;
	padding: 20px;
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
const StyleNotificationsContainer = styled.div`
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const StyleTitleGroupe = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
	font-size: 1.5em;
`
const StyleGroupButton = styled.div `
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`

// Composant
const Notifications = ({groupId, onClose}) => {
	// Contexte
  const { theme } = useContext(ThemeContext)
	const [notifications, setNotifications] = useState([])
	const { waitFollowers, waitGroups, invitGroups, events } = useContext(AuthContext) // Utilisateur connecté
  console.log("waitFollowers:", waitFollowers);
  console.log("waitGroups:", waitGroups);
  console.log("invitGroups:", invitGroups);
  console.log("events:", events);

	const handleClose = () => {
		onClose();
	}

	return (
    <StyleWindow theme={theme}>
			<StyleTitleGroupe>
        Notifications
			</StyleTitleGroupe>

			<StyleNotificationsContainer theme={theme}>
        {/* {waitFollowers.map((waitFollower, index) => (
          <Notification 
            key={index} 
            notif={waitFollower} 
            theme={theme}
          />
        ))} */}
				{waitGroups.map((waitGroup, index) => (
          <Notification 
            key={index} 
            notif={waitGroup} 
            theme={theme}
          />
        ))}
				{invitGroups.map((invitGroup, index) => (
          <Notification 
            key={index} 
            notif={invitGroup} 
            theme={theme}
          />
        ))}
				{/*events.map((event, index) => (
          <Notification 
            key={index} 
            notif={event} 
            theme={theme}
          />
        ))*/}
      </StyleNotificationsContainer>

			<StyleGroupButton>
				<Button 
					text="Fermer" 
					onClick={handleClose}
				/>
			</StyleGroupButton>
		</StyleWindow>
  )
}

export default Notifications