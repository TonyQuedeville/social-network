/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Post : Affiche un posts et appel les commentaires qui lui sont associés
*/

import React, {useState, useContext} from 'react'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { Loader } from '../../utils/Atom.jsx'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../utils/Axios/Axios.js'
//import Popup from '../Popup/Popup.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import NewComment from '../NewComment/NewComment.jsx'
import Comment from '../Comment/Comment.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import FollowersSelector from '../FollowersSelector/FollowersSelector.jsx'


// css
const PostContainer = styled.div`
	width: 96%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 10px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
	background: ${props => (props.theme === 'light' ? colors.backgroundWhite : colors.backgroundDarkSoft)};
`
const StyleTitlePublication = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
`
const StylePostContent = styled.div`
	width: 98%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
`
const StyleInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 5px;
`
const StyleGroupButton = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
const StyleItalic = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  font-style: italic;
  font-size: 0.8em;
	color: grey;
`
const Style33 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

// Composant
const Post = ({ post, theme, confidencial }) => {
  // AuthUser
  const { authId, follower } = useContext(AuthContext)
  const [privateList, setPrivateList] = useState([])
  const [PostConfidencial, setPostConfidencial] = useState(post.status)
  const [showFollowersSelector, setShowFollowersSelector] = useState(false)

  // Fenetre de selection followers (private-list)
	const handleSelectedPrivatelistChange = (event) => {
    //console.log("handleSelectedPrivatelistChange :", event)
    setPrivateList(event)
    //onChange(event)
  }
  const handleFollowersSelectorClose = () => {
    setShowFollowersSelector(false)
  }

  const handlePostConfidencialChange = (event) => {
    setPostConfidencial(event.target.value)
    //console.log("PostConfidencial:", PostConfidencial)
    if (event.target.value === "private-list") {
			setShowFollowersSelector(true)
		} else {
			setShowFollowersSelector(false)
		}
}

  // Commentaires
  const Comments = () => {
    const { data: dataComments, isLoading: isLoadingComments } = useQuery(
      ['dataComment', post.id],
      () =>
        makeRequest.get(`/comments/${post.id}`).then((res) => {
          return res.data;
        }),
      {
        cacheTime: 0, // Désactiver la mise en cache
      }
    );

    return (
      <>
        {isLoadingComments ? (
          <Loader id="loader" />
        ) : (
          <>
            {dataComments.datas ? (
              <>
                {dataComments.datas.map((comment, index) => (
                  <Comment key={index} comment={comment} theme={theme} />
                ))}
              </>
            ) : <>
              {/* errorComments && <Popup texte="Post sans commentaire !" type="error" /> */}
              </>
            }
          </>
        )}
      </>
    )
  }

  const [comments, setComments] = useState([]) // Etat des commentaires du post
  const updateComments = (newComment) => {
    // Ajouter le nouveau commentaire à la liste des commentaires
    setComments([...comments, newComment])
  }

  return (
    <PostContainer  theme={theme}>
      <StyleInfo>
        <StyleItalic>
          <Style33>{post.pseudo}</Style33>
          <Style33>{FrenchFormatDateConvert(post.create_date)}</Style33>
          <Style33>{post.status}</Style33>
        </StyleItalic>
        <>{confidencial ? (
            <StyleGroupButton>
              <RadioBouton
                id={`PostConfidencialPublic-${post['post_id']}`}
                label="Public"
                value="public"
                checked={PostConfidencial === 'public'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
              />
              <RadioBouton
                id={`PostConfidencialPrivate-${post['post_id']}`}
                label="Privé"
                value="private"
                checked={PostConfidencial === 'private'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
              />
              <RadioBouton
                id={`PostConfidencialPrivateList-${post['post_id']}`}
                label="Liste"
                value="private-list"
                checked={PostConfidencial === 'private-list'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
              />
            </StyleGroupButton>
          ) : (
            post.confidentialité
          )
        }</>
      </StyleInfo>

      <StyleTitlePublication>{post.title}</StyleTitlePublication>

      {post.image ? (
        <DisplayImage
          id={"postImage-" + post.id}
          src={`http://${window.location.hostname}:4000/download/${post.image}`}
          alt={"Image " + post.title}
          disabled={false}
        />
      ) : <></>}
      
      <StylePostContent>{post.content}</StylePostContent>  

      {showFollowersSelector && (
				<FollowersSelector
          private_list={privateList}
          follower={follower}
          onChange={handleSelectedPrivatelistChange}
          onClose={handleFollowersSelectorClose}
          theme={theme}
      />
			)}

        { authId && 
          <NewComment 
            postId={post.id} 
            updateComments={updateComments} 
          /> 
        }

      <Comments/>
    </PostContainer>
  )
}

export default Post;
