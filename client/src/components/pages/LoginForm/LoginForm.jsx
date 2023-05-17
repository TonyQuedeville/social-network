// src/components/LoginForm

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider';
//import { useFetch } from '../../../utils/hooks/useFetch.jsx'
//import Popup from '../../Popup/Popup.jsx'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../Button/Button'
import InputText from '../../InputText/InputText.jsx'

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

// Validation de l'adresse email ou du nom d'utilisateur
function isValidUsernameOrEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/;

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

function LoginForm() {
    const {usernameOrEmail, setUsernameOrEmail} = useContext(AuthContext) 
    const [password, setPassword] = useState("")
    const [isUsernameOrEmailValid, setIsUsernameOrEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true) // Ajout de la variable d'état pour la désactivation du bouton
    // eslint-disable-next-line 
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    
    const handleUsernameOrEmailChange = (event) => {
        const value = event.target.value
        setUsernameOrEmail(value)
        setIsUsernameOrEmailValid(isValidUsernameOrEmail(value))
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value
        setPassword(value)
        setIsPasswordValid(value.length >= 4) // Vérification de la validité du mot de passe
    }

    // Mettre à jour l'état isDisabled à chaque fois que l'état de isUsernameOrEmailValid ou isPasswordValid change
    useEffect(() => {
        setIsDisabled(!(isUsernameOrEmailValid && isPasswordValid));
    }, [isUsernameOrEmailValid, isPasswordValid]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log("Username/Email:", usernameOrEmail);
        //console.log("Password:", password);

        if (isUsernameOrEmailValid && isPasswordValid) {
            //console.log("Connexion valide !");
            // logique de connexion
            setIsLoggedIn(true);
            navigate("/user/" + usernameOrEmail); // Redirection vers la page profil utilisateur
        }
    };

    // Se déconnecter
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <div>
            <StyleLoginForm onSubmit={handleSubmit} >
                <StyleLabInput>
                    <InputText
                        id="usernameOrEmail"
                        label="* Nom d'utilisateur ou email:"
                        title=""
                        value={usernameOrEmail}
                        onChange={handleUsernameOrEmailChange}
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
                    />
                </StyleLabInput>

                <StyleGroupButton>
                    <Button type="submit" text="Se connecter" disabled={isDisabled} />
                    <Link to="/">
                        <Button onClick={handleLogout} text="Annuler" disabled={false} />
                    </Link>
                </StyleGroupButton>
            </StyleLoginForm>
        </div>
    );
}

export default LoginForm;
