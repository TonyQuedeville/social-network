import React, { useState, useEffect } from "react";
import '../styles/LoginForm.css'
import Button from './Button.js'

function isValidUsernameOrEmail(value) {
    // Validation de l'adresse email ou du nom d'utilisateur
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{4,}$/;
    if (emailRegex.test(value.toLowerCase())) {
        console.log("Using email regex to validate: " + value);
        return true;
    } else if (usernameRegex.test(value)) {
        console.log("Using username regex to validate: " + value);
        return true;
    } else {
        return false;
    }

    //return emailRegex.test(value.toLowerCase()) || usernameRegex.test(value);
    //return (emailRegex.test(value.toLowerCase()) && value.includes('@')) || usernameRegex.test(value);
    }

function LoginForm() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameOrEmailValid, setIsUsernameOrEmailValid] = useState(false); // Nouvelle variable d'état pour vérifier la validité de l'adresse email ou du nom d'utilisateur
    const [isPasswordValid, setIsPasswordValid] = useState(false); // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isDisabled, setIsDisabled] = useState(true); // Ajout de la variable d'état pour la désactivation du bouton

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
        }
    };

    const handleClick = () => {
        console.log('Button clicked');
    };

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
                <Button type="submit" text="Log in" className="my-button-style" disabled={isDisabled} />
            </form>

            <Button onClick={handleClick} text="Click me" disabled={false} />
        </div>
    );
}

export default LoginForm;
