/*
	Projet Zone01 : Social network
	Tony Quedeville 
	17/08/2023
	Composant Event : Affiche un évènement
*/

import React, {useState} from 'react'
import { makeRequest } from '../../utils/Axios/Axios.js'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import Button from '../Button/Button.jsx'
import Popup from '../Popup/Popup.jsx'

// css
const EventContainer = styled.div`
	width: 96%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 10px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
`
const StyleEventDate = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: start;
	margin: 5px;
`
const StyleTitle = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
`
const StyleEventContent = styled.div`
	width: 98%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
`
const StyleCheckBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`

// Composant
const Event = ({ event, theme, onDelete }) => {
	const eventGoingId = `eventgoing-${event.id}`
	const eventNotGoingId = `eventnotgoing-${event.id}`
	const eventNotId = `eventnot-${event.id}`
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

	// Champs du formulaire
	const [data, setData] = useState({
		event_id: event.id,
		going: 'pas intérréssé',
	})

	const handleChange = async (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value
			switch(e.target.name) {
				default :
					break
			}

			setData(prev => ({
				...prev,
					[e.target.name]: value
			}))
		}

		const formData = {
			...data,
			event_id: event.id,
			going: value,
		};

		// Requete d'enregistrement vers app-social-network
		try{
			await makeRequest.post(`/goingevent`, JSON.stringify(formData))
			setFetchError(false)
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
	}

	// Suppresion de l'évènement
	const handleSup = async (e) => {
		e.preventDefault()
		try{
			await makeRequest.post(`/supevent/${event.id}`, JSON.stringify(data))
			setFetchError(false)
			onDelete(event.id)
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
	}

	return (
    <EventContainer  theme={theme}>
			<StyleCheckBox>
				<StyleEventDate>{FrenchFormatDateConvert(event.date)}</StyleEventDate>  
				<Button 
						text="Supprimer" 
						onClick={handleSup}
					/>
			</StyleCheckBox>

			<StyleTitle>{event.titre}</StyleTitle>   

			<StyleEventContent>{event.description}</StyleEventContent>  

			<StyleCheckBox>
				<RadioBouton
					id={eventGoingId}
					name={"going" + event.id}
					label="je participe"
					value="je participe"
					onChange={handleChange}
					alignment="vertical"
					/>
					<RadioBouton
					id={eventNotGoingId}
					name={"going" + event.id}
					label="je ne participe pas"
					value="je ne participe pas"
					onChange={handleChange}
					alignment="vertical"
					/>
				<RadioBouton
					id={eventNotId}
					name={"going" + event.id}
					label="pas intérréssé"
					value="pas intérréssé"
					onChange={handleChange}
					alignment="vertical"
					/>
			</StyleCheckBox>

			{fetchError && notification && (
				<Popup texte={notification} type='error' />
			)}

    </EventContainer>
	)
}

export default Event;