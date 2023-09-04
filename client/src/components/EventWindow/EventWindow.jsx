/*
	Projet Zone01 : Social network
	Tony Quedeville 
	16/08/2023
	Composant EventWindow : Fenêtre des évènements de groupe
*/

import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { Loader } from '../../utils/Atom.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
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
	top: 55%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 40%;
	height: 70%;
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
const StyleEventsContainer = styled.div`
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
const EventWindow = ({groupId, onClose}) => {
	// Contexte
  const { theme } = useContext(ThemeContext)
	const [events, setEvents] = useState([])

	const addEvents = (newEvent) => {
		const listEvents = [...events, newEvent]
		setEvents(listEvents)
	}

	// Events
  const Events = () => {  
    const { data, isLoading, error } = useQuery(['dataEvents'], async () =>
      await makeRequest.get(`/events/${groupId}`).then((res) => {
        return res.data
      })
    )

		useEffect(() => {
			if (data && data.datas) {
				setEvents(data.datas);
			}
		}, [data]);
		
    const handleEventDelete = (eventId) => {
		// Mise à jour de la liste des événements sans l'événement supprimé
		const listEvents = events.filter((event) => event.id !== eventId)
		setEvents(listEvents)
    }

	return (
      <>
        {isLoading ? (
          <Loader id="loader" />
        ) : (
        <>
          {error && (
            <Popup texte="Le chargement des évènements de ce groupe est erroné !" type='error' />
          )}
          {data.datas && (
            <>
              {events.map((event, index) => (
                <Event 
					key={index} 
					event={event} 
					theme={theme}
					onDelete={handleEventDelete}
				/>
              ))}
            </>
          )}
        </>
        )}
      </>
    )
  }

	const handleClose = () => {
		onClose();
	}

	return (
    <StyleWindow theme={theme}>
			<StyleTitleGroupe>
				Evèments
			</StyleTitleGroupe>

			<NewEvent
				groupId = {groupId} 
				addEvents = {addEvents}
			/>

			<StyleEventsContainer theme={theme}>
        <Events />
    </StyleEventsContainer>

			<StyleGroupButton>
				<Button 
					text="Fermer" 
					onClick={handleClose}
				/>
			</StyleGroupButton>
		</StyleWindow>
	)
}

export default EventWindow