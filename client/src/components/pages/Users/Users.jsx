/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant User : Affiche la liste des utilisateurs inscrits
  Page Users : Route http://localhost:3000/users
*/

import React, { useContext, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../utils/Axios/Axios.js'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
import { Loader } from '../../../utils/Atom.jsx'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../../utils/style/Colors.js'
import Popup from '../../Popup/Popup.jsx'
import Profile from '../../Profile/Profile.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnAddFriend from '../../../assets/icn/icn-addfriend.png'
import IcnSupFriend from '../../../assets/icn/icn-supfriend.jpg'

const queryClient = new QueryClient()

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  border: solid 1px;
  border-radius: 5px;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
`
const StyledLink = styled.div`
  text-decoration: none;  
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  border-radius: 5px;        
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  margin: 10px;
  transition: 200ms;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;    
    box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
  }
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite })` : colors.backgroundDark)};
`

const Users = () => {
  const { theme } = useContext(ThemeContext)

  const user = useSelector(state => state.user)
  const followedId = (user.followed||[]).map(follow => follow.id) 

  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

  // Redirection vers la page "/user/userid"
  const handleUserClick = (userid) => {
    navigate(`/user/${userid}`)
  }

  // Demande d'ajout de follower
  const handleAddFollowerClick = async (userid) => {
    // Requete de demande d'ajout follower vers app-social-network
    try{
      const response = await makeRequest.get(`/addfollower/${userid}`)
      const responseData = response.data
      console.log("addfollower:", responseData.datas)
      setFetchError(false)
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  // demande de suppression de follower
  const handleSupFollowerClick = async (userid) => {
    // Requete de demande d'ajout follower vers app-social-network
    try{
      try{
        await makeRequest.get(`/supfollower/${userid}`)
        setFetchError(false)
      }
      catch (err) {
          setNotification(err.message + " : " + err.response.data.error)
          setFetchError(true)
      }
      finally {
      }
    }
    catch (err) {
        setNotification(err.message + " : " + err.response.data.error)
        setFetchError(true)
    }
    finally {
    }
  }

  const UsersList = () => { 
    const { data: dataUsers, isLoading: isLoadingUsers, error: errorUsers } = useQuery(['dataUsers'], () =>
      makeRequest.get(`/users`).then((res) => {
        return res.data
      })
    )
    //console.log("dataUsers:", dataUsers);
    
    return (
      <>
        {isLoadingUsers ? (
        <Loader id="loader" />
        ) : (
        <>
          {errorUsers && (
            <Popup texte="Le chargement de la liste des utilisateurs est erroné !" type='error' />
          )}
          {dataUsers && (
            dataUsers.datas.map((u, index) => (
              user.pseudo !== u.pseudo || !user.isAuthenticated ? 
                <StyledLink     
                  theme={theme}            
                  key={`${u.pseudo}-${index}`} 
                  id={`user-link-${u.pseudo}`}
                  onClick={() => handleUserClick(u.id)}
                >
                  <>
                    <Profile 
                      {...u} 
                    />
                    { u.pseudo && 
                      <>
                        { user.followed && followedId.includes(u.id) ?
                          <>
                            <Icone 
                              alt="Ne plus suivre"
                              image={IcnSupFriend}
                              disabled={false}
                              onClick={() => handleSupFollowerClick(u.id)}
                            />
                          </>
                        : 
                          <Icone 
                            alt="Suivre"
                            image={IcnAddFriend}
                            disabled={false}
                            onClick={() => handleAddFollowerClick(u.id)}
                          />
                        }
                      </>
                    }
                  </>
                </StyledLink>
              : null
            ))
          )}
        </>
        )}
      </>
    )
  }

  return (
    <ListContainer theme={theme}>
      {/* list users */}
      <QueryClientProvider client={queryClient}>
        <UsersList />
      </QueryClientProvider>

      {fetchError && notification && (
        <Popup texte={notification} type='error' />
      )}
    </ListContainer>
  )
}

export default Users