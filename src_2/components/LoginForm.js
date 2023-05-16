import React, { useState, useEffect } from "react";
import '../styles/LoginForm.css'
import Button from './Button.js'
import useRedirectToLogout from '../hooks/useRedirectToLogout.js'

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

function LoginForm({ setIsLoggedIn }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameOrEmailValid, setIsUsernameOrEmailValid] = useState(false); // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false); // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true); // Ajout de la variable d'état pour la désactivation du bouton
    const redirectToLogout = useRedirectToLogout();

    const handleUsernameOrEmailChange = (event) => {
        const value = event.target.value;
        setUsernameOrEmail(value);
        setIsUsernameOrEmailValid(isValidUsernameOrEmail(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setIsPasswordValid(value.length >= 4); // Vérification de la validité du mot de passe
    };

    // Mettre à jour l'état isDisabled à chaque fois que l'état de isUsernameOrEmailValid ou isPasswordValid change
    useEffect(() => {
        setIsDisabled(!(isUsernameOrEmailValid && isPasswordValid));
    }, [isUsernameOrEmailValid, isPasswordValid]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Username/Email:", usernameOrEmail);
        console.log("Password:", password);

        if (isUsernameOrEmailValid && isPasswordValid) {
            console.log("Valid !");
            // logique de connexion
            setIsLoggedIn(true);
            redirectToLogout()            
        }
    };

    // Se déconnecter
    const handleLogout = () => {
        setIsLoggedIn(false);
        redirectToLogout();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="labInput">
                <label htmlFor="usernameOrEmail">Nom d'utilisateur ou email:</label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={handleUsernameOrEmailChange}
                />
                </div>
                <div className="labInput">
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </div>

                <div className="horizontal">
                    <Button type="submit" text="Se connecter" className="my-button-style" disabled={isDisabled} />
                    <Button onClick={handleLogout} text="Annuler" disabled={false} />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
