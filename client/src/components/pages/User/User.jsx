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
import TextArea from '../../TextArea/TextArea.jsx'
import Button from '../../Button/Button.jsx'

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
const PostItem = ({ post }) => {
    return (
        <PostContainer>
            <div>
                <p>title={post.title}</p>
                <p>value={post.content}</p>
            </div>
        </PostContainer>
    );
};
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
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const User = () => {
    // User
    const { username } = useParams()
    //console.log("username:", username);
    const { dataUser, isLoading, errorUser } = useFetch(`http://localhost:8080/${username.toLowerCase()}.json`)
    console.log("Users data:",dataUser);
    
    // Posts
    const { dataPosts, isLoadingPosts, errorPosts } = useFetch(`http://localhost:8080/posts.json`)
    console.log("dataPosts:", dataPosts)

    // Users
    const { dataUsers} = useFetch(`http://localhost:8080/users.json`)
    console.log("dataUsers:", dataUsers)

    // New Post
    const [newPostContent, setNewPostContent] = useState('')
    //const { dataNewPosts, isLoadingNewPosts, errorNewPosts } = useFetch('http://localhost:8080/newposts.json')
    
    const handleNewPostSubmit = (event) => {
        console.log("handleNewPostSubmit:",event)
    }
    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value)
        console.log("handleNewPostChange:",newPostContent)
    }
    const CancelNewPost = () => {
        setNewPostContent('');
        //console.log("annuler new post !");
    }
    
    // Gestion d'erreurs
    const [notification, setNotification] = useState('')
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (errorUser) {
            setNotification("Le chargement des données de cet utilisateur est erroné !")
            setFetchError(true)
        }
        if (errorPosts) {
            setNotification("Le chargement des publications de cet utilisateur est erroné !")
            setFetchError(true)
        }
        //if (errorNewPosts) {
        //    setNotification("L'envoi de cette publicaion a échouée !")
        //    setFetchError(true)
        //}
    },[errorUser, errorPosts])

    // Composant 
    return (
        <PageContainer>
            <Groupes larg={25}/>

            <ProfilContainer>
                {/* Infos user */}
                {isLoading ? (
                    <Loader id="loader"/>
                ) : (
                    <>
                        { fetchError && notification && (
                            <Popup texte={notification} type='error' />
                        )}
                        { !errorUser && dataUser && (
                            <Profile {...dataUser}/>
                        )}
                    </>
                )} 

                {/* New post */}
                <PostContainer> 
                    <form onSubmit={handleNewPostSubmit}>
                        <TextArea
                            id="new-post"
                            label="nouvelle publication"
                            rows={3}
                            cols={61}
                            value={newPostContent}
                            onChange={handleNewPostChange}
                        />
                        <StyleGroupButton>
                            <Button 
                                type="submit" 
                                text="Publier" 
                                disabled={false} 
                            />
                            <Button 
                                text="Annuler" 
                                disabled={false} 
                                onClick={CancelNewPost}
                            />
                        </StyleGroupButton>
                    </form>
                </PostContainer>

                {/* Posts */}
                {isLoadingPosts ? (
                    <Loader id="loader"/>
                ) : (
                    <>
                    { fetchError && notification && (
                        <Popup texte={notification} type='error' />
                    )}
                    {!errorPosts && dataPosts && (
                        <>
                            {console.log("dataPots:", dataPosts)}
                            {dataPosts.posts.map((post, index) => (
                                <PostItem key={index} post={post} />
                            ))}
                        </>
                    )}
                    </>
                )}
            </ProfilContainer>

            <Tchat larg={25}/>
        </PageContainer>
    )
}

export default User