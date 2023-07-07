import React, {useState, useContext, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx';
import { Loader } from '../../utils/Atom.jsx'
import Popup from '../Popup/Popup.jsx'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import InputText from '../InputText/InputText.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
//import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'


// css
const PageContainer = styled.div`
  width: ${props => props.larg}%;
  height: 88.5vh;
  display: flex;
  flex-direction: row;
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
  background: ${props => (props.theme === 'light' ? colors.backgroundLightSoft : colors.backgroundDark)};
`
const StyleTitleGroupe = styled.div`
  font-weight : bold;
  display: flex;
  justify-content: center;
  margin: 5px;
`
const StyleInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 5px;
	font-style: italic;
	font-size: 0.8em;
	color: grey;
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
  const { authPseudo } = useContext(AuthContext);

  // Requete: Liste des groupes
  const { data, isLoading, error } = useQuery(['dataGroupe'], () =>
    fetch(`http://${window.location.hostname}:8080/groupes.json`).then((res) => res.json())
  )
  //console.log("dataUser:", dataUser);

  // New Group
  const [titleNewGroupe, setTitleNewGroupe] = useState('')
  const [newGroupeContent, setNewGroupeContent] = useState('')
  const [groupeImage, setGroupeImage] = useState(null)
  const [showInputFile, setShowInputFile] = useState(false)
  const [validNewGroupeisDisabled, setValidNewGroupeisDisabled] = useState(true)

  const handleNewGroupeSubmit = (event) => {
    //console.log("handleNewPostSubmit:",event)
  }
  const handleTitleNewGroupeChange = (event) => {
    setTitleNewGroupe(event.target.value)
    //console.log("setTitleNewGroupe:", titleNewGroupe)
  }
  const handleNewGroupeChange = (event) => {
    setNewGroupeContent(event.target.value)
    //console.log("handleNewGroupeChange:", newGroupeContent)
  }
  
  const CancelNewGroupe = () => {
    setNewGroupeContent('')
    setTitleNewGroupe('')
    setGroupeImage('')
    //console.log("annuler new groupe !");
  }

  const handleAccesGroupe = () => {
    console.log("Rejoindre le groupe !");
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

  useEffect(() => {
    setValidNewGroupeisDisabled(!(titleNewGroupe && newGroupeContent))
  }, [titleNewGroupe, newGroupeContent])

  return (
    <PageContainer larg={larg}>
      <GroupContainer>
        {/* New Group */}    
        <NewGroupeContainer theme={theme}>
          <form onSubmit={handleNewGroupeSubmit}>
            <StyleTitleGroupe>Créer un nouveau Groupe</StyleTitleGroupe>
            <InputText
              id="titleNewGroupe"
              label="Titre"
              title="Titre de groupe"
              placeholder="Titre de groupe"
              value={titleNewGroupe}
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
                    {group.admin === authPseudo ? (
                      <div>Fonctionnalités supplémentaires réservées à l'administrateur</div>
                    ) : null}

                    <StyleGroupeList {...group}>
                      <StyleInfo>
                        <div>{group.admin}</div>
                        <div>{FrenchFormatDateConvert(group.dateheure)}</div>
                      </StyleInfo>

                      <StyleTitleGroupe>
                        {group.titre}
                      </StyleTitleGroupe>

                      {group.description}

                      {group.image ? (
                      <DisplayImage
                        id={"groupImage-" + group.id}
                        src={require(`../../assets/img/${group.image}`).default}
                        alt={"Image " + group.title}
                        disabled={false}
                      />) : <></>}
                      
                      Nombre de membre: {group.nbMembers}
                      
                      <Button 
                        text="Rejoindre le groupe" 
                        disabled={false} 
                        onClick={handleAccesGroupe}
                      />
                    </StyleGroupeList>
                  </React.Fragment>
                ))}
              </>
            )}
          </>
          )}
        </>
      </GroupContainer>
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