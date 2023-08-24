/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Groupe : Affiche l'ensemble des données d'un groupe de discution
  Page Groupe : Route http://localhost:3000/group/:groupId
*/

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Loader } from '../../../utils/Atom.jsx'
import { useQuery } from '@tanstack/react-query' //'react-query'
import { makeRequest } from '../../../utils/Axios/Axios.js'
import styled from 'styled-components'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../../utils/style/Colors.js'
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
	border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
	border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
`

// Composant
const Groupe = () => {
  // Contexte
  const { theme } = useContext(ThemeContext)
  const user = useSelector(state => state.user)
  const { groupId } = useParams()
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (groupId) {
        const { data, error } = await makeRequest.get(`/groupe/${groupId}`);
        if (!error) {
          setGroupData(data.datas)
          //dispatch(updateGroupData(data.datas));
          setIsLoading(false)
        }
      }
    };
    fetchData();
  }, [groupId]);

  //console.log("groupData :", groupData);

  // Posts
  const Posts = () => {  
    const { data, isLoading, error } = useQuery(['dataPosts'], async () =>
      await makeRequest.get(`/groupposts/${groupId}`).then((res) => {
        //console.log("groupposts !", res.data);
        return res.data
      })
    )
    //console.log("dataPosts:", data.datas);

    return (
      <>
        {isLoading ? (
          <Loader id="loader" />
        ) : (
        <>
          {error && (
            <Popup texte="Le chargement des publications de ce groupe est erroné !" type='error' />
          )}
          {data.datas && (
            <>
              {data.datas.map((post, index) => (
                (post.status === "private-list") ? (
                  <Post key={index} post={post} theme={theme} confidencial={false}/>
                ) : null
              ))}
            </>
          )}
        </>
        )}
      </>
    )
  }

  if (isLoading) {
    // Affiche un indicateur de chargement tant que les données ne sont pas prêtes
    return <Loader />;
  } 
  
  return (
    <PageContainer theme={theme}>
      { groupData && (
        <>
          {/* Infos Groupe */}
          <GroupeInfos {...groupData} />

          {user.pseudo && groupData.members.includes(user.id) && (
            <>
              {groupData.admin === user.pseudo ? (
                <div>Fonctionnalités supplémentaires réservées à l'administrateur</div>
              ) : null}

              <NewPost
                group={groupId}
                groupMembers={groupData.members}
              />

              <StylePostsContainer theme={theme}>
                <Posts />
              </StylePostsContainer>
            </>
          )}
        </>
      )}
    </PageContainer>
  )
}

export default Groupe
