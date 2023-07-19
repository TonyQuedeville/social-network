/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Profile : Affiche les données d'un utilisateur
*/

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'

// css
const ProfilCard = styled.div`
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
  justify-content: space-around;
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
const PhotoProfile = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 5px;
`

// Composant
const Profile = (props) => {
  const { pseudo, 
          sexe, 
          status, 
          hideStatus, 
          about, 
          image, 
          lastname, 
          firstname, 
          bornDate
        } = props
  const { theme } = useContext(ThemeContext)
  const { authPseudo } = useContext(AuthContext)
  //console.log("authPseudo: ", authPseudo, "pseudo:", pseudo)
  //console.log("status: ", status);
  const [statusProfil, setStatusProfil] = useState(status)

  useEffect(() => {
    setStatusProfil(status);
  }, [status])
  //console.log("statusProfil: ", statusProfil);

  const getPhotoProfile = () => {
    if (image) {
      //console.log("photoProfile:", photoProfile)
      return require(`../../assets/img/${image}`).default
    } else {
      return sexe === 'f' ? DefaultPictureF : DefaultPictureH
    }
  }

  const updateStatusProfilOnServer = (newStatus) => {
    console.log("newStatus:", newStatus);
    // Effectuer la requête HTTP ou la communication avec le serveur pour mettre à jour le statut du profil
  };

  const handleStatusProfilChange = (event) => {
    const newStatus = event.target.value
    setStatusProfil(newStatus);
    updateStatusProfilOnServer(newStatus); // Envoyer le changement au serveur
  }

  return (
    <ProfilCard theme={theme}>
      <StyleLabelUser>
        <Pseudo id={`user-pseudo-${pseudo}`}>{pseudo}</Pseudo>
        <PhotoProfile src={getPhotoProfile()} id={`user-photo-${pseudo}`} alt="photoProfile" />

        {!hideStatus && authPseudo === pseudo ? 
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

      {statusProfil === "public" || authPseudo === pseudo ?
        <>
          <InfoUser>
            {firstname && (
              <span id={`user-nom-${pseudo}`}>Nom: {lastname}</span>
            )}
            {lastname && (
              <span id={`user-nom-${pseudo}`}>Prénom: {firstname}</span>
            )}
            {bornDate && (
              <span id={`user-age-${pseudo}`}>Date de naissance: {FrenchFormatDateConvert(bornDate)}</span>
            )}
          </InfoUser>
          <Titre id={`user-title-${pseudo}`}>{about}</Titre>
        </>
      : <></>
    }
    </ProfilCard>
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