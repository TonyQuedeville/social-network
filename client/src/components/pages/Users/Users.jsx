// src/components/pages/Users

import React, { useContext } from 'react'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../../utils/Atom.jsx'
import Popup from '../../Popup/Popup.jsx'
import Profile from '../../Profile/Profile.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnAddFriend from '../../../assets/icn/icn-addfriend.png'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
const queryClient = new QueryClient()

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
  const { authPseudo } = useContext(AuthContext);
  //console.log("authPseudo: ", authPseudo);

  const navigate = useNavigate();
  const handleUserClick = (username) => {
    //console.log("username:", username)
    navigate(`/user/${username}`)
  }

  //const [notification, setNotification] = useState('')
  const UsersList = () => {    
    const { data: dataUsers, isLoading: isLoadingUsers, error: errorUsers } = useQuery(['dataUsers'], () =>
        fetch(`http://localhost:8080/users.json`).then((res) => res.json())
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
                    dataUsers.users.map((user, index) => (
                      authPseudo !== user.pseudo ? 
                        <StyledLink                 
                          key={`${user.pseudo}-${index}`} 
                          id={`user-link-${user.pseudo}`}
                          onClick={() => handleUserClick(user.pseudo)}
                        >
                          <>
                            <Profile 
                              //{...user} // syntaxe impossible à cause de hideStatus
                              pseudo={user.pseudo}
                              sexe={user.sexe}
                              aboutme={user.aboutme}
                              photoProfile={user.photoProfile}
                              lastname={user.lastname}
                              firstname={user.firstname}
                              bornDate={user.bornDate}
                              hideStatus={true}
                            />
                            <Icone 
                              alt="Ajouter"
                              image={IcnAddFriend}
                              disabled={false}
                            />
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
    <ListContainer>
      {/* list users */}
      <QueryClientProvider client={queryClient}>
        <UsersList />
      </QueryClientProvider>
    </ListContainer>
  )
}

export default Users