/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant User : Affiche l'ensemble des données d'un utilisateur
    Page User : Route http://localhost:3000/user/:userid
*/

import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx'
import { Loader } from '../../../utils/Atom.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
//import axios from "axios"
import { makeRequest } from '../../../utils/Axios/Axios.js'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../../utils/style/Colors.js'
import Profile from '../../Profile/Profile.jsx'
import Groupes from '../../Groupes/Groupes.jsx'
import Tchat from '../../Tchat/Tchat.jsx'
import Popup from '../../Popup/Popup.jsx'
//import InputText from '../../InputText/InputText.jsx'
//import TextArea from '../../TextArea/TextArea.jsx'
//import Button from '../../Button/Button.jsx'
//import RadioBouton from '../../RadioBouton/RadioBouton.jsx'
//import Icone from '../../Icone/Icone.jsx'
//import IcnPhoto from '../../../assets/icn/icn_appareil_photo.svg'
//import InputFileImage from '../../InputFileImage/InputFileImage.jsx'
//import DisplayImage from '../../DisplayImage/DisplayImage.jsx'
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
    width: 50%;
    height: 88vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
    background: ${props => (props.theme === 'light' ? colors.backgroundLight : colors.backgroundDark)};

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

    // AuthUser
    const { authPseudo, followed, follower } = useContext(AuthContext)
    //console.log("authPseudo: ", authPseudo, "followed:", followed, "follower:", follower);
    //const follower // users qui suivent authPseudo
    //const followed // users suivis par authPseudo

    // User
    const { userid } = useParams()
    //console.log("userid:", userid);

    let confidencial = false
    if (authPseudo === userid) {confidencial = true}

    const UserInfos = () => {         
        const { data: dataUser, isLoading: isLoadingUser, error: errorUser } = useQuery(['dataUser'], () =>
            makeRequest.get(`/user/${userid}`).then((res) => {
                console.log("res.data:", res.data);
                return res.data
            })
        )
        console.log("dataUser:", dataUser);
        
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
        const { data: dataPosts, isLoading: isLoadingPosts, error: errorPosts } = useQuery(['dataPost'], () =>
            makeRequest.get(`/posts.json`).then((res) => {
                return res.data
            })
        )
        console.log("dataPost:", dataPosts);

        return (
            <>
                {isLoadingPosts ? (
                    <Loader id="loader" />
                ) : (
                <>
                    {errorPosts && (
                        <Popup texte="Le chargement des publications de cet utilisateur est erroné !" type='error' />
                    )}
                    {dataPosts && (
                        <>
                            {dataPosts.posts.map((post, index) => (
                                post.status === "public" || authPseudo === userid || 
                                (post.status === "private" && followed.includes(userid)) ||
                                (post.status === "private-list" && post.private_list.includes(authPseudo)) ? (
                                    <Post key={index} post={post} theme={theme} confidencial={confidencial}/>
                                ) : null
                            ))}
                        </>
                    )}
                </>
                )}
            </>
        )
    }

    const handleFollowersChange = (follower) => {        
        console.log("follower:", follower)
    }

    // Composant 
    return (        
        <PageContainer>
            <Groupes larg={25}/>

            <ProfilContainer theme={theme}>
                {/* Infos user */}
                <div>
                    <UserInfos />
                </div>

                { authPseudo === userid ? (
                    <NewPost 
                        follower={follower}
                        onChange={handleFollowersChange}
                    />
                ) : (<></>)}

                {/* Posts */}
                <div>
                    <Posts />
                </div>

                {/* Affichage de la private-list */}
                
            </ProfilContainer>

            <Tchat larg={25}/>
        </PageContainer>
    )
}

export default User