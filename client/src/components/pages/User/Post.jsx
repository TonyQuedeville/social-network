import React from 'react'
import { Loader } from '../../../utils/Atom.jsx'
import Popup from '../../Popup/Popup.jsx'
import DisplayImage from '../../DisplayImage/DisplayImage.jsx'
import Comment from './Comment.jsx'
import styled from 'styled-components'
import colors from '../../../utils/style/Colors.js'
import { useQuery } from '@tanstack/react-query';

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

// Composant
const Post = ({ post, theme }) => {
	//const { theme } = useContext(ThemeContext)

  const Comments = () => {
    const { data: dataComments, isLoading: isLoadingComments, error: errorComments } = useQuery(
      ['dataComment'],
      () => fetch('http://localhost:8080/comments.json').then((res) => res.json())
      // http://localhost:8080/postId?${post.post-id}
    );

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
        <div>{post.dateheure}</div>
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
