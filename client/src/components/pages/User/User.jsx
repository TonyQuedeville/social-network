// src/components/pages/User

import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx';
import { Loader } from '../../../utils/Atom.jsx'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../../utils/style/Colors.js'
import Profile from '../../Profile/Profile.jsx'
import Groupes from '../../Groupes/Groupes.jsx'
import Tchat from '../../Tchat/Tchat.jsx'
import Popup from '../../Popup/Popup.jsx'
import InputText from '../../InputText/InputText.jsx'
import TextArea from '../../TextArea/TextArea.jsx'
import Button from '../../Button/Button.jsx'
import RadioBouton from '../../RadioBouton/RadioBouton.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnPhoto from '../../../assets/icn/icn_appareil_photo.svg'
import InputFileImage from '../../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../../DisplayImage/DisplayImage.jsx'
import Post from './Post.jsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
const queryClient = new QueryClient()

// css
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`
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
const NewPostContainer = styled.div`
    width: 97%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
    background: ${props => (props.theme === 'light' ? colors.backgroundLightSoft : colors.backgroundDark)};
`
const StyleTitlePublication = styled.div`
    font-weight : bold;
    display: flex;
    justify-content: center;
    margin: 5px;
`

// Composant
const User = () => {
    const { theme } = useContext(ThemeContext)
    
    // AuthUser
    const { authPseudo, followedUsers } = useContext(AuthContext);
    //console.log("authPseudo: ", authPseudo);
    //const followedUsers = ["Titi"] // followers qui suivent authPseudo
    //const allowedUsers = ["Toto", "Tutu"] // liste de followers que authPseudo autorise sur le post
    
    // User
    const { username } = useParams()
    //console.log("username:", username);

    let confidencial = false
    if (authPseudo === username) {confidencial = true}

    const UserInfos = () => {    
        const { data: dataUser, isLoading: isLoadingUser, error: errorUser } = useQuery(['dataUser'], () =>
            fetch(`http://localhost:8080/${username.toLowerCase()}.json`).then((res) => res.json())
            // http://localhost:8080/user?username.toLowerCase()
        )
        //console.log("dataUser:", dataUser);
        
        return (
            <>
                {isLoadingUser ? (
                <Loader id="loader" />
                ) : (
                <>
                    {errorUser && (
                        <Popup texte="Le chargement des informations de cet utilisateur est erroné !" type='error' />
                    )}
                    {dataUser && (
                        <>
                            <Profile {...dataUser}/>
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
            fetch('http://localhost:8080/posts.json').then((res) => res.json())
            // http://localhost:8080/post?username
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
                    {dataPosts && (
                        <>
                            {dataPosts.posts.map((post, index) => (
                                post.confidentialité === "public" || authPseudo === username || 
                                (post.confidentialité === "private" && followedUsers.includes(username)) ||
                                (post.confidentialité === "private-list" && post.allowedUsers.includes(authPseudo)) ? (
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

    // New Post
    const [titleNewPost, setTitleNewPost] = useState('')
    const [newPostContent, setNewPostContent] = useState('')
    const [postImage, setPostImage] = useState(null);
    const [showInputFile, setShowInputFile] = useState(false);
    const [validNewPostisDisabled, setValidNewPostisDisabled] = useState(true);
    const [newPostConfidencial, setNewPostConfidencial] = useState('private');
    //const { dataNewPosts, isLoadingNewPosts, errorNewPosts } = useFetch('http://localhost:8080/newposts.json')

    const handleNewPostSubmit = (event) => {
        //console.log("handleNewPostSubmit:",event)
    }
    const handleTitleNewPostChange = (event) => {
        setTitleNewPost(event.target.value)
        //console.log("setTitleNewPost:", titleNewPost)
    }
    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value)
        //console.log("handleNewPostChange:", newPostContent)
    }
    const handleNewPostConfidencialChange = (event) => {
        setNewPostConfidencial(event.target.value)
        console.log("newPostConfidencial:", newPostConfidencial)
    }
    const CancelNewPost = () => {
        setNewPostContent('')
        setTitleNewPost('')
        setPostImage('')
        //console.log("annuler new post !");
    }

    // Image post
    const loadPhotoPost = () => {
        //console.log("loadPhotoPost !")
        setShowInputFile(true)
    }
    const handlePostImageChange = (file) => {
        setPostImage(file)
        setShowInputFile(false)
    }
    
    // Gestion d'erreurs
    //const [notification, setNotification] = useState('')
    //const [fetchError, setFetchError] = useState(false)
    //useEffect(() => {
    //    if (errorNewPosts) {
    //        setNotification("L'envoi de cette publicaion a échouée !")
    //        setFetchError(true)
    //    }
    //},[errorNewPosts])

    useEffect(() => {
        setValidNewPostisDisabled(!(titleNewPost && newPostContent))
    }, [titleNewPost, newPostContent])

    // Composant 
    return (        
        <PageContainer  theme={theme}>
            <Groupes larg={25}/>

            <ProfilContainer theme={theme}>
                {/* Infos user */}
                <QueryClientProvider client={queryClient}>
                    <UserInfos />
                </QueryClientProvider>

                {/* New post */}
                { authPseudo === username ? (
                    <NewPostContainer theme={theme}> 
                        <form onSubmit={handleNewPostSubmit}>
                            <StyleTitlePublication>Nouvelle publication</StyleTitlePublication>
                            <InputText
                                id="titleNewPost"
                                label="Titre"
                                title="Titre de publication"
                                placeholder="Titre de publication"
                                value={titleNewPost}
                                onChange={handleTitleNewPostChange}
                                required
                                size={470}
                            />
                            <TextArea
                                id="new-post"
                                label=""
                                title="contenu de publication"
                                placeholder="c'est là qu'tu cause !"
                                rows={3}
                                cols={61}
                                value={newPostContent}
                                onChange={handleNewPostChange}
                            />

                            {showInputFile && (
                                <InputFileImage 
                                    id="fileProfileImage"
                                    value={postImage}
                                    onChange={handlePostImageChange} 
                                />
                            )}                           
                            {postImage && (
                                <DisplayImage
                                    id="postImage"
                                    src={URL.createObjectURL(postImage)} 
                                    alt="Post image"
                                    disabled={false}
                                />
                            )}
                            
                            <StyleGroupButton>
                                <Icone 
                                    alt="Post image" 
                                    //disabled={!postImage} 
                                    image={IcnPhoto}
                                    onClick={loadPhotoPost}
                                />
                                <StyleGroupButton>
                                    <RadioBouton
                                        id="newPostConfidencialPublic"
                                        label="Public"
                                        value="public"
                                        checked={newPostConfidencial === 'public'}
                                        onChange={handleNewPostConfidencialChange}
                                        alignment="vertical"
                                    />
                                    <RadioBouton
                                        id="newPostConfidencialPrivate"
                                        label="Privé"
                                        value="private"
                                        checked={newPostConfidencial === 'private'}
                                        onChange={handleNewPostConfidencialChange}
                                        alignment="vertical"
                                    />
                                    <RadioBouton
                                        id="newPostConfidencialPrivateList"
                                        label="Liste"
                                        value="private-list"
                                        checked={newPostConfidencial === 'private-list'}
                                        onChange={handleNewPostConfidencialChange}
                                        alignment="vertical"
                                    />
                                </StyleGroupButton>
                                <Button 
                                    type="submit" 
                                    text="Publier" 
                                    disabled={validNewPostisDisabled} 
                                />
                                <Button 
                                    text="Annuler" 
                                    disabled={false} 
                                    onClick={CancelNewPost}
                                />
                            </StyleGroupButton>
                        </form>
                    </NewPostContainer>
                ) : (<></>)}

                {/* Posts */}
                <QueryClientProvider client={queryClient}>
                    <Posts />
                </QueryClientProvider>
            </ProfilContainer>

            <Tchat larg={25}/>
        </PageContainer>
    )
}

export default User