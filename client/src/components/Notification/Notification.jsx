/*
	Projet Zone01 : Social network
	Tony Quedeville 
	21/08/2023
	Composant Notification : Affichage d'une notification
*/

import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
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
  console.log("notif:", notif);
  const { authId } = useContext(AuthContext)
  const navigate = useNavigate() // variable permettant de rediriger vers la page /user/pseudo si le login réussie

  // waitFollowers
  const HandleWaitFollowersAccept = () => {
    const { data: dataWaitFollowers, isLoading: isLoading } = useQuery(
      ['dataWaitFollowers', notif.id],
      () =>
        makeRequest.get(`/acceptfollower/${notif.id}`).then((res) => {
          return res.data;
        }),
      {
        cacheTime: 0, // Désactiver la mise en cache
      }
    );
  }

  const HandleWaitFollowersRefuse = () => {
    const { data: dataWaitFollowers, isLoading: isLoading } = useQuery(
      ['dataWaitFollowers', notif.id],
      () =>
        makeRequest.get(`/refusefollower/${notif.id}`).then((res) => {
          return res.data;
        }),
      {
        cacheTime: 0, // Désactiver la mise en cache
      }
    );
  }

  // waitGroupsAccept
  const [waitGroupsData] = useState({
		group_id: notif.Group_id,
		user_id: 0,
	})

  const handleWaitGroupAccept = async(e) => {
    console.log("handleWaitGroupAccept !");
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
			user_id: authId,
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
			user_id: authId,
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
          <>{notif.Pseudo + " demande à rejoindre le groupe " + notif.Group_title}</>
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
            onClick={handleInvitGroupAccept}
          />
          <Button 
            text="Refuser" 
            onClick={handleInvitGroupRefuse}
          />
        </StyleNotif>
      )
      
    case "events":
      return (
        <StyleNotif theme={theme}>
          <>{"Evènement: " + notif.titre + ", description :" + notif.description}</>
          <Link to={`/group/${notif.group_id}`}>
            {" Groupe: " + notif.group_name}
          </Link>
        </StyleNotif>
      )

    default:
  }
}

export default Notification
