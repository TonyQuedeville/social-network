// src/components/pages/User

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../utils/Atom.jsx'
import { useFetch } from '../../../utils/hooks/useFetch.jsx'
import styled from 'styled-components'
import Profile from '../Profile/Profile'
import Groupes from '../../Groupes/Groupes'
import Tchat from '../../Tchat/Tchat'
import Popup from '../../Popup/Popup.jsx'

const PageContainer = styled.div`
    width: 100%;
    min-height: 88.5vh;
    display: flex;
    flex-direction: row;
`
const ProfilContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
`
const PostContainer = styled.div`
    width: 99%;
    min-height: 87.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
`

const User = () => {
    const { username } = useParams()
    console.log("User username:", username)

    const [notification, setNotification] = useState('')
    const { data, isLoading, error } = useFetch("http://user?" + username)
    const { user } = data
    if(error) setNotification("Le chargement des données de cet utilisateur sont erronées !")
    //*/
    
    useEffect(() => {
        console.log("render User !");
    })

    return (
        <PageContainer>
            <Groupes larg={25}/>
            <ProfilContainer>
                {isLoading ? (
                    <Loader id={`loader`}/>
                ) : (
                    <Profile
                        pseudo={user.pseudo}
                        photoProfile={user.photoProfile}
                        sexe={user.sexe}
                        title={user.title} 
                        name='' //{user.name} 
                        age='' //{user.age} 
                    />
                )} 
                
                <PostContainer>
                    Posts User
                </PostContainer>
            </ProfilContainer>

            <Tchat larg={25}/>
            
            {notification && (
                <Popup texte={notification} type='error' />
            )}
        </PageContainer>
    )
}

User.defaultProps = {
    pseudo: '',
    sexe: '',
    photoProfile: '',
    title: '',
}

User.propTypes = {
    pseudo: PropTypes.string,
    sexe: PropTypes.string,
    photoProfile: PropTypes.string,
    title: PropTypes.string,
}

export default User