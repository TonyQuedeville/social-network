/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant GroupeInfo : Affiche les informations générales d'un groupe de discution
*/

import React, { useContext, useState } from 'react'
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
	const {groupId, title, admin, createDate, description, image, nbMembers } = props
	const { groupListRequested } = useContext(AuthContext)
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
						src={require(`../../assets/img/${image}`).default}
						alt={"Image " + title}
						disabled={false}
						size={300}
					/>) : <></>}
					<StyleInfo>
						<StyleBold>A propos:</StyleBold>
						<StyleRow>{description}</StyleRow>
						<StyleRow><StyleBold>Admin:</StyleBold> {admin}</StyleRow>
						<StyleRow><StyleBold>Date de création:</StyleBold>{FrenchFormatDateConvert(createDate)}</StyleRow>
						<StyleRow><StyleBold>Membres:</StyleBold> {nbMembers}</StyleRow>
					</StyleInfo>
			</StyleBanner>

			<>
				{ groupListRequested.includes(groupId) ? (
					<StyleRow>
						<Icone 
							alt="Demande d'adhésion à ce groupe en cours acception !" 
							image={IcnNotification}
							size={0.5}
						/>
						<p>Demande d'adhésion à ce groupe en cours acception !</p>
					</StyleRow>
					) : 
					<Button 
						text="Quitter le groupe" 
						disabled={false} 
						onClick={handleSupGroupe(groupId)}
					/> 
				}
			</>
			{ fetchError && notification && (
				<Popup texte={notification} type='error' />
			)}
		</StyleGroupContainer>
	)
}

export default GroupeInfos