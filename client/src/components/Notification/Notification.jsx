/*
	Projet Zone01 : Social network
	Tony Quedeville 
	21/08/2023
	Composant Notification : Affichage d'une notification
*/

import React, { useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
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
  //console.log("notif:", typeNotif, notif);

  const userId = useSelector(state => state.user.id)
  
  // waitFollowers
  const HandleWaitFollowersAccept = () => {
    const {} = useQuery(
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
    const {} = useQuery(
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
