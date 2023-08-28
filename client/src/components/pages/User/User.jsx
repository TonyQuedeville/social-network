/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant User : Affiche l'ensemble des données d'un utilisateur
    Page User : Route http://localhost:3000/user/:userid
*/

import React, { useContext, useState } from 'react'
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { Loader } from '../../../utils/Atom.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../../utils/Axios/Axios.js'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../../utils/style/Colors.js'
import styled from 'styled-components'
import Profile from '../../Profile/Profile.jsx'
import Groupes from '../../Groupes/Groupes.jsx'
import Tchat from '../../Tchat/Tchat.jsx'
import Popup from '../../Popup/Popup.jsx'
import NewPost from '../../NewPost/NewPost.jsx'
import Post from '../../Post/Post.jsx'

// css
const PageContainer = styled.div`
    width: 100%;
    height: 88.5vh;
    display: flex;
    flex-direction: row;
`
const ProfilContainer = styled.div`
    width: ${props => (props.larg + '%')};
    height: 88vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 5px;
    background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};

    overflow: auto;
    overflow-x: hidden;
    scrollbar-width: none; /* Masque l'ascenseur Firefox */
    -ms-overflow-style: none; /* Masque l'ascenseur IE 10+ */
    &::-webkit-scrollbar {
        width: 0; /* Masque l'ascenseur Chrome, Safari et Opera */
    }
`

// Composant
const User = () => {
    const { theme } = useContext(ThemeContext)

    // User
    const { userid } = useParams()

    // AuthUser
    const userId = useSelector(state => state.user.id)

    let confidencial = false
    if (userId === Number(userid)) {confidencial = true}

    const UserInfos = () => {         
        const { data: dataUser, isLoading: isLoadingUser, error: errorUser } = useQuery(['dataUser'], () =>
            makeRequest.get(`/user/${userid }`).then((res) => {
                //console.log("res.data:", res.data)
                return res.data
            })
        )
        //console.log("dataUser:", dataUser);
        
        return (
            <>
                {isLoadingUser ? (
                <Loader id="loader" />
                ) : (
                <>
                    {errorUser && (
                        <Popup texte={errorUser} type='error' />
                    )}
                    {dataUser && (
                        <>
                            <Profile {...dataUser.datas}/>
                        </>
                    )}
                </>
                )}
            </>
        )
    }

    // Posts
    const Posts = () => {    
        const { data: dataPosts, isLoading: isLoadingPosts, error: errorPosts } = useQuery(['dataPosts'], () =>
            makeRequest.get(`/userposts/${userid }`).then((res) => {
                return res.data
            })
        )
        //console.log("dataPost:", dataPosts);

        return (
            <>
                {isLoadingPosts ? (
                    <Loader id="loader" />
                ) : (
                <>
                    {errorPosts && (
                        <Popup texte="Le chargement des publications de cet utilisateur est erroné !" type='error' />
                    )}
                    {dataPosts.datas && (
                        <>
                            {dataPosts.datas.map((post, index) => (
                                <Post key={index} post={post} theme={theme} confidencial={confidencial}/>
                            ))
                            }
                        </>
                    )}
                </>
                )}
            </>
        )
    }

    const [posts, setPosts] = useState([]) // Etat des post de l'utilisateur
    const updatePosts = (newPost) => {
        // Ajouter le nouveau post à la liste des posts
        setPosts([...posts, newPost])
    }

    // Composant 
    return (        
        <PageContainer>
            {/* Groupes */}
            <Groupes larg={25}/>

            <ProfilContainer theme={theme} larg={(confidencial ? 50 : 80)}>
                {/* Infos user */}
                <div>
                    <UserInfos />
                </div>

                { userId.toString() === userid ? (
                    <NewPost
                        userId={userId}
                        updatePosts={updatePosts} 
                    />
                ) : (<></>)}

                {/* Posts */}
                <div>
                    <Posts />
                </div>
                
            </ProfilContainer>

            { confidencial && (
                <Tchat type="private" larg={30}/>
            )}
        </PageContainer>
    )
}

export default User