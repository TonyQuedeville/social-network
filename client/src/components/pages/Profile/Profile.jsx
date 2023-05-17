// src/components/pages/Profile

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
//import colors from '../../../utils/style/Colors.js'
import DefaultPictureH from '../../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../../assets/img/user-profile-avatar-f.png'

const ProfilCard = styled.div`
    width: 100%;
    height; 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => (props.theme === 'light' ? 'black' : 'white')};
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

const Profile = ({pseudo, sexe, name, age, photoProfile, title}) => {
    const { theme } = useContext(ThemeContext)

    const getPhotoProfile = () => {
        if (photoProfile) {
            console.log("photoProfile:", photoProfile)
            return require(`../../../assets/img/${photoProfile}`).default;
        } else {
            return sexe === 'f' ? DefaultPictureF : DefaultPictureH
        }
    }

    return (
        <ProfilCard theme={theme}>
            <div>
                <Pseudo id={`user-pseudo-${pseudo}`}>{pseudo}</Pseudo>
                <PhotoProfile src={getPhotoProfile()} id={`user-photo-${pseudo}`} alt="photoProfile" />
                <Titre id={`user-title-${pseudo}`}>{title}</Titre>
                <div>
                    <span id={`user-nom-${pseudo}`}>Nom: {name}</span>
                    <span id={`user-age-${pseudo}`}>Age: {age}</span>
                </div>
            </div>
        </ProfilCard>
    )
}

Profile.propTypes = {
    pseudo: PropTypes.string.isRequired,
    title: PropTypes.string,
    photoProfile: PropTypes.string,
}

Profile.defaultProps = {
    pseudo: 'Anonyme',
    title: 'aucun',
}

export default Profile