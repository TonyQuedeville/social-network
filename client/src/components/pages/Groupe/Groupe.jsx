/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Groupe : Affiche l'ensemble des données d'un groupe de discution
  Page Groupe : Route http://localhost:3000/group/:groupId
*/

import React, { useContext } from 'react'
//import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx'
import { GroupContext } from '../../../utils/GroupProvider/GroupProvider.jsx'
import { Loader } from '../../../utils/Atom.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../../utils/Axios/Axios.js'
//import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../../utils/style/Colors.js'
//import InputText from '../InputText/InputText.jsx'
//import TextArea from '../TextArea/TextArea.jsx'
//import Button from '../Button/Button.jsx'
//import RadioBouton from '../RadioBouton/RadioBouton.jsx'
//import Icone from '../Icone/Icone.jsx'
//import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
//import InputFileImage from '../InputFileImage/InputFileImage.jsx'
//import DisplayImage from '../DisplayImage/DisplayImage.jsx'
//import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import Popup from '../../Popup/Popup.jsx'
import GroupeInfos from '../../GroupeInfos/GroupeInfos.jsx'
import NewPost from '../../NewPost/NewPost.jsx'
import Post from '../../Post/Post.jsx'

// css
const PageContainer = styled.div`
  height: 87vh;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
  
  overflow: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Masque l'ascenseur Firefox */
  -ms-overflow-style: none; /* Masque l'ascenseur IE 10+ */
  &::-webkit-scrollbar {
      width: 0; /* Masque l'ascenseur Chrome, Safari et Opera */
  }
`
const StylePostsContainer = styled.div`
  margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`

// Composant
const Groupe = () => {
  const { theme } = useContext(ThemeContext)

  const { authPseudo, authId } = useContext(AuthContext)
  //console.log("authPseudo:", authPseudo, "authId:", authId)
  const data = useContext(GroupContext)
  //console.log(data)

  let confidencial = false
  if (data.membersIdList.includes(authId)) {confidencial = true}

  const handleFollowersChange = (follower) => {
    console.log("follower:", follower)
  }

  // Posts
  const Posts = () => {    
    const { data, isLoading, error } = useQuery(['dataPost'], () =>
      makeRequest.get(`/groupposts/${data.groupId}`).then((res) => {
        return res.data
      })
    )
    //console.log("dataPosts:", data);

    return (
      <>
        {isLoading ? (
        <Loader id="loader" />
        ) : (
        <>
          {error && (
            <Popup texte="Le chargement des publications de ce groupe est erroné !" type='error' />
          )}
          {data && (
            <>
              {data.posts.map((post, index) => (
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

  return (
    <PageContainer theme={theme}>
      {/* Infos Groupe */}
      <GroupeInfos {...data} />

      {authPseudo && data.membersIdList.includes(authId) && (
        <div>
          {data.admin === authPseudo ? (
            <div>Fonctionnalités supplémentaires réservées à l'administrateur</div>
          ) : null}

          <NewPost
            follower={data.membersIdList}
            onChange={handleFollowersChange}
          />

          <StylePostsContainer theme={theme}>
            <Posts />
          </StylePostsContainer>
        </div>
      )}
    </PageContainer>
  )
}

export default Groupe