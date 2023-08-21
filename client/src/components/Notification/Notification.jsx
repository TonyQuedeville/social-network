/*
	Projet Zone01 : Social network
	Tony Quedeville 
	21/08/2023
	Composant Notification : Affichage d'une notification
*/

import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button'
import Popup from '../Popup/Popup.jsx'

// css
const StyleNotif = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: start;
	margin: 5px;
`

// Composant
const Notification = ({ notif, typeNotif, onDelete, theme }) => {
  // AuthUser
  const { authId } = useContext(AuthContext)

  // Erreurs
  const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
  const [fetchError, setFetchError] = useState(false) // Affichage de l'erreur

  // waitFollowers
  const HandleWaitFollowersAccept = () => {
    const { data: dataWaitFollowers, isLoading: isLoading } = useQuery(
      ['dataWaitFollowers', notif.user_id],
      () =>
        makeRequest.get(`/acceptfollower/${notif.user_id}`).then((res) => {
          return res.data;
        }),
      {
        cacheTime: 0, // Désactiver la mise en cache
      }
    );
    onDelete(notif.id)
  }

  const HandleWaitFollowersRefuse = () => {
    const { data: dataWaitFollowers, isLoading: isLoading } = useQuery(
      ['dataWaitFollowers', notif.user_id],
      () =>
        makeRequest.get(`/refusefollower/${notif.user_id}`).then((res) => {
          return res.data;
        }),
      {
        cacheTime: 0, // Désactiver la mise en cache
      }
    );
    onDelete(notif.id)
  }

  // waitGroupsAccept
  const handleWaitGroupAccept = async () => {
    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/acceptgroup`, JSON.stringify(waitGroupsData))
      setFetchError(false)
      onDelete(notif.id)
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  const handleWaitGroupRefuse = () => {
    // post
  }

  // invitGroups
  const handleInvitGroupAccept = () => {
    // post
  }

  const handleInvitGroupRefuse = () => {
    // post
  }


  switch (typeNotif) {
    case "waitFollowers":
      return (
        <StyleNotif theme={theme}>
          <>{notif.pseudo + " demande à vous suivre"}</>
          <Button 
            text="Accepter" 
            onClick={HandleWaitFollowersAccept}
          />
          <Button 
            text="Refuser" 
            onClick={HandleWaitFollowersRefuse}
          />
        </StyleNotif>
      )

    case "waitGroupsAccept":
      return (
        <StyleNotif theme={theme}>
          <>{notif.pseudo + " demande à faire parti du groupe " + notif.title}</>
          <Button 
            text="Accepter" 
            onClick={handleWaitGroupAccept}
          />
          <Button 
            text="Refuser" 
            onClick={handleWaitGroupRefuse}
          />
        </StyleNotif>
      )
      
    case "invitGroups":
      return (
        <StyleNotif theme={theme}>
          <>{notif.pseudo + " vous invite à rejoindre le groupe " + notif.title}</>
          <Button 
            text="Accepter" 
            onClick={handleWaitGroupAccept}
          />
          <Button 
            text="Refuser" 
            onClick={handleWaitGroupRefuse}
          />
        </StyleNotif>
      )
      
    case "events":
      return (
        <StyleNotif theme={theme}>
          <>{"Evènement: " + notif.title + ", dans le groupe " + notif.title}</>
        </StyleNotif>
      )

    default:
  }

  <>
  {fetchError && notification && (
    <Popup texte={notification} type='error' />
    )}
  </>
}

export default Notification
