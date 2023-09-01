/*
	Projet Zone01 : Social network
	Tony Quedeville 
	21/08/2023
	Composant Notification : Affichage d'une notification
*/

import React, { useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { useSelector } from "react-redux"
import Button from '../Button/Button'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

// css
const StyleNotif = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
  align-items: center;
	margin: 5px;
`
const StyleGroupButton = styled.div`
  display: flex;
	flex-direction: row;
	justify-content: center;
`

// Composant
const Notification = ({ notif, typeNotif, theme }) => {
  //console.log("notif:", typeNotif, notif.id);

  const userId = useSelector(state => state.user.id)
  
  // waitFollowers
  const acceptFollowerMutation = useMutation(
    (notifId) => makeRequest.get(`/acceptfollower/${notifId}`).then((res) => res.data),
    {
      cacheTime: 0,
    }
  );
  
  const refuseFollowerMutation = useMutation(
    (notifId) => makeRequest.get(`/refusefollower/${notifId}`).then((res) => res.data),
    {
      cacheTime: 0,
    }
  );
  
  // accepter
  const HandleWaitFollowersAccept = () => {
    const notifId = notif.id;
  
    acceptFollowerMutation.mutateAsync(notifId)
      .then(() => {
        console.log("Acceptation réussie !");
        // Vous pouvez ajouter ici un traitement pour afficher un message de confirmation ou actualiser la liste des notifications.
      })
      .catch((error) => {
        console.log("Une erreur d'acceptation !", error);
      });
  }

  // refuser
  const HandleWaitFollowersRefuse = () => {
    const notifId = notif.id;
  
    refuseFollowerMutation.mutateAsync(notifId)
      .then(() => {
        console.log("Refus réussi !");
        // Vous pouvez ajouter ici un traitement pour afficher un message de confirmation ou actualiser la liste des notifications.
      })
      .catch((error) => {
        console.log("Une erreur de refus !", error);
      });
  }

  // waitGroupsAccept
  const [waitGroupsData] = useState({
		group_id: notif.Group_id,
		user_id: 0,
	})

  const handleWaitGroupAccept = async(e) => {
    const data = {
			...waitGroupsData,
			user_id: notif.user_id,
		};
    
    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/acceptgroup`, JSON.stringify(data))
    }
    catch (err) {
      console.log("err:", err);
    }
    finally {
    }
  }

  const handleWaitGroupRefuse = async(e) => {
    const data = {
			...waitGroupsData,
			user_id: notif.user_id,
		};
    
    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/refusegroup`, JSON.stringify(data))
    }
    catch (err) {
      console.log("err:", err);
    }
    finally {
    }
  }

  // invitGroups
  const handleInvitGroupAccept = async (e) => {
    const data = {
			...waitGroupsData,
			user_id: userId,
		};

    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/acceptgroup`, JSON.stringify(data))
    }
    catch (err) {
      console.log("err:", err);
    }
    finally {
    }
  }

  const handleInvitGroupRefuse = async(e) => {
    const data = {
			...waitGroupsData,
			user_id: userId,
		};

    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/refusegroup`, JSON.stringify(data))
    }
    catch (err) {
      console.log("err:", err);
    }
    finally {
    }
  }

  switch (typeNotif) {
    case "waitFollowers":
      return (
        <StyleNotif theme={theme}>
          <>{notif.pseudo + " demande à vous suivre"}</>
          <StyleGroupButton>
            <Button 
              text="Accepter" 
              onClick={HandleWaitFollowersAccept}
            />
            <Button 
              text="Refuser" 
              onClick={HandleWaitFollowersRefuse}
            />
          </StyleGroupButton>
        </StyleNotif>
      )

    case "waitGroupsAccept":
      return (
        <StyleNotif theme={theme}>
          <>{notif.Pseudo + " demande à rejoindre le groupe " + notif.Group_title}</>
          <StyleGroupButton>
            <Button 
              text="Accepter" 
              onClick={handleWaitGroupAccept}
            />
            <Button 
              text="Refuser" 
              onClick={handleWaitGroupRefuse}
            />
          </StyleGroupButton>
        </StyleNotif>
      )
      
    case "invitGroups":
      return (
        <StyleNotif theme={theme}>
          <>{notif.pseudo + " vous invite à rejoindre le groupe " + notif.title}</>
          <StyleGroupButton>
            <Button 
              text="Accepter" 
              onClick={handleInvitGroupAccept}
            />
            <Button 
              text="Refuser" 
              onClick={handleInvitGroupRefuse}
            />
          </StyleGroupButton>
        </StyleNotif>
      )
      
    case "events":
      return (
        <StyleNotif theme={theme}>
          <Link to={`/group/${notif.group_id}`}>
            {" Groupe: " + notif.group_name + " "}
          </Link>
          <>{"Evènement: " + notif.titre + " le " + FrenchFormatDateConvert(notif.date)}</>
        </StyleNotif>
      )

    default:
  }
}

export default Notification
