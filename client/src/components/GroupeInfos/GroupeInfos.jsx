/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant GroupeInfo : Affiche les informations générales d'un groupe de discution
*/

import React, { useState, useContext } from 'react'
import { useSelector } from "react-redux"
import styled from 'styled-components'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import Popup from '../Popup/Popup.jsx'
import EventWindow from '../EventWindow/EventWindow.jsx'
import InvitFollowerWindow from '../InvitFollowerWindow/InvitFollowerWindow.jsx'
import axios from "axios"

// css
const StyleGroupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite })` : colors.backgroundDark)};
`
const StyleTitleGroupe = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
	font-size: 1.5em;
`
const StyleBanner = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight  })` : colors.backgroundDark)};
`
const StyleInfo = styled.div`
	width: 30%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 5px;
	color: grey;
`
const StyleRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`
const StyleBold = styled.p`
	font-weight : bold;
	margin-right: 5px;
`

// Composant
const GroupeInfos = (props) => {
	const { theme } = useContext(ThemeContext)
	const userId = useSelector(state => state.user.id)
	const {id, title, pseudo, description, image, members, createDate } = props
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
  	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
	const [showEventWindow, setShowEventWindow] = useState(false) // fenetre des évènements
	const [showInvitWindow, setShowInvitWindow] = useState(false) // fenetre d'invitation

	// Quitter le groupe
	const handleSupGroupe = async () => {
		// Requete de demande d'ajout au groupe de discution vers app-social-network
		try{
			await axios.post(`http://${window.location.hostname}:8080/supGroup/${id}`)
			setFetchError(false)
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
	}

	const handleEventGroupe = () => {
		setShowEventWindow(true)
	}
	const handleInvitGroupe = () => {
		setShowInvitWindow(true)
	}
	
	return (
		<StyleGroupContainer theme={theme}>
			<StyleTitleGroupe>
				{title}
			</StyleTitleGroupe>

			<StyleBanner theme={theme}>
				{image ? (
					<DisplayImage
						id={"groupImage-" + id}
						src={`http://${window.location.hostname}:4000/download/${image}`}
						alt={"Image " + title}
						disabled={false}
						size={300}
					/>) : <></>}

				<StyleInfo>
					<StyleBold>A propos:</StyleBold>
					<StyleRow>{description}</StyleRow>
					<StyleRow><StyleBold>Admin:</StyleBold> {pseudo}</StyleRow>
					<StyleRow><StyleBold>Date de création:</StyleBold>{FrenchFormatDateConvert(createDate)}</StyleRow>
					<StyleRow><StyleBold>Nombre de membres:</StyleBold> {members.length}</StyleRow>
				</StyleInfo>
			</StyleBanner>

			<>
				{ members.includes(userId) && (
					<StyleRow>
						{ userId && (
							<>
								<Button 
									text="Quitter le groupe" 
									disabled={false} 
									onClick={handleSupGroupe}
								/> 
								<Button 
									text="Evenements" 
									disabled={false} 
									onClick={handleEventGroupe}
								/>
								<Button 
									text="Inviter" 
									disabled={false} 
									onClick={handleInvitGroupe}
								/> 
							</>
						)}

						{showEventWindow && (
							<EventWindow
								groupId={id}
								onClose={() => {setShowEventWindow(false)}}
							/>
						)}

						{showInvitWindow && (
							<InvitFollowerWindow
								groupId={id}
								onClose={() => {setShowInvitWindow(false)}}
							/>
						)}
					</StyleRow>
				)}
			</>
			{ fetchError && notification && (
				<Popup texte={notification} type='error' />
			)}
		</StyleGroupContainer>
	)
}

export default GroupeInfos