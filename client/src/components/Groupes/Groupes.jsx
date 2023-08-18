/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Groupes : Affiche la liste des groupes de discution
  Page Groupes : Route http://localhost:3000/groups
*/

import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { Loader } from '../../utils/Atom.jsx'
import Popup from '../Popup/Popup.jsx'
//import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import extractIdsFromList from "../../utils/tools/ExtractIdsFromList.js"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
//import InputText from '../InputText/InputText.jsx'
//import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
import Icone from '../Icone/Icone.jsx'
// import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import IcnNotification from '../../assets/icn/icn-notification.png'
// import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import NewGroupe from '../NewGroupe/NewGroupe.jsx'
import axios from "axios"

// css
const PageContainer = styled.div`
  height: 88.5vh;
  display: flex;
  flex-direction: row;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const GroupContainer = styled.div`
  width: 100%;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 1px;
  border: solid 1px;
  border-radius: 5px;

  overflow: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Masque l'ascenseur Firefox */
  -ms-overflow-style: none; /* Masque l'ascenseur IE 10+ */
  &::-webkit-scrollbar {
      width: 0; /* Masque l'ascenseur Chrome, Safari et Opera */
  }
`
const StyleGroupeList = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  padding: 5px;
  border: solid 1px;
  border-radius: 5px;
`
const StyleTitleGroupe = styled.div`
  font-weight : bold;
  display: flex;
  justify-content: center;
  margin: 5px;
`
const StyleGroupButton = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

// Composant
const Groupes = (props) => {
  const { larg } = props
  const { theme } = useContext(ThemeContext)

  // AuthUser
  const { authPseudo, authId, waitGroups } = useContext(AuthContext)
  const waitGroupIds = extractIdsFromList(waitGroups)
  // console.log("waitGroupIds:", waitGroupIds);
  
  const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
  const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

  // Demander à adhérer au groupe
  const handleJoinGroupe = async (groupid) => {
    console.log("Rejoindre le groupe :",groupid)
    // Requete de demande d'ajout au groupe de discution vers app-social-network
    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/joingroup/${groupid}`)
      setFetchError(false)
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  // Quitter le groupe
  const handleQuitGroupe = async (groupid) => {
    console.log("Quitter le groupe :", groupid)
    // Requete de demande d'ajout au groupe de discution vers app-social-network
    try{
      await makeRequest.post(`http://${window.location.hostname}:8080/quitgroup/${groupid}`)
      setFetchError(false)
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  // Redirection vers la page du groupe
  const navigate = useNavigate()

  const HandleGroupeClick = async (groupid) => {
    navigate(`/group/${groupid}`)
  }

  const GroupsList = () => { 
    const { data, isLoading, error } = useQuery(['dataGroups'],
      () =>
        makeRequest.get(`/groupes`).then((res) => {
          return res.data
        }), {cacheTime: 0} // Désactiver la mise en cache
    )
    //console.log("dataGroups:", data)
    
    return (
      <>
        {isLoading ? (
          <Loader id="loader" />
          ) : (
            <>
            {error && (
              <Popup texte="Le chargement de la liste des groupes est erroné !" type='error' />
            )}
            {data.datas && (
              <>
                {data.datas.map((group, index) => (
                  <React.Fragment key={index}>
                    <StyleGroupeList 
                      key={`${group.title}-${index}`} 
                      id={`group-link-${group.id}`}
                      onClick={group.members.includes(authId) ? () => HandleGroupeClick(group.id) : null}
                      {...group}
                    >

                      <StyleTitleGroupe>
                        {group.title}
                      </StyleTitleGroupe>

                      {group.description}

                      {group.image ? (
                      <DisplayImage
                        id={"groupImage-" + group.id}
                        src={`http://${window.location.hostname}:4000/download/${group.image}`}
                        alt={"Image " + group.title}
                        size={300}
                        disabled={false}
                      />) : <></>}
                      
                      Nombre de membre: {group.nbmembers}
                      { authId && !group.members.includes(authId) && !waitGroupIds.includes(group.id) ? (
                        <Button 
                          text="Rejoindre le groupe" 
                          disabled={false} 
                          onClick={()=>{handleJoinGroupe(group.id)}}
                        />                          
                        ) : <>
                        { waitGroupIds.includes(group.id) ? (
                          <StyleGroupButton>
                            <Icone 
                              alt="Demande d'adhésion à ce groupe en cours acception !" 
                              image={IcnNotification}
                              size={0.5}
                            />
                            <p>Demande d'adhésion à ce groupe en cours acception !</p>
                          </StyleGroupButton>
                          ) : 
                          <>
                            { authId &&
                              <Button 
                                text="Quitter le groupe" 
                                disabled={false} 
                                onClick={handleQuitGroupe}
                              /> 
                            }
                          </>
                        }</>
                      } 
                    </StyleGroupeList>
                  </React.Fragment>
                ))}
              </>
            )}
            </>
          )
        }
      </>
    )
  }

  return (
    <PageContainer larg={larg} theme={theme}>
      <GroupContainer> 
        { authPseudo && (
          <NewGroupe/>
        )}  
        <GroupsList/>
      </GroupContainer>

      { fetchError && notification && (
        <Popup texte={notification} type='error' />
      )}
    </PageContainer>
  )
}

export default Groupes