// src/components/pages/Profile

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

const ProfilCard = styled.div`
  width: 100%;
  height; 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => (props.theme === 'light' ? 'black' : 'white')};
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

const Profile = ({pseudo, sexe, statusProfil, jobTitle, photoProfile, lastname, firstname, bornDate}) => {
  const { theme } = useContext(ThemeContext)

  const getPhotoProfile = () => {
    if (photoProfile) {
      //console.log("photoProfile:", photoProfile)
      return require(`../../assets/img/${photoProfile}`).default
    } else {
      return sexe === 'f' ? DefaultPictureF : DefaultPictureH
    }
  }

  return (
    <ProfilCard theme={theme}>
      <Pseudo id={`user-pseudo-${pseudo}`}>{pseudo}</Pseudo>
      <PhotoProfile src={getPhotoProfile()} id={`user-photo-${pseudo}`} alt="photoProfile" />
      <Titre id={`user-title-${pseudo}`}>{jobTitle}</Titre>
      {statusProfil === "public" ?
        <InfoUser>
          {firstname && (
            <span id={`user-nom-${pseudo}`}>Nom: {firstname}</span>
          )}
          {lastname && (
            <span id={`user-nom-${pseudo}`}>Prénom: {lastname}</span>
          )}
          {bornDate && (
            <span id={`user-age-${pseudo}`}>Date de naissance: {FrenchFormatDateConvert(bornDate)}</span>
          )}
        </InfoUser>
      : <></>
    }
    </ProfilCard>
  )
}

Profile.propTypes = {
  pseudo: PropTypes.string.isRequired,
  sexe: PropTypes.string,
  jobTitle: PropTypes.string,
  statusProfil: PropTypes.string,
  photoProfile: PropTypes.string,
  lastname: PropTypes.string,
  firstname: PropTypes.string,
  bornDate: PropTypes.string,
}

Profile.defaultProps = {
  pseudo: 'Anonyme',
  jobTitle: 'aucun',
  statusProfil: 'private',
}

export default Profile