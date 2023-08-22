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
    const [waitFollowers, setWaitFollowers] = useState("")
    const [followed, setFollowed] = useState("")
    const [groups, setGroups] = useState("")
    const [waitGroups, setWaitGroups] = useState("")
    const [waitGroupsAccept, setWaitGroupsAccept] = useState("")
    const [invitGroups, setInvitGroups] = useState("")
    const [events, setEvents] = useState("")

    const updateUserData = (data, dataUser) => {
        //console.log("updateUserData:", data);
        setEmail(dataUser.email)
        setPseudo(dataUser.pseudo)
        setAuthId(dataUser.id)
        setLastname(dataUser.lastname)
        setFirstname(dataUser.firstname)
        setSexe(dataUser.sexe)
        setBornDate(dataUser.born_date)
        setAbout(dataUser.about)
        setPhotoProfile(dataUser.image)
        setStatusProfil(dataUser.status)
        setFollower(dataUser.follower)
        setWaitFollowers(data.wait_followers)
        setFollowed(dataUser.followed)
        setGroups(data.groups_members)
        setWaitGroups(data.wait_groups_members) // groupes dont je suis en attente d'acceptation
        setWaitGroupsAccept(data.wait_groups_accept) // utilisateurs en attente d'acceptation des groupes dont je fait parti
        setInvitGroups(dataUser.invit_groups) 
        setEvents(data.events)
    }

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        Cookies.remove('session')
        updateUserData({},{})
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
            waitFollowers, setWaitFollowers,
            followed, setFollowed,
            groups, setGroups,
            waitGroups, setWaitGroups,
            waitGroupsAccept, setWaitGroupsAccept,
            invitGroups, setInvitGroups,
            events, setEvents,
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
    waitFollowers: PropTypes.arrayOf(PropTypes.object),
    followed: PropTypes.arrayOf(PropTypes.object),
    groups: PropTypes.arrayOf(PropTypes.object),
    waitGroups: PropTypes.arrayOf(PropTypes.object),
    waitGroupsAccept: PropTypes.arrayOf(PropTypes.object),
    invitGroups: PropTypes.arrayOf(PropTypes.object),
    events: PropTypes.arrayOf(PropTypes.object),
}