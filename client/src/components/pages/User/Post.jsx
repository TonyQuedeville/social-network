import React, {useState} from 'react'
import { Loader } from '../../../utils/Atom.jsx'
import Popup from '../../Popup/Popup.jsx'
import DisplayImage from '../../DisplayImage/DisplayImage.jsx'
import Comment from './Comment.jsx'
import styled from 'styled-components'
import colors from '../../../utils/style/Colors.js'
import { useQuery } from '@tanstack/react-query'
import RadioBouton from '../../RadioBouton/RadioBouton.jsx'
import FrenchFormatDateConvert from '../../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'

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
	justify-content: space-between;
	margin: 5px;
	font-style: italic;
	font-size: 0.8em;
	color: grey;
`
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

// Composant
const Post = ({ post, theme, confidencial }) => {
  const [PostConfidencial, setPostConfidencial] = useState(post.confidentialité)

  const handlePostConfidencialChange = (event) => {
    setPostConfidencial(event.target.value)
    //console.log("PostConfidencial:", PostConfidencial)
}

  const Comments = () => {
    const { data: dataComments, isLoading: isLoadingComments, error: errorComments } = useQuery(
      ['dataComment'],
      () => fetch('http://localhost:8080/comments.json').then((res) => res.json())
      // http://localhost:8080/postId?${post.post-id}
    )

    return (
      <>
        {isLoadingComments ? (
          <Loader id="loader" />
        ) : (
          <>
            {errorComments && <Popup texte="Le chargement des publications de cet utilisateur est erroné !" type="error" />}
            {dataComments && (
              <>
                {dataComments.comments.map((comment, index) => (
                  <Comment key={index} comment={comment} theme={theme} />
                ))}
              </>
            )}
          </>
        )}
      </>
    )
  }

  return (
    <PostContainer  theme={theme}>
      <StyleInfo>
        <div>{post.pseudo}</div>
        <div>{FrenchFormatDateConvert(post.dateheure)}</div>
        <div>{confidencial ? (
          <StyleGroupButton>
            <RadioBouton
                id={`PostConfidencialPublic-${post['post-id']}`}
                label="Public"
                value="public"
                checked={PostConfidencial === 'public'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
            />
            <RadioBouton
                id={`PostConfidencialPrivate-${post['post-id']}`}
                label="Privé"
                value="private"
                checked={PostConfidencial === 'private'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
            />
            <RadioBouton
                id={`PostConfidencialPrivateList-${post['post-id']}`}
                label="Liste"
                value="private-list"
                checked={PostConfidencial === 'private-list'}
                onChange={handlePostConfidencialChange}
                alignment="vertical"
            />
        </StyleGroupButton>
        ) : (
          post.confidentialité
        )}
        </div>
      </StyleInfo>
      <StyleTitlePublication>{post.title}</StyleTitlePublication>
      {post.image ? (
      <DisplayImage
        id={"postImage-" + post.id}
        src={require(`../../../assets/img/${post.image}`).default}
        alt={"Image " + post.title}
        disabled={false}
      />
      ) : <></>}
      <StylePostContent>{post.content}</StylePostContent>  
      <Comments/>
    </PostContainer>
  )
}

export default Post;
