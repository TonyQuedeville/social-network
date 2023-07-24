/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant NewComment : Affiche une fenetre d'édition d'un nouveau commentaire pour un post
*/

import React, { useState, useContext } from 'react'
import axios from "axios"
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import useImageUpload from '../../utils/hooks/ImageUpload/useImageUpload.js'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Popup from '../Popup/Popup.jsx'

// css
const NewCommentContainer = styled.div`
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
const StyleGroupButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

// Composant
const NewComment = ({ postId, updateComments }) => {
	const { theme } = useContext(ThemeContext)

	// AuthUser
    const { authId, authPseudo } = useContext(AuthContext)
	
	// New Post
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
	const [commentImage, setCommentImage] = useState(null) // 
	const [showInputFile, setShowInputFile] = useState(false) // fenetre de téléchargement d'image
	const { imageUrl, selectedImage, setImageUrl, setSelectedImage, uploadImage } = useImageUpload() // Hook personalisé: image selectionnée qui sera envoyée au server app-image-storage
	
	// Champs du formulaire
	const [formData, setFormData] = useState({
		post_id: postId,
        user_id: authId,
		pseudo: authPseudo,
		content: '',
		image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
    })
	const [setComment] = useState("")

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
						setCommentImage(value)
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

	// Soumission du formulaire au server app-social-network
	const handleNewCommentSubmit = async (event) => {
		event.preventDefault()
        let data = {
            ...formData,
				post_id: postId,
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
                console.error("Erreur lors du téléchargement de l'image :", err)
            }
        }

        // Requete d'enregistrement vers app-social-network
        try{
            const response = await axios.post(`http://${window.location.hostname}:8080/newcomment`, JSON.stringify(data))
            setFetchError(false)
			CancelNewComment()
			updateComments(response.data);
        }
        catch (err) {
            setNotification(err.message + " : " + err.response.data.error)
            setFetchError(true)
        }
        finally {
        }
	}

	// Image post
	const loadPhotoComment = () => {
		setShowInputFile(true)
	}

	// Annulation
	const CancelNewComment = () => {
		setFormData({
            ...formData,
            user_id: authId,
			content: '',
			image: '', 
            })
		setCommentImage('')
		setSelectedImage(null); // Efface l'image sélectionnée
  		setShowInputFile(false); // Cache l'élément pour sélectionner l'image si nécessaire
	}

	// Composant
	return (
		<NewCommentContainer theme={theme}> 
			<form onSubmit={handleNewCommentSubmit}>
				<TextArea
					id="new-comment"
					name="content"
					label="commenter"
					title="contenu du commentaire"
					placeholder="c'est là qu'tu cause !"
					rows={2}
					cols={48}
					value={formData.content}
					onChange={handleChange}
				/>

				{showInputFile && (
					<InputFileImage 
						id="fileCommentImage"
						name="image"
                        label="Photo du commentaire"
						onChange={(file) => handleChange({ target: { name: 'image', files: [file] } })}
					/>
				)}                           
				{commentImage && (
					<DisplayImage
						id="commentImage"
						src={imageUrl} 
						alt="image commentaire"
						disabled={false}
						size={500}
					/>
				)}
				
				<StyleGroupButton>
					<Icone 
						alt="joindre une image au commentaire" 
						image={IcnPhoto}
						onClick={loadPhotoComment}
					/>

					<Button 
						type="submit" 
						text="Publier" 
						disabled={!(formData.content)} 
						onChange={(e) => setComment(formData)}
					/>
					<Button 
						text="Annuler" 
						disabled={false} 
						onClick={CancelNewComment}
					/>
				</StyleGroupButton>

				{fetchError && notification && (
                    <Popup texte={notification} type='error' />
                )}
			</form>
		</NewCommentContainer>
	)
}

export default NewComment