// src/components/pages/Profile

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Loader } from '../../../utils/Atom.jsx'
import colors from '../../../utils/style/Colors.js'
import DefaultPictureH from '../../../assets/img/user-profile-avatar-h.png'

const Profile = ({pseudo, photoProfile, title, onClick}) => {
    const ProfilCard = styled.div`
        width: 75%;
        border: solid 1px black;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 200ms;
        &:hover {
            transform: scale(1.02);
            cursor: pointer;
            background: ${colors.backgroundLight};
            box-shadow: 2px 2px 10px #B0B0B0;
        }
    `
    const Pseudo = styled.span`
        color: ${colors.blue};
        font-size: 22px;
        font-weight: bold;
    `
    const Titre = styled.span`
        color: ${colors.orange};
        font-size: 22px;
        font-weight: bold;
    `
    const PhotoProfile = styled.img`
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 5px;
    `

    const { username } = useParams()
    console.log(username);
    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser(){
            setDataLoading(true)
            try{
                const response = await fetch("http://user?" + username)
                const { user } = await response.json()
                setUser(user)
            } catch(err) {
                console.log("error fetchUser !", error);
                setError(true)
            } finally {
                setDataLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <div> 
            <ProfilCard onClick={onClick}>
                {isDataLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Pseudo>{pseudo}</Pseudo>
                        <PhotoProfile src={photoProfile} alt="photoProfile" />
                        <Titre>{title}</Titre>
                        <div>
                            <span>Nom: {user.name}</span>
                            <span>Age: {user.age}</span>
                            {/* Affichez d'autres propriétés de l'utilisateur selon vos besoins */}
                        </div>
                    </div>
                )} 
            </ProfilCard>
        </div>
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
    photoProfile: DefaultPictureH,
}

export default Profile