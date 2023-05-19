import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [sexe, setSexe] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [photoProfile, setPhotoProfile] = useState("")
    const [statusProfil, setStatusProfil] = useState("")

    const updateUserData = (data) => {
        setPseudo(data.pseudo)
        setSexe(data.sexe)
        setLastname(data.lastname)
        setFirstname(data.firstname)
        setBornDate(data.BornDate)
        setJobTitle(data.jobTitle)
        setPhotoProfile(data.photoProfile)
        setStatusProfil(data.statusProfil)
    }

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, setIsLoggedIn, 
            usernameOrEmail, setUsernameOrEmail,
            sexe, setSexe,
            pseudo, setPseudo,
            lastname, setLastname,
            firstname, setFirstname,
            bornDate, setBornDate,
            jobTitle, setJobTitle,
            photoProfile, setPhotoProfile,
            statusProfil, setStatusProfil,
            updateUserData,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool,
    sexe: PropTypes.string,
    pseudo: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    bornDate: PropTypes.string,
    photoProfile: PropTypes.string,
    statusProfil: PropTypes.string,
    updateUserData: PropTypes.func,
}