/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Profile : Affiche les données d'un utilisateur
*/

import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import ShowConnected from '../ShowConnected/ShowConnected.jsx'

// css
const StyleProfilCard = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: centre;
  color: ${props => (props.theme === 'light' ? 'black' : 'white')};
  
`

const StyleLabelUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyleLabInput = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 5px;
`

const InfoUser = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const Pseudo = styled.span`
  font-size: 22px;
  font-weight: bold;
`
const Titre = styled.span`
  font-size: 22px;
  font-weight: bold;
`
const StylePhotoProfile = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 5px;
`

// Composant
const Profile = (props) => {
  const { 
          id,
          pseudo, 
          sexe, 
          status, 
          about, 
          image, 
          lastname, 
          firstname, 
          bornDate,
          isConnected,
        } = props

  const { theme } = useContext(ThemeContext)
  const user = useSelector(state => state.user)
  
  //console.log("status: ", status);
  const [statusProfil, setStatusProfil] = useState(status)

  useEffect(() => {
    setStatusProfil(status);
  }, [status])

  const updateStatusProfilOnServer = (newStatus) => {
    console.log("newStatus:", newStatus)
    // Effectuer la requête HTTP ou la communication avec le serveur pour mettre à jour le statut du profil
  }

  const handleStatusProfilChange = (event) => {
    const newStatus = event.target.value
    setStatusProfil(newStatus)
    updateStatusProfilOnServer(newStatus) // Envoyer le changement au serveur
  }

  return (
    <StyleProfilCard theme={theme}>
      <StyleLabelUser>
        <Pseudo id={`user-pseudo-${pseudo}`}>{pseudo}</Pseudo>
        {image ? 
          <StylePhotoProfile 
            src={`http://${window.location.hostname}:4000/download/${image}`} 
            id={`user-photo-${pseudo}`} 
            alt="photoProfile" />
          : <StylePhotoProfile 
              src={sexe === 'f' ? DefaultPictureF : DefaultPictureH} 
              id={`user-photo-${pseudo}`} 
              alt="photoProfile" />
        }
        <ShowConnected
          id={`user-connect-${pseudo}`}
          isConnected={isConnected}
        />
        { user.pseudo === pseudo && user.isAuthenticated ? 
          <StyleLabInput>
            <p>Status profil</p>
            <RadioBouton
                id="statusProfil"
                label="Privé"
                value="private"
                checked={statusProfil === 'private'}
                onChange={handleStatusProfilChange}
                alignment="vertical"
            />
            <RadioBouton
                id="statusProfil"
                label="Public"
                value="public"
                checked={statusProfil === 'public'}
                onChange={handleStatusProfilChange}
                alignment="vertical"
                />
          </StyleLabInput>
        : <></>
        }
      </StyleLabelUser>

      { statusProfil === "public" || user.pseudo === pseudo || (user.followed && user.followed.includes(id)) ?
        <>
          <InfoUser>
            { firstname && (
              <span id={`user-nom-${pseudo}`}>Nom: {lastname}</span>
            )}
            { lastname && (
              <span id={`user-nom-${pseudo}`}>Prénom: {firstname}</span>
            )}
            { bornDate && (
              <span id={`user-age-${pseudo}`}>Date de naissance: {FrenchFormatDateConvert(bornDate)}</span>
            )}
          </InfoUser>
          <Titre id={`user-title-${pseudo}`}>{about}</Titre>
        </>
      : <></>
    }
    </StyleProfilCard>
  )
}

Profile.propTypes = {
  pseudo: PropTypes.string.isRequired,
  sexe: PropTypes.string,
  aboutme: PropTypes.string,
  status: PropTypes.string,
  hideStatus: PropTypes.bool,
  image: PropTypes.string,
  lastname: PropTypes.string,
  firstname: PropTypes.string,
  bornDate: PropTypes.string,
}

Profile.defaultProps = {
  pseudo: 'Anonyme',
  aboutme: 'aucun',
  status: 'private',
  hideStatus: false,
}

export default Profile