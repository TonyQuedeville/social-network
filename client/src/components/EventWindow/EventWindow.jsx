/*
	Projet Zone01 : Social network
	Tony Quedeville 
	16/08/2023
	Composant EventWindow : Fenêtre des évènements de groupe
*/

import React, { useContext, useEffect, useState } from 'react'
//import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
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
	width: 80%;
	height: 75%;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 9999;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
	box-shadow: 10px 5px 25px 0px black;
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

	const updateEvents = () => {
		console.log("updateEvents !");
	}

	const handleClose = () => {
		onClose();
	}

	// Events
  const Events = () => {  
    const { data, isLoading, error } = useQuery(['dataEvents'], async () =>
      await makeRequest.get(`/events/${groupId}`).then((res) => {
        console.log("groupevents !", res.data);
        return res.data
      })
    )

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
              {data.datas.map((event, index) => (
                <Event 
									key={index} 
									event={event} 
									theme={theme}
								/>
              ))}
            </>
          )}
        </>
        )}
      </>
    )
  }

	return (
    <StyleWindow theme={theme}>
			<StyleTitleGroupe>
				Evèments
			</StyleTitleGroupe>

			<NewEvent
				groupId = {groupId} 
				updateEvents = {updateEvents()}
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