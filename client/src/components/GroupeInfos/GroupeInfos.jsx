/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant GroupeInfo : Affiche les informations générales d'un groupe de discution
*/

import React, { useState, useContext } from 'react'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import styled from 'styled-components'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnNotification from '../../assets/icn/icn-notification.png'
import Button from '../Button/Button.jsx'
import Popup from '../Popup/Popup.jsx'
import axios from "axios"

// css
const StyleGroupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
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
	border-radius: 10px;
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
	display: flex;
	flex-direction: row;
	align-items: center;
`
const StyleBold = styled.p`
	font-weight : bold;
	margin-right: 5px;
`

// Composant
const GroupeInfos = (props) => {
	const { authId } = useContext(AuthContext)
	const {groupId, title, pseudo, description, image, members, createDate } = props
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
  	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

	// Quitter le groupe
	const handleSupGroupe = async () => {
		// Requete de demande d'ajout au groupe de discution vers app-social-network
		try{
			await axios.post(`http://${window.location.hostname}:8080/supGroup/${groupId}`)
			setFetchError(false)
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
	}
	
	return (
		<StyleGroupContainer>
			<StyleTitleGroupe>
				{title}
			</StyleTitleGroupe>

			<StyleBanner>
				{image ? (
					<DisplayImage
						id={"groupImage-" + groupId}
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
				{ members.includes(groupId) ? (
					<StyleRow>
						<Icone 
							alt="Demande d'adhésion à ce groupe en cours acception !" 
							image={IcnNotification}
							size={0.5}
						/>
						<p>Demande d'adhésion à ce groupe en cours acception !</p>
					</StyleRow>
					) : 
					<>
						{ authId && (
							<Button 
								text="Quitter le groupe" 
								disabled={false} 
								onClick={handleSupGroupe}
							/> 
						)}
					</>
				}
			</>
			{ fetchError && notification && (
				<Popup texte={notification} type='error' />
			)}
		</StyleGroupContainer>
	)
}

export default GroupeInfos