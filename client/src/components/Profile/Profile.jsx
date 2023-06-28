// src/components/pages/Profile

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'

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

const Profile = ({pseudo, sexe, statusProfil: initialStatusProfil, hideStatus, aboutme, photoProfile, lastname, firstname, bornDate}) => {
  const { theme } = useContext(ThemeContext)
  const [statusProfil, setStatusProfil] = useState(initialStatusProfil);
  const { authPseudo } = useContext(AuthContext);
  //console.log("hideStatus: ", hideStatus);
  //console.log("authPseudo: ", authPseudo, "pseudo:", pseudo);

  const getPhotoProfile = () => {
    if (photoProfile) {
      //console.log("photoProfile:", photoProfile)
      return require(`../../assets/img/${photoProfile}`).default
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
          <Titre id={`user-title-${pseudo}`}>{aboutme}</Titre>
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
  statusProfil: PropTypes.string,
  hideStatus: PropTypes.bool,
  photoProfile: PropTypes.string,
  lastname: PropTypes.string,
  firstname: PropTypes.string,
  bornDate: PropTypes.string,
}

Profile.defaultProps = {
  pseudo: 'Anonyme',
  aboutme: 'aucun',
  statusProfil: 'private',
  hideStatus: false,
}

export default Profile