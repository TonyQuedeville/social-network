/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant LoginForm : Formulaire de connection utilisateur
    Page Login : Route http://localhost:3000/login
*/

import React, { useState, useEffect, useContext } from "react"
import { useDispatch } from 'react-redux'
import { updateUserData, setWaitFollowers, setWaitGroupsAccept, setEvents, setIsAuthenticated, setIsConnected } from '../../../redux/reducers'
import { useNavigate } from 'react-router-dom'
import { makeRequest } from '../../../utils/Axios/Axios.js'
import { ThemeContext } from '../../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../../utils/style/Colors.js'
import Popup from '../../Popup/Popup.jsx'
import styled from 'styled-components'
import Button from '../../Button/Button'
import InputText from '../../InputText/InputText.jsx'
import Cookies from 'js-cookie' // npm install js-cookie

// css
const StyleLoginContainer = styled.div `
    min-height: 88vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
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

// Composant
function LoginForm() {
	const { theme } = useContext(ThemeContext)
    //const { updateUserData } = useContext(AuthContext) // Utilisateur connecté
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [isEmailValid, setIsEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true) // Ajout de la variable d'état pour la désactivation du bouton
    const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
    const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

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

    // Connection de l'utilisateur
    const dispatch = useDispatch();
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEmailValid && isPasswordValid) {            
            try{
                const response = await makeRequest.post(`/user/login`, JSON.stringify(formData))
                const responseData = response.data

                // Cookie
                //console.log("uuid:", responseData.datas.uuid)
                Cookies.set('session', responseData.datas.uuid, { expires: 1, path: '/' }) // définir le cookie 

                // Données AuthUser
                //console.log("userData:", responseData.datas)
                dispatch(updateUserData(responseData.datas.user))
                dispatch(setWaitFollowers(responseData.datas.waitFollowers))
                dispatch(setWaitGroupsAccept(responseData.datas.waitGroupsAccept))
                dispatch(setEvents(responseData.datas.events))
                dispatch(setIsAuthenticated(true))

                navigate(`/user/${responseData.datas.user.id}`)
            }
            catch (err) {
                setNotification(err.message + " : " + err.response.data.error)
                setFetchError(true)
            }
            finally {
            }
            //*/
        }
    }

    // Annuler
    const handleCancel = () => {
        setFormData({
            email: '',
            password: ''
        })
        setIsEmailValid(false)
        setIsPasswordValid(false)
    }

    return (
        <StyleLoginContainer theme={theme}>
            <StyleLoginForm onSubmit={handleSubmit} >
                <StyleLabInput>
                    <InputText
                        id="email"
                        name="email"
                        label="* Email:"
                        title="Adresse mail uniquement"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>

                <StyleGroupButton>
                    <Button type="submit" text="Se connecter" disabled={isDisabled} />
                    <Button onClick={handleCancel} text="Annuler" disabled={false} />
                </StyleGroupButton>
            </StyleLoginForm>

            { fetchError && notification && (
                <Popup texte={notification} type='error' />
            )}
        </StyleLoginContainer>
    );
}

export default LoginForm;
