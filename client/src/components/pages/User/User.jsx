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

    const [notification, setNotification] = useState('')
    const { data, isLoading, error } = useFetch(`http://localhost:8080/${username.toLowerCase()}.json`)
    const [fetchError, setFetchError] = useState(false)
    console.log("Users data:",data);
    
    useEffect(() => {
        if (error) {
            setNotification("Le chargement des données de cet utilisateur est erroné !")
            setFetchError(true)
        }
    },[error])

    return (
        <PageContainer>
            <Groupes larg={25}/>

            <ProfilContainer>
                {isLoading ? (
                    <Loader id="loader"/>
                ) : (
                    <>
                        { fetchError && notification && (
                            <Popup texte={notification} type='error' />
                        )}
                        { !fetchError && data && (
                            <Profile
                                pseudo={data.pseudo}
                                photoProfile={data.photoProfile}
                                sexe={data.sexe}
                                title={data.jobTitle} 
                                lastname={data.lastname} 
                                firstname={data.firstname} 
                                age={data.age} 
                            />
                        )}
                    </>
                )} 
                
                <PostContainer>
                    Posts User
                </PostContainer>
            </ProfilContainer>

            <Tchat larg={25}/>
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