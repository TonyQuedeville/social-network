// src/components/pages/Users

import React, { useState } from 'react'
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
    const [selectedUser, setSelectedUser] = useState(null)

    const handleUserClick = (user) => {
        setSelectedUser(user)
        console.log("selectedUser :", selectedUser)
    }

    return (
        <ListContainer>
            {userlist.map((user, index) => (
                <StyledLink                 
                    to={`/profile/${user.pseudo}`} 
                    key={`${user.pseudo}-${index}`} 
                    id={`user-link-${user.pseudo}`}
                >
                    <>
                        <Profile
                            pseudo={user.pseudo}
                            photoProfile={user.photoProfile}
                            sexe={user.sexe}
                            title={user.jobTitle}
                            onClick={() => handleUserClick(user)}
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