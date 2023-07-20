/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant RegisterForm : Formulaire d'enrtegistrement nouvel utilisateur
    Page Register : Route http://localhost:3000/register 
*/

import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../Button/Button.jsx'
import RadioBouton from '../../RadioBouton/RadioBouton.jsx'
import Checkbox from '../../Checkbox/Checkbox.jsx'
import InputText from '../../InputText/InputText.jsx'
import TextArea from '../../TextArea/TextArea.jsx'
import InputFileImage from '../../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../../DisplayImage/DisplayImage.jsx'
import useImageUpload from '../../../utils/hooks/ImageUpload/useImageUpload.js'
import Cgu from '../../Cgu/Cgu.jsx'
import Popup from '../../Popup/Popup.jsx'
import axios from "axios"

// css
const RegisterContainer = styled.div `
    min-height: 88.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin: 1px;
    border: solid 1px;
    border-radius: 10px;
`
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

// Fonctions
// Validation du pseudo utilisateur
function isValidPseudo(value) {
    const useridRegex = /^[a-zA-Z0-9_-]{4,}$/;

    if (useridRegex.test(value)) {
        //console.log("Using userid regex to validate: " + value)
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

// Composant
function RegisterForm() {
    const [isPseudoValid, setIsPseudoValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du nom d'utilisateur
    const [isEmailValid, setIsEmailValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité de l'adresse email
    const [isPasswordValid, setIsPasswordValid] = useState(false) // Nouvelle variable d'état pour vérifier la validité du mot de passe
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true) // Nouvelle variable d'état pour vérifier la confirmation du mot de passe
    const { imageUrl, selectedImage, setImageUrl, setSelectedImage, uploadImage } = useImageUpload() // Hook personalisé: image selectionnée qui sera envoyée au server app-image-storage
    const [password, setPassword] = useState("") // mot de passe
    const [passwordConfirm, setPasswordConfirm] = useState("") // confirmation du mot de passe
    const [cgu, setCgu] = useState(false) // case à cocher acceptation des cgu
    const [isDisabled, setIsDisabled] = useState(true) // Activation du bouton submit formaulaire
    const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
    const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
    const confidentialite = "Cette information restera confidentielle si le status de votre profil est en mode Privé"

    const [formData, setFormData] = useState({
        pseudo: '',
        email: '',
        lastname: '',
        firstname: '',
        born_date: '',
        sexe: '',
        image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
        about: '',
        password: '',
        status: '',
    })


    // Mise à jour de formData à chaque changement dans le formulaire
    const handleChange = (e) => {
        if (e && e.target && e.target.name) {
            var value = e.target.value
            switch(e.target.name) {
                case "image" : 
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0]
                        setImageUrl(URL.createObjectURL(file));
                        value = file.name
                        setSelectedImage(file)
                    }
                    break

                case "pseudo" : 
                    setIsPseudoValid(isValidPseudo(value))
                    break
                
                case "email" : 
                    setIsEmailValid(isValidEmail(value))
                    break

                case "password" : 
                    setIsPasswordValid(value.length >= 4)
                    setPassword(value)
                    break

                case "passwordConfirm" : 
                    setPasswordConfirm(value)
                    break

                case "born_date" :
                    value = value + "T00:00:00.000+00:00"
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

    // Acceptation des cgu
    const handleCguChange = (event) => {
        const value = event.target.checked
        setCgu(value)
    }
    
    // UseEffect "componentDidMount" Modification pendant l'existance du composant
    useEffect(() => {
        setIsConfirmDisabled(!isPasswordValid)
    }, [isPasswordValid])

    useEffect(() => {
        setIsPasswordValid(password.length >= 4)
    }, [password])

    useEffect(() => {
        if (password === passwordConfirm) {
            setNotification("")
            if (isPasswordValid) setIsConfirmDisabled(true)
        } else {
            setNotification("Les mots de passe ne sont pas identiques !")
            setIsConfirmDisabled(false)
        }
    }, [password, isPasswordValid, passwordConfirm])

    useEffect(() => {
        if(isEmailValid) {
            setNotification("")
        } else {
            setNotification("Adresse mail invalide !")
        }
    }, [isEmailValid])

    /*
    // UseEffect "componentWillMount" à la création du composant, (s'execute avant le 1er rendu)
    useEffect(() => {
        setNotification("")
        //console.log("Création composant : componentWillMount !");
    }, []);

    // UseEffect "componentWillUnmount" à la suppression du composant, (s'execute avant la destruction du composant)
    useEffect(() => {
        return () => {
            // Code de nettoyage
            //console.log("Destruction composant : componentWillUnmount !");
        };
    }, []);
    */

    // Mise à jour l'état isDisabled du bouton submit à chaque fois que l'état des champs d'entrée change
    // Quand toutes les conditions sont ok, le bouton devient cliquable.
    useEffect(() => {
        setIsDisabled(!(isPseudoValid && isEmailValid && isPasswordValid && isConfirmDisabled && cgu))
    }, [isPseudoValid, isEmailValid, isPasswordValid, isConfirmDisabled, cgu])

    // Submit
    const navigate = useNavigate()  // variable permettant de rediriger vers la page /login si l'inscription réussie
    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {
            ...formData,
                image: "",
        } 
        
        // Requete téléchargement de l'image vers app-image-storage par le hook personnalisé
        if (selectedImage) {
            await uploadImage(selectedImage)
            data = {
            ...formData,
            image: imageUrl,
            };
        }
        
        // Requete d'enregistrement vers app-social-network
        try{
            await axios.post(`http://${window.location.hostname}:8080/user/register`, JSON.stringify(data))

            setFetchError(false)
            if (isPseudoValid && isPasswordValid && cgu) {
                navigate("/login") // Redirection vers la page de connection
            }
        }
        catch (err) {
            setNotification(err.message + " : " + err.response.data.error)
            setFetchError(true)
        }
        finally {
        }
    }
    
    // Rendu du composant
    return (
        <RegisterContainer>
            <StyleRegisterForm onSubmit={handleSubmit} >
                <StyleLabInput>            
                    <InputText
                        id="pseudo"
                        name="pseudo"
                        label="* Pseudo"
                        title=""
                        //value={pseudo}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="* email"
                        id="email"
                        name="email"
                        label="* Email"
                        placeholder="***@gmail.com"
                        title="Entrez une adresse mail valide."
                        //value={email}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        id="lastname"
                        name="lastname"
                        label="Nom"
                        //value={lastname}
                        title={confidentialite}
                        onChange={handleChange}
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        id="firstname"
                        name="firstname"
                        label="Prenom"
                        title={confidentialite}
                        //value={firstname}
                        onChange={handleChange}
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="date"
                        id="borndate"
                        name="born_date"
                        label="* Date de naissance"
                        title={confidentialite + " : Inscription interdite au moins de 15 ans"}
                        //value={bornDate}
                        onChange={handleChange}
                        required
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <p>Sexe</p>
                    <RadioBouton
                        id="sexeh"
                        name="sexe"
                        label="Homme"
                        title="Homme"
                        value="h"
                        //checked={sexe === 'h'}
                        onChange={handleChange}
                        alignment="vertical"
                    />
                    <RadioBouton
                        id="sexef"
                        name="sexe"
                        label="Femme"
                        title="Femme"
                        value="f"
                        //checked={sexe === 'f'}
                        onChange={handleChange}
                        alignment="vertical"
                    />
                    <RadioBouton
                        id="sexea"
                        name="sexe"
                        label="Autre"
                        title="Autre sexe (LGBT)"
                        value="a"
                        //checked={sexe === 'a'}
                        onChange={handleChange}
                        alignment="vertical"
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputFileImage 
                        id="fileProfileImage"
                        name="image"
                        label="Photo de profil"
                        //value={profileImage}
                        onChange={(file) => handleChange({ target: { name: 'image', files: [file] } })}
                    />
                    {imageUrl && (
                        <DisplayImage
                            id="profileImage"
                            src={imageUrl} 
                            alt="Profile"
                            size={150}
                            format='rond'
                            disabled={false}
                        />
                    )}
                </StyleLabInput>
                <StyleLabInput>
                    <TextArea
                        id="about"
                        name="about"
                        label="Description de personalité"
                        title={"Description de personalité"}
                        //value={about}
                        onChange={handleChange}
                        rows={3}
                        cols={50}
                    />
                </StyleLabInput>                
                <StyleLabInput>
                    <InputText
                        type="password"
                        id="password"
                        name="password"
                        label="* Mot de passe"
                        placeholder="****"
                        title="Mot de passe. 4 caractères minimum"
                        value={password}
                        onChange={handleChange}
                        required
                        disabled={false}
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <InputText
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="* Confirmation mot de passe"
                        placeholder="****"
                        title="Confirmation du mot de passe. 4 caractères minimum"
                        value={passwordConfirm}
                        onChange={handleChange}
                        required
                        disabled={isConfirmDisabled}
                    />
                </StyleLabInput>
                <StyleLabInput>
                    <p>Status profil</p>
                    <RadioBouton
                        id="statusProfilPrivate"
                        name="status"
                        label="Privé"
                        value="private"
                        title="Status profil privé"
                        onChange={handleChange}
                        alignment="vertical"
                    />
                    <RadioBouton
                        id="statusProfilPublic"
                        name="status"
                        label="Public"
                        value="public"
                        title="Status profil public"
                        onChange={handleChange}
                        alignment="vertical"
                    />
                </StyleLabInput>
                <Cgu larg={70}/>
                <StyleLabInput>
                    <Checkbox
                        id="cgu"
                        label="* Veuillez accepter les CGU"
                        value={cgu}
                        onChange={handleCguChange}
                        alignment="horizontal"
                    />
                </StyleLabInput>

                <StyleGroupButton>
                    <Button type="submit" text="Créer un compte" disabled={isDisabled} />
                    <Link to="/register">
                        <Button text="Annuler" disabled={false} />
                    </Link>
                </StyleGroupButton>

                {fetchError && notification && (
                    <Popup texte={notification} type='error' />
                )}
            </StyleRegisterForm>
        </RegisterContainer>
    )
}

export default RegisterForm;