// src/components/pages/Users

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Profile from '../Profile'
import { userlist } from '../../../datas/UserList.js'

const Users = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div>
            {userlist.map((user, index) => (
                <Link to={`/profile/${user.pseudo}`} key={`${user.pseudo}-${index}`}>
                    <Profile
                        key={`${user.pseudo}-${index}`}
                        pseudo={user.pseudo}
                        photoProfile={user.picture}
                        title={user.jobTitle}
                        onClick={() => handleUserClick(user)}
                    />
                </Link>
            ))}
        </div>
    )
}

export default Users