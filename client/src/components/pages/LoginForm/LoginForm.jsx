// src/components/LoginForm

import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../../Popup/Popup.jsx'
import styled from 'styled-components'
import Button from '../../Button/Button'
import InputText from '../../InputText/InputText.jsx'
import axios from "axios"
//import { makeRequest } from '../../../utils/Axios/Axios.js'

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

// Validation de l'adresse email ou du nom d'utilisateur
/*function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/

    if (emailRegex.test(value.toLowerCase())) {
        //console.log("Using email regex to validate: " + value);
        return true;
    } else if (usernameRegex.test(value)) {
        //console.log("Using username regex to validate: " + value);
        return true;
    } else {
        return false;
    }
}
*/

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // eslint-disable-next-line 
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const { updateUserData } = useContext(AuthContext)

    const [notification, setNotification] = useState('')
    //const [password, setPassword] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true) // Ajout de la variable d'état pour la désactivation du bouton

    // Mettre à jour l'état isDisabled à chaque fois que l'état de isUsernameOrEmailValid ou isPasswordValid change
    useEffect(() => {
        setIsDisabled(!(isEmailValid && isPasswordValid))
    }, [isEmailValid, isPasswordValid])

    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState(false)

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

        console.log(formData); // (affichage avec 1 event de retard)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        //console.log("Username/Email:", usernameOrEmail);
        //console.log("Password:", password);

        if (isEmailValid && isPasswordValid) {
            //console.log("Connexion valide !");
            // logique de connexion 'o'
            /*try {
                setNotification("")
                console.log(formData);
                const response = await fetch(`http://${window.location.hostname}:8080/user/login`, {method:"POST",  body: JSON.stringify(formData)})
                const responseText = await response.text();
                console.log("responseText:", responseText);
                
                console.log("Response headers:", response.headers);

                console.log("response:", response)
                const data = await response.json()
                console.log("data:", data)
                updateUserData(data)
                setIsLoggedIn(true)
                navigate(`/user/${data.pseudo}`)

            } catch (err) {
                console.log("Error request register!", err.response);
                console.log("Error message:", err.message)
                setNotification("Erreur Login ou mot de passe !")
                setFetchError(true);
            }
            //*/

            
            try{
                await axios.post(`http://${window.location.hostname}:8080/user/login`, JSON.stringify(formData))
                console.log("formData:", formData)
                updateUserData(formData)
                setIsLoggedIn(true)
                navigate(`/user/${formData.pseudo}`)
            }
            catch (err) {
                console.log("Error request register!", err.response);
                console.log("Response headers:", err.response.headers);
                console.log("Error message:", err.message)
                setNotification("Erreur Login ou mot de passe !")
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
                    <Link to="/">
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
