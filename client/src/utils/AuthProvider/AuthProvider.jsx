import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
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
    const [groupListRequested, setGroupListRequested] = useState("")

    const updateUserData = (data) => {
        setEmail(data.email)
        setPseudo(data.pseudo)
        setAuthId(data.id)
        setLastname(data.lastname)
        setSexe(data.sexe)
        setFirstname(data.firstname)
        setBornDate(data.born_date)
        setAbout(data.about)
        setPhotoProfile(data.image)
        setStatusProfil(data.status)
        setFollower(data.follower)
        setFollowed(data.followed)
        setGroupListRequested(data.group_list_requested)
    }

    //console.log("AuthProvider !");
    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, setIsLoggedIn, 
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
            groupListRequested, setGroupListRequested,
            updateUserData,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool,
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
    follower: PropTypes.arrayOf(PropTypes.string),
    followed: PropTypes.arrayOf(PropTypes.string),
    groupListRequested: PropTypes.arrayOf(PropTypes.number),
}