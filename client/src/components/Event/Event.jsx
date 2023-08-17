/*
	Projet Zone01 : Social network
	Tony Quedeville 
	17/08/2023
	Composant Event : Affiche un évènement
*/

import React, {useState} from 'react'
import axios from "axios"
import { makeRequest } from '../../utils/Axios/Axios.js'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
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
	background: ${props => (props.theme === 'light' ? colors.backgroundWhite : colors.backgroundDarkSoft)};
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
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`

// Composant
const Event = ({ event, theme }) => {
	const eventGoingId = `eventgoing-${event.id}`
	const eventNotGoingId = `eventnotgoing-${event.id}`
	const eventNotId = `eventnot-${event.id}`
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

	// Champs du formulaire
	const [formData, setFormData] = useState({
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

			console.log("value:",value );

			setFormData(prev => ({
				...prev,
					[e.target.name]: value
			}))
		}

		// Requete d'enregistrement vers app-social-network
		try{
			const response = await makeRequest.post(`/goingevent`, JSON.stringify(formData))
			setFetchError(false)
			console.log(response);
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
	};

	return (
    <EventContainer  theme={theme}>
      <StyleEventDate>{FrenchFormatDateConvert(event.date)}</StyleEventDate>  
      <StyleTitle>{event.titre}</StyleTitle>      
      <StyleEventContent>{event.description}</StyleEventContent>  
			<StyleCheckBox>
				<RadioBouton
					id={eventGoingId}
					name="going"
					label="je participe"
					value="je participe"
					onChange={handleChange}
					alignment="vertical"
					/>
					<RadioBouton
					id={eventNotGoingId}
					name="going"
					label="je ne participe pas"
					value="je ne participe pas"
					onChange={handleChange}
					alignment="vertical"
					/>
				<RadioBouton
					id={eventNotId}
					name="going"
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