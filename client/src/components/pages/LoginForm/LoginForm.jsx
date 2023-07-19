/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant LoginForm : Formulaire de connection utilisateur
    Page Login : Route http://localhost:3000/login
*/

import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../../Popup/Popup.jsx'
import styled from 'styled-components'
import Button from '../../Button/Button'
import InputText from '../../InputText/InputText.jsx'
import axios from "axios"

// css
const StyleLoginContainer = styled.div `
    min-height: 88.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
`
const StyleLoginForm = styled.form `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
`
const StyleLabInput = styled.div `
    margin: 10px;
`
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

//Fonctions
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

/*
// Validation de l'adresse email ou du nom d'utilisateur
function isValidPseudo(value) {
    const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/

    if (usernameRegex.test(value)) {
        //console.log("Using username regex to validate: " + value);
        return true;
    } else {
        return false;
    }
}
//*/

// Composant
function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
    const [isEmailValid, setIsEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true) // Ajout de la variable d'état pour la désactivation du bouton
    const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
    const { updateUserData, setIsLoggedIn } = useContext(AuthContext) // Utilisateur connecté

    // Mettre à jour l'état isDisabled à chaque fois que l'état de isEmailValid ou isPasswordValid change
    // Quand toutes les conditions sont ok, le bouton devient cliquable.
    useEffect(() => {
        setIsDisabled(!(isEmailValid && isPasswordValid))
    }, [isEmailValid, isPasswordValid])

    const navigate = useNavigate() // variable permettant de rediriger vers la page /user/pseudo si le login réussie

    // mise à jour des champs de formData (formulaire)
    const handleChange = (e) => {
        if (e && e.target && e.target.name) {
            var value = e.target.value
            switch(e.target.name) {
                case "email" : 
                    setIsEmailValid(isValidEmail(value))
                    break

                case "password" : 
                    setIsPasswordValid(value.length >= 4)
                    break

                default :
                    break
            }

            setFormData(prev => ({
                ...prev,
                [e.target.name]: value
            }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEmailValid && isPasswordValid) {            
            try{
                const response = await axios.post(`http://${window.location.hostname}:8080/user/login`, JSON.stringify(formData))
                const responseData = response.data;

                console.log("responseData:", responseData.datas)
                updateUserData(responseData.datas.user)
                
                setIsLoggedIn(true)
                
                navigate(`/user/${responseData.datas.user.pseudo}`)
            }
            catch (err) {
                console.log("Error request register!", err.response);
                console.log("Error message:", err.message)
                setNotification("Erreur login ou mot de passe !")
                setNotification(err.message + " : " + err.response.data.error)
                setFetchError(true)
            }
            finally {
            }
            //*/
        }
    }

    // Se déconnecter
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <StyleLoginContainer>
            <StyleLoginForm onSubmit={handleSubmit} >
                <StyleLabInput>
                    <InputText
                        id="email"
                        name="email"
                        label="* Nom d'utilisateur ou email:"
                        title=""
                        //value={email}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="password"
                        id="password"
                        name="password"
                        label="* Mot de passe"
                        placeholder="****"
                        title="4 caractères minimum"
                        //value={password}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>

                <StyleGroupButton>
                    <Button type="submit" text="Se connecter" disabled={isDisabled} />
                    <Link to="/login">
                        <Button onClick={handleLogout} text="Annuler" disabled={false} />
                    </Link>
                </StyleGroupButton>
            </StyleLoginForm>

            { fetchError && notification && (
                <Popup texte={notification} type='error' />
            )}
        </StyleLoginContainer>
    );
}

export default LoginForm;
