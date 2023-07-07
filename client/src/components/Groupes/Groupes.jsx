import React, {useState, useContext, useEffect} from 'react'
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

// css
const StyleGroupButton = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const GroupContainer = styled.div`
  width: ${props => props.larg}%;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  border: solid 1px;
  border-radius: 10px;
`
const NewGroupeContainer = styled.div`
    width: 95%;
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

const Groupes = (props) => {
  const { larg } = props
  const { theme } = useContext(ThemeContext)

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
    <GroupContainer larg={larg}>
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

      <div>Liste des groupe</div>
    </GroupContainer>
  )
}

Groupes.defaultProps = {
  larg: null,
}

Groupes.propTypes = {
  larg: PropTypes.number,
}

export default Groupes