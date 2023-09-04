/*
	Projet Zone01 : Social network
	Tony Quedeville 
	16/08/2023
	Composant Notifications : Fenêtre des notifications
*/

import React, { useContext } from 'react'
import { useSelector } from "react-redux"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import Notification from '../Notification/Notification.jsx'

// css
const StyleWindow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	position: absolute;
	top: 2%;
	left: 50%;
	//transform: translate(50%, -370%);
	width: 40%;
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
const Notifications = ({onClose}) => {
	// Contexte
	const { theme } = useContext(ThemeContext)
	const user = useSelector(state => state.user)
	//console.log(user);

	const handleClose = () => {
		onClose();
	}

	return (
    <StyleWindow theme={theme}>
			<StyleTitleGroupe>
				Notifications
			</StyleTitleGroupe>

			<StyleNotificationsContainer theme={theme}>
				{ user.waitFollowers && (
					<>
					{user.waitFollowers.map((waitFollower, index) => ( // Utilisateurs qui demande à me suivre
						<Notification
							key={index} 
							notif={waitFollower}
							typeNotif="waitFollowers"
							theme={theme}
						/>
					))}
					</>
				)}
					
				{ user.waitGroupsAccept && (
					<>
					{user.waitGroupsAccept.map((waitGroupAccept, index) => ( // Utilisateurs en attente d'acceptation des groupes dont je fait parti
						<Notification 
							key={index} 
							notif={waitGroupAccept} 
							typeNotif="waitGroupsAccept" 
							theme={theme}
						/>
					))}
					</>
				)}

				{ user.invit_groups && (
					<>
					{user.invit_groups.map((invitGroup, index) => ( // Utilisateurs invité dans les groupes
						<Notification 
							key={index} 
							notif={invitGroup}
							typeNotif="invitGroups"  
							theme={theme}
						/>
					))}
					</>
				)}

				{ user.events && (
					<>
					{user.events.map((event, index) => ( // Nouveaux évènements de groupe
						<Notification 
							key={index} 
							notif={event} 
							typeNotif="events" 
							theme={theme}
						/>
					))}
					</>
				)}

				{/* { tchatEvents && (
					<>
					{tchatEvents.map((tchatEvent, index) => ( // Nouveaux évènements de tchat
						<Notification 
							key={index} 
							notif={tchatEvent} 
							typeNotif="tchatEvent" 
							theme={theme}
						/>
					))}
					</>
				)} */}
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