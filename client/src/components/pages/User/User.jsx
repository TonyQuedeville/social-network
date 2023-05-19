// src/components/pages/User

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../utils/Atom.jsx'
import { useFetch } from '../../../utils/hooks/useFetch.jsx'
import styled from 'styled-components'
import Profile from '../../Profile/Profile.jsx'
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
    //console.log("username:", username);

    const [notification, setNotification] = useState('')
    const { dataUser, isLoading, error } = useFetch(`http://localhost:8080/${username.toLowerCase()}.json`)
    const [fetchError, setFetchError] = useState(false)
    //console.log("Users data:",dataUser);

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
                        { !fetchError && dataUser && (
                            <Profile {...dataUser}/>
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

export default User