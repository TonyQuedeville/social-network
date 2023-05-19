// src/components/pages/Users

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../../utils/Atom.jsx'
import Popup from '../../Popup/Popup.jsx'
import Profile from '../../Profile/Profile.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnAddFriend from '../../../assets/icn/icn-addfriend.png'
import { useFetch } from '../../../utils/hooks/useFetch.jsx'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  border: solid 1px;
  border-radius: 10px;
`
const StyledLink = styled.div`
  text-decoration: none;  
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  border-radius: 10px;        
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  margin: 10px;
  transition: 200ms;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;    
    box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
  }
`

const Users = () => {
  //const { isLoggedIn, usernameOrEmail } = useContext(AuthContext);
  //console.log("isLoggedIn: ", isLoggedIn);
  //console.log("usernameOrEmail: ", usernameOrEmail);

  const navigate = useNavigate();
  const handleUserClick = (username) => {
    //console.log("username:", username)
    navigate(`/user/${username}`)
  }

  const [notification, setNotification] = useState('')
  const { dataUser, isLoading, error } = useFetch(`http://localhost:8080/users.json`)
  //console.log("Users data:",dataUser);
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    if (error) {
      setNotification("Le chargement des données utilisateurs est erroné !")
      setFetchError(true)
    }
  },[error])
  //*/

  return (
    <ListContainer>
      {isLoading ? (
        <Loader id="loader"/>
      ) : (
        <>
          { fetchError && notification && (
            <Popup texte={notification} type='error' />
          )}
          { !fetchError && dataUser && (
            dataUser.users.map((user, index) => (
              <StyledLink                 
              key={`${user.pseudo}-${index}`} 
              id={`user-link-${user.pseudo}`}
              onClick={() => handleUserClick(user.pseudo)}
              >
                <>
                  <Profile {...user}/>
                  <Icone 
                    alt="Demande d'ami" 
                    image={IcnAddFriend}
                    disabled={false}
                  />
                </>
              </StyledLink>
            ))
          )}
        </>
      )} 
    </ListContainer>
  )
}

export default Users