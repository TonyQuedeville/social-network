// src/components/RegisterForm

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../Button/Button.jsx'
import RadioBouton from '../../RadioBouton/RadioBouton.jsx'
import InputText from '../../InputText/InputText.jsx'
import Popup from '../../Popup/Popup.jsx'
//import { useFetch } from '../../../utils/hooks'

const StyleRegisterForm = styled.form `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
`
const StyleLabInput = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 5px;
`
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

// Validation du nom d'utilisateur
function isValidUsername(value) {
    const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/;

    if (usernameRegex.test(value)) {
        //console.log("Using username regex to validate: " + value)
        return true
    } else {
        return false
    }
}
// Validation de l'adresse email
function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value.toLowerCase())) {
        //console.log("Using email regex to validate: " + value)
        return true
    } else{
        return false
    }
}

function RegisterForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [sexe, setSexe] = useState("")
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isUsernameValid, setIsUsernameValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du nom d'utilisateur
    const [isEmailValid, setIsEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true) // Ajout de la variable d'état pour la désactivation du bouton
    const [notification, setNotification] = useState('')

    const handleUsernameChange = (event) => {
        const value = event.target.value
        setUsername(value)
        setIsUsernameValid(isValidUsername(value))
    }
    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
        setIsEmailValid(isValidEmail(value))
    }
    const handleSexeChange = (event) => {
        const value = event.target.value
        setSexe(value)
    }
    const handleLastnameChange = (event) => {
        const value = event.target.value
        setLastname(value)
    }
    const handleFirstnameChange = (event) => {
        const value = event.target.value
        setFirstname(value)
    }
    const handlePasswordChange = (event) => {
        const value = event.target.value
        setPassword(value)
        setIsPasswordValid(value.length >= 4)
    }
    const handlePasswordConfirmChange = (event) => {
        const value = event.target.value
        setPasswordConfirm(value)
    }

    useEffect(() => {
        setIsConfirmDisabled(!isPasswordValid)
    }, [isPasswordValid]);
    useEffect(() => {
        setIsPasswordValid(password.length >= 4)
    }, [password])
    useEffect(() => {
        if (password === passwordConfirm) {
            //console.log("Les mots de passe sont identiques !")
            if (isPasswordValid) setIsConfirmDisabled(true)
        } else {
            setNotification("Les mots de passe ne sont pas identiques !")
        }
    }, [password, isPasswordValid, passwordConfirm])

    // Met à jour l'état isDisabled à chaque fois que l'état des champs d'entrée change
    useEffect(() => {
        setIsDisabled(!(isUsernameValid && isEmailValid && isPasswordValid && isConfirmDisabled))
    }, [isUsernameValid, isEmailValid, isPasswordValid, isConfirmDisabled])

    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()

        // Soumission des données en mettant à jour le formData. 
        // La requête sera automatiquement déclenchée par le hook useFetch
        //setFormData({ ...formData, isSubmitting: true })

        if (isUsernameValid && handlePasswordChange && isPasswordValid) {
            navigate("/login"); // Redirection vers la page de connection
        }
    };

    /*const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname:'',
        password: '',
    })

    const { isLoading, data, error } = useFetch('https://api.example.com/endpoint', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error occurred while submitting the form</div>
    }
    if (data) {
        // Utilisez les données récupérées après la soumission si nécessaire
    }
    //*/

    
    return (
        <div>
            <StyleRegisterForm onSubmit={handleSubmit} >
                <StyleLabInput>                    
                    <InputText
                        id="username"
                        label="* Pseudo"
                        title=""
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="* email"
                        id="email"
                        label="Email"
                        placeholder="***@gmail.com"
                        title="Entrez une adresse valide."
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <RadioBouton
                        id="sexeh"
                        label="Homme"
                        value="h"
                        checked={sexe === 'h'}
                        onChange={handleSexeChange}
                        alignment="vertical"
                    />
                    <RadioBouton
                        id="sexef"
                        label="Femme"
                        value="f"
                        checked={sexe === 'f'}
                        onChange={handleSexeChange}
                        alignment="vertical"
                    />
                    <RadioBouton
                        id="sexea"
                        label="Autre"
                        value="a"
                        checked={sexe === 'a'}
                        onChange={handleSexeChange}
                        alignment="vertical"
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        id="lastname"
                        label="* Nom"
                        value={lastname}
                        title="Votre nom restera confidentiel et n'apparaitra pas que si vous l'autorisez."
                        onChange={handleLastnameChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        id="firstname"
                        label="* Prenom"
                        title="Votre prénom restera confidentiel et n'apparaitra pas que si vous l'autorisez."
                        value={firstname}
                        onChange={handleFirstnameChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="password"
                        id="password"
                        label="* Mot de passe"
                        placeholder="****"
                        title="4 caractères minimum"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={false}
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="password"
                        id="passwordConfirm"
                        label="* Confirmation mot de passe"
                        placeholder="****"
                        title="4 caractères minimum"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        required
                        disabled={isConfirmDisabled}
                    />
                </StyleLabInput>

                <StyleGroupButton>
                    <Button type="submit" text="Créer un compte" disabled={isDisabled} />
                    <Link to="/">
                        <Button text="Annuler" disabled={false} />
                    </Link>
                </StyleGroupButton>

                {notification && (
                    <Popup texte={notification} type='error' />
                )}
            </StyleRegisterForm>
        </div>
    )
}

export default RegisterForm;
