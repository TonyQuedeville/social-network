/*
	Projet Zone01 : Social network
	Tony Quedeville 
	16/08/2023
	Composant NewEvent : Affiche une fenetre d'édition d'un nouvel évènement pour un groupe
*/

import React, { useState, useContext } from 'react'
import axios from "axios"
//import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import InputText from '../InputText/InputText.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
//import Icone from '../Icone/Icone.jsx'
import Popup from '../Popup/Popup.jsx'

// css
const NewEventContainer = styled.div`
	width: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

// Composant
const NewEvent = ({ groupId, updateEvents }) => {
	const { theme } = useContext(ThemeContext)

	// AuthUser
    // const { authId, authPseudo } = useContext(AuthContext)
	
	// New Post
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
	
	// Champs du formulaire
	const [formData, setFormData] = useState({
        group_id: groupId,
		titre: '',
		description: '',
		date: '', // Date de l'évènement
    })
	const [setEvent] = useState("")

    // Mise à jour de formData à chaque changement dans le formulaire
    const handleChange = (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value
            switch(e.target.name) {
				case "date" :
                    value = value + "T00:00:00.000+00:00"
                    break

                default :
                    break
            }

            setFormData(prev => ({
				...prev,
                [e.target.name]: value
            }))
        }
    }

	// Soumission du formulaire au server app-social-network
	const handleNewEventSubmit = async (event) => {
		event.preventDefault()
        let data = {
            ...formData,
        } 
		console.log("data:", data);

        // Requete d'enregistrement vers app-social-network
        try{
            const response = await axios.post(`http://${window.location.hostname}:8080/addevent`, JSON.stringify(data))
            setFetchError(false)
			CancelNewEvent()
			updateEvents(response.data);
        }
        catch (err) {
            setNotification(err.message + " : " + err.response.data.error)
            setFetchError(true)
        }
        finally {
        }
	}

	// Annulation
	const CancelNewEvent = () => {
		setFormData({
            ...formData,
            group_id: groupId,
			titre: '',
			description: '',
			date: '', // Date de l'évènement
            })
	}

	// Date du jour
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

	// Composant
	return (
		<NewEventContainer theme={theme}> 
			<form onSubmit={handleNewEventSubmit}>
				<InputText
					id="title-event"
					name="titre"
					label="* Titre"
					title="Titre de l'évènement"
					onChange={handleChange}
					required
				/>

				<TextArea
					id="new-event"
					name="description"
					label="* Déscription"
					content="contenu de l'évènement"
					placeholder="c'est là qu'tu décrit ton évènement !"
					rows={2}
					cols={48}
					value={formData.content}
					onChange={handleChange}
					required
				/>

				<InputText
					type="date"
					id="event-date"
					name="date"
					label="* Date de l'évènement"
					title={"Séléctionnez une date pour votre évènement."}
					onChange={handleChange}
					minDate={formattedToday}
					required
				/>
				
				<StyleGroupButton>
					<Button 
						type="submit" 
						text="Publier" 
						disabled={!(formData.description) || !(formData.titre) || !(formData.date)} 
						onChange={(e) => setEvent(formData)}
					/>
					<Button 
						text="Annuler" 
						disabled={false} 
						onClick={CancelNewEvent}
					/>
				</StyleGroupButton>

				{fetchError && notification && (
                    <Popup texte={notification} type='error' />
                )}
			</form>
		</NewEventContainer>
	)
}

export default NewEvent