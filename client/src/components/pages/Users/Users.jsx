// src/components/pages/Users

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Profile from '../Profile/Profile.jsx'
import Icone from '../../Icone/Icone.jsx'
import IcnAddFriend from '../../../assets/icn/icn-addfriend.png'
import { userlist } from '../../../datas/UserList.js'
import colors from '../../../utils/style/Colors.js'

const ListContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1px;
        border: solid 1px;
        border-radius: 10px;
    `
const StyledLink = styled(Link)`
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
        background: ${colors.backgroundLight};
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
    }
`

const Users = () => {
    /*const [notification, setNotification] = useState('')
    const { data, isLoading, error } = useFetch(`http://localhost:8080/users.json`)
    const { user } = data ?? {}; // Utilisation de l'opérateur de fusionnement de null pour initialiser user avec un objet vide

    if(error) setNotification("Le chargement des données de cet utilisateur sont erronées !")
    console.log("Le chargement des données de cet utilisateur sont erronées !");
    console.log("isLoading:", isLoading);
    console.log("data:", data);
    console.log("error:", error);
    console.log("user:", user);
    //*/

    return (
        <ListContainer>
            {userlist.map((user, index) => (
                <StyledLink                 
                    to={`/user/${user.pseudo}`} 
                    key={`${user.pseudo}-${index}`} 
                    id={`user-link-${user.pseudo}`}
                >
                    <>
                        <Profile
                            pseudo={user.pseudo}
                            photoProfile={user.photoProfile}
                            sexe={user.sexe}
                            title={user.jobTitle}
                        />
                        <Icone 
                            alt="Demande d'ami" 
                            image={IcnAddFriend}
                            disabled={false}
                        />
                    </>
                </StyledLink>
            ))}
        </ListContainer>
    )
}

export default Users