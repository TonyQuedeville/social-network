/*
	Projet Zone01 : Social network
	Tony Quedeville 
	25/07/2023
	Composant NewGroupe : Affiche une fenetre d'édition d'un nouveau gropue de discution
*/

import React, { useState, useContext } from 'react'
//import { useParams } from 'react-router-dom'
//import { Loader } from '../../../utils/Atom.jsx'
//import { useQuery } from '@tanstack/react-query' //'react-query'
import axios from "axios"
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

import InputText from '../InputText/InputText.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import useImageUpload from '../../utils/hooks/ImageUpload/useImageUpload.js'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Popup from '../Popup/Popup.jsx'

// css
const NewGroupeContainer = styled.div`
	width: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`
const StyleTitleGroupe = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
`
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

// Composant
const NewGroupe = () => {
	const { theme } = useContext(ThemeContext)

	// AuthUser
	const { authPseudo, authId } = useContext(AuthContext)

	// Image
	const [groupeImage, setGroupeImage] = useState(null)
	const { imageUrl, selectedImage, setImageUrl, setSelectedImage, uploadImage } = useImageUpload() // Hook personalisé: image selectionnée qui sera envoyée au server app-image-storage
	const [showInputFile, setShowInputFile] = useState(false) // fenetre de téléchargement d'image
	
	// Erreur
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup

	// Champs du formulaire
	const [formData, setFormData] = useState({
		user_id: authId,
		pseudo: authPseudo,
		title: '',
		description: '',
		image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
		nb_members: 0,
	})

	// Mise à jour de formData à chaque changement dans le formulaire
	const handleChange = (e) => {
		if (e && e.target && e.target.name) {
			var value = e.target.value
				switch(e.target.name) {
					case "image" : 
						if (e.target.files && e.target.files.length > 0) {
							const file = e.target.files[0]
							setImageUrl(URL.createObjectURL(file))
							value = file.name
							setSelectedImage(file)
							setGroupeImage(value)
						}
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

	const handleNewGroupeSubmit = async (event) => {
    event.preventDefault()
		let data = {
			...formData,
			image: "",
		} 

		// Requete téléchargement de l'image vers app-image-storage par le hook personnalisé
		if (selectedImage) {
			try {
				const uploadedImageUrl = await uploadImage(selectedImage);

				data = {
					...formData,
					image: uploadedImageUrl,
				}
			}
			catch (err) {
				console.error("Erreur lors du téléchargement de l'image :", err);
			}
		}

		console.log("data:", data);
		// Requete d'enregistrement vers app-social-network
		try{
			await axios.post(`http://${window.location.hostname}:8080/newgroup`, JSON.stringify(data))
			setFetchError(false)
			CancelNewGroupe()
		}
		catch (err) {
			setNotification(err.message + " : " + err.response.data.error)
			setFetchError(true)
		}
		finally {
		}
  }

  const CancelNewGroupe = () => {
		setFormData({
			...formData,
			user_id: authId,
			pseudo: authPseudo,
			title: '',
			description: '',
			image: '', 
			nb_members: 0,
		})
		setGroupeImage('')
		setSelectedImage(null); // Efface l'image sélectionnée
		setShowInputFile(false); // Cache l'élément pour sélectionner l'image si nécessaire
  }

  // Image post
  const loadPhotoPost = () => {
    setShowInputFile(true)
  }

	return (
    <NewGroupeContainer theme={theme}>
			<form onSubmit={handleNewGroupeSubmit}>
				<StyleTitleGroupe>Créer un nouveau Groupe</StyleTitleGroupe>
				<InputText
					id="titleNewGroupe"
					name="title"
					label="Titre"
					title="Titre de groupe"
					placeholder="Titre de groupe"
					value={formData.title}
					onChange={handleChange}
					required
					size={300}
				/>
				<TextArea
					id="new-group"
					name="description"
					label=""
					title="Description"
					placeholder="Donnez ici une description de votre groupe de discution."
					rows={3}
					cols={42}
					value={formData.description}
					onChange={handleChange}
				/>

				{showInputFile && (
					<InputFileImage 
						id="fileGroupeImage"
						name="image"
						label="Photo du groupe"
						value={groupeImage}
						onChange={(file) => handleChange({ target: { name: 'image', files: [file] } })}
					/>
				)}                           
				{groupeImage && (
					<DisplayImage
						id="groupeImage"
						src={imageUrl} 
						alt="Groupe image"
						size={300}
						disabled={false}
					/>
				)}
				
				<StyleGroupButton>
					<Icone 
						alt="Groupe image" 
						//disabled={!groupeImage} 
						image={IcnPhoto}
						onClick={loadPhotoPost}
					/>

					<Button 
							type="submit"
							text="Ok" 
							disabled={!(formData.title && formData.description)}
					/>
					<Button 
							text="Annuler" 
							disabled={false} 
							onClick={CancelNewGroupe}
					/>
				</StyleGroupButton>

				{fetchError && notification && (
					<Popup texte={notification} type='error' />
				)}
			</form>
		</NewGroupeContainer>
  )
}

export default NewGroupe