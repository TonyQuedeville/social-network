/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Groupes : Affiche la liste des groupes de discution
  Page Groupes : Route http://localhost:3000/groups
*/

import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { GroupContext } from '../../utils/GroupProvider/GroupProvider.jsx'
import { Loader } from '../../utils/Atom.jsx'
import Popup from '../Popup/Popup.jsx'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import InputText from '../InputText/InputText.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import IcnNotification from '../../assets/icn/icn-notification.png'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
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
  border-radius: 10px;

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
  border-radius: 10px;
`
const NewGroupeContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 1px;
  padding: 5px;
  border: solid 1px;
  border-radius: 10px;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
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
  const { authPseudo, authId, groupListRequested } = useContext(AuthContext)

  // Requete: Liste des groupes
  const { data, isLoading, error } = useQuery(['dataGroupes'], () =>
    makeRequest.get("/groups").then((res) => {
      return res.data
    })
  )
  console.log("dataGroups:", data);

  // New Group
  const [newGroupeTitle, setNewGroupeTitle] = useState('')
  const [newGroupeContent, setNewGroupeContent] = useState('')
  const [groupeImage, setGroupeImage] = useState(null)
  const [showInputFile, setShowInputFile] = useState(false)
  const [validNewGroupeisDisabled, setValidNewGroupeisDisabled] = useState(true)
  const { updateGroupeData } = useContext(GroupContext)
  const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
  const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

  const handleTitleNewGroupeChange = (event) => {
    setNewGroupeTitle(event.target.value)
    //console.log("setTitleNewGroupe:", newGroupeTitle)
  }
  const handleNewGroupeChange = (event) => {
    setNewGroupeContent(event.target.value)
    //console.log("handleNewGroupeChange:", newGroupeContent)
  }

  useEffect(() => {
    setValidNewGroupeisDisabled(!(setNewGroupeTitle && newGroupeContent))
  }, [setNewGroupeTitle, newGroupeContent])

  const handleNewGroupeSubmit = (event) => {
    event.preventDefault()
    console.log("handleNewPostSubmit:",event)
  }
  const CancelNewGroupe = () => {
    setNewGroupeContent('')
    setNewGroupeTitle('')
    setGroupeImage('')
    //console.log("annuler new groupe !");
  }

  // Image post
  const loadPhotoPost = () => {
    //console.log("loadPhotoPost !")
    setShowInputFile(true)
  }
  const handleGroupeImageChange = (file) => {
    setGroupeImage(file)
    setShowInputFile(false)
  }

  // Demander à adhérer au groupe
  const handleAddGroupe = async (groupid) => {
    console.log("Rejoindre le groupe :",groupid)
    // Requete de demande d'ajout au groupe de discution vers app-social-network
    try{
      await axios.post(`http://${window.location.hostname}:8080/addGroup/${groupid}`)
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
  const handleSupGroupe = async (groupid) => {
    console.log("Quitter le groupe :",groupid)
    // Requete de demande d'ajout au groupe de discution vers app-social-network
    try{
      await axios.post(`http://${window.location.hostname}:8080/supGroup/${groupid}`)
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
  //const queryClient = useQueryClient()
  const navigate = useNavigate()

  const HandleGroupeClick = async (groupid) => {
        if (groupid) {            
            try{
                const response = await axios.post(`http://${window.location.hostname}:8080/group/${groupid}`)
                const responseData = response.data

                // Données du Groupe
                //console.log("groupData:", responseData.datas)
                updateGroupeData(responseData.datas.group)
                
                navigate(`/group/${responseData.datas.group.id}`)
            }
            catch (err) {
                setNotification(err.message + " : " + err.response.data.error)
                setFetchError(true)
            }
            finally {
            }
            //*/
        }
    
    // fetch(`http://${window.location.hostname}:8080/groupe-${groupid}`)
    //  .then((res) => res.json())
    //  .then((dataGroupe) => {
    //    queryClient.setQueryData(['dataGroupe', id], dataGroupe)
    //    updateGroupeData(dataGroupe)
    //    navigate(`/group/${dataGroupe.id}`)
    //  })
    //  .catch((error) => {
    //    // Gérer l'erreur de la requête
    //    console.error(error)
    //    // Afficher une notification d'erreur
    //    // ...
    //  })
  }

  return (
    <PageContainer larg={larg} theme={theme}>
      <GroupContainer>
        {/* New Group */}  
        { authPseudo ? (
          <NewGroupeContainer theme={theme}>
            <form onSubmit={handleNewGroupeSubmit}>
              <StyleTitleGroupe>Créer un nouveau Groupe</StyleTitleGroupe>
              <InputText
                id="titleNewGroupe"
                label="Titre"
                title="Titre de groupe"
                placeholder="Titre de groupe"
                value={newGroupeTitle}
                onChange={handleTitleNewGroupeChange}
                required
                size={300}
              />
              <TextArea
                id="new-group"
                label=""
                title="Description"
                placeholder="Donnez ici une description de votre groupe de discution."
                rows={3}
                cols={42}
                value={newGroupeContent}
                onChange={handleNewGroupeChange}
              />

              {showInputFile && (
                <InputFileImage 
                  id="fileGroupeImage"
                  value={groupeImage}
                  onChange={handleGroupeImageChange} 
                />
              )}                           
              {groupeImage && (
                <DisplayImage
                  id="groupeImage"
                  src={URL.createObjectURL(groupeImage)} 
                  alt="Groupe image"
                  size={300}
                  disabled={false}
                />
              )}
              
              <StyleGroupButton>
                <Icone 
                  alt="Groupe image" 
                  //disabled={!groupeImage} 
                  image={IcnPhoto}
                  onClick={loadPhotoPost}
                />

                <Button 
                    type="submit"
                    text="Ok" 
                    disabled={validNewGroupeisDisabled} 
                />
                <Button 
                    text="Annuler" 
                    disabled={false} 
                    onClick={CancelNewGroupe}
                />
              </StyleGroupButton>
            </form>
          </NewGroupeContainer>
        ) : null}  

        {/* Groupe */}
        <>
          {isLoading ? (
          <Loader id="loader" />
          ) : (
          <>
            {error && (
              <Popup texte="Le chargement de la liste des groupes est erroné !" type='error' />
            )}
            {data && (
              <>
                {data.groupes.map((group, index) => (
                  <React.Fragment key={index}>
                    <StyleGroupeList 
                      key={`${group.title}-${index}`} 
                      id={`group-link-${group.id}`}
                      onClick={group.members_id_list.includes(authId) ? () => HandleGroupeClick(group.id) : null}
                      {...group}
                    >

                      <StyleTitleGroupe>
                        {group.title}
                      </StyleTitleGroupe>

                      {group.description}

                      {group.image ? (
                      <DisplayImage
                        id={"groupImage-" + group.id}
                        src={require(`../../assets/img/${group.image}`).default}
                        alt={"Image " + group.title}
                        size={300}
                        disabled={false}
                      />) : <></>}
                      
                      Nombre de membre: {group.nbmembers}
                      { authPseudo && !group.members_id_list.includes(authId) && !groupListRequested.includes(group.id) ? (
                        <Button 
                          text="Rejoindre le groupe" 
                          disabled={false} 
                          onClick={handleAddGroupe(group.id)}
                        />                          
                        ) : <>
                        { groupListRequested.includes(group.id) ? (
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
                            <Button 
                              text="Quitter le groupe" 
                              disabled={false} 
                              onClick={handleSupGroupe(group.id)}
                            /> 
                          </>
                        }</>} 
                    </StyleGroupeList>
                  </React.Fragment>
                ))}
              </>
            )}
          </>
          )}
        </>
      </GroupContainer>

      { fetchError && notification && (
        <Popup texte={notification} type='error' />
      )}
    </PageContainer>
  )
}

Groupes.defaultProps = {
  larg: null,
}

Groupes.propTypes = {
  larg: PropTypes.number,
}

export default Groupes