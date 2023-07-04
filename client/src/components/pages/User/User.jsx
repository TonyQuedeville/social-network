// src/components/pages/User

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
//import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx';
import { Loader } from '../../../utils/Atom.jsx'
import styled from 'styled-components'
import Profile from '../../Profile/Profile.jsx'
import Groupes from '../../Groupes/Groupes.jsx'
import Tchat from '../../Tchat/Tchat.jsx'
import Popup from '../../Popup/Popup.jsx'
import TextArea from '../../TextArea/TextArea.jsx'
import Button from '../../Button/Button.jsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
const queryClient = new QueryClient()

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
const PostItem = ({ post }) => {
    return (
        <PostContainer>
            <div>
                <p>{post.title}</p>
                <p>{post.content}</p>
            </div>
        </PostContainer>
    );
};

const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`


const User = () => {
    // User
    //const { authPseudo } = useContext(AuthContext);
    //console.log("authPseudo: ", authPseudo);
    const { username } = useParams()
    //console.log("username:", username);

    const UserInfos = () => {    
        const { data: dataUser, isLoading: isLoadingUser, error: errorUser } = useQuery(['dataUser'], () =>
            fetch(`http://localhost:8080/${username.toLowerCase()}.json`).then((res) => res.json())
        );
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
        );
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
                            <PostItem key={index} post={post} />
                            ))}
                        </>
                    )}
                </>
                )}
            </>
        )
    }

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
    //const [notification, setNotification] = useState('')
    //const [fetchError, setFetchError] = useState(false)
    //useEffect(() => {
    //    if (errorNewPosts) {
    //        setNotification("L'envoi de cette publicaion a échouée !")
    //        setFetchError(true)
    //    }
    //},[errorNewPosts])

    // Composant 
    return (        
        <PageContainer>
            <Groupes larg={25}/>

            <ProfilContainer>
                {/* Infos user */}
                <QueryClientProvider client={queryClient}>
                    <UserInfos />
                </QueryClientProvider>

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
                <QueryClientProvider client={queryClient}>
                    <Posts />
                </QueryClientProvider>
            </ProfilContainer>

            <Tchat larg={25}/>
        </PageContainer>
    )
}

export default User