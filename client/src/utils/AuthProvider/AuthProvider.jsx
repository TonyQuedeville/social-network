/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	AuthProvider : Contexte Utilisateur
*/

import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie' // npm install js-cookie

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [authPseudo, setPseudo] = useState("")
    const [authId, setAuthId] = useState("")
    const [sexe, setSexe] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [about, setAbout] = useState("")
    const [photoProfile, setPhotoProfile] = useState("")
    const [statusProfil, setStatusProfil] = useState("")
    const [follower, setFollower] = useState("")
    const [followed, setFollowed] = useState("")
    const [groups, setGroups] = useState("")
    const [waitGroups, setWaitGroups] = useState("")
    const [invitGroups, setInvitGroups] = useState("")

    const updateUserData = (data) => {
        //console.log("updateUserData:", data);
        setEmail(data.email)
        setPseudo(data.pseudo)
        setAuthId(data.id)
        setLastname(data.lastname)
        setFirstname(data.firstname)
        setSexe(data.sexe)
        setBornDate(data.born_date)
        setAbout(data.about)
        setPhotoProfile(data.image)
        setStatusProfil(data.status)
        setFollower(data.follower)
        setFollowed(data.followed)
        setGroups(data.groups_members)
        setWaitGroups(data.wait_groups_members)
        setInvitGroups(data.invit_groups)
    }

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        Cookies.remove('session')
        updateUserData({})
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, setIsAuthenticated,
            email, setEmail,
            authPseudo, setPseudo,
            authId, setAuthId,
            sexe, setSexe,
            lastname, setLastname,
            firstname, setFirstname,
            bornDate, setBornDate,
            about, setAbout,
            photoProfile, setPhotoProfile,
            statusProfil, setStatusProfil,
            follower, setFollower,
            followed, setFollowed,
            groups, setGroups,
            waitGroups, setWaitGroups,
            invitGroups, setInvitGroups,
            updateUserData,
            handleLogin,
            handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    authPseudo: PropTypes.string,
    authId: PropTypes.number,
    email: PropTypes.string,
    sexe: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    bornDate: PropTypes.string,
    about: PropTypes.string,
    photoProfile: PropTypes.string,
    statusProfil: PropTypes.string,
    updateUserData: PropTypes.func,
    follower: PropTypes.arrayOf(PropTypes.object),
    followed: PropTypes.arrayOf(PropTypes.object),
    groups: PropTypes.arrayOf(PropTypes.object),
    waitGroups: PropTypes.arrayOf(PropTypes.object),
    invitGroups: PropTypes.arrayOf(PropTypes.object),
}