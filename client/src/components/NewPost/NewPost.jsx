/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant NewPost : Affiche une fenetre d'édition d'un nouveau post
*/

import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import useImageUpload from '../../utils/hooks/ImageUpload/useImageUpload.js'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Popup from '../Popup/Popup.jsx'
import FollowersSelector from '../FollowersSelector/FollowersSelector.jsx'

// css
const NewPostContainer = styled.div`
	width: auto;
	max-width: 600px;
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
const StyleTitlePublication = styled.div`
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
const NewPost = ( props, updatePosts ) => {	
	const { theme } = useContext(ThemeContext)

	// AuthUser
    const { authId, authPseudo, follower } = useContext(AuthContext)
	
	// New Post
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
	const [postImage, setPostImage] = useState(null) // 
	const { imageUrl, selectedImage, setImageUrl, setSelectedImage, uploadImage } = useImageUpload() // Hook personalisé: image selectionnée qui sera envoyée au server app-image-storage
	const [showInputFile, setShowInputFile] = useState(false) // fenetre de téléchargement d'image
	const [showFollowersSelector, setShowFollowersSelector] = useState(false) // fenetre de selection des followers de la liste privé

	// Champs du formulaire
	const [formData, setFormData] = useState({
        group_id: props.group ? Number(props.group) : 0,
        user_id: authId,
		pseudo: authPseudo,
		status: props.group ? 'private-list' : 'public',
		title: '',
		content: '',
		image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
		private_list: props.group ? props.groupMembers : [],
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
						setPostImage(value)
                    }
                    break

				case "status" :
					if (value === "private-list") setShowFollowersSelector(true)
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
	const handleNewPostSubmit = async (event) => {
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
                };
            }
            catch (err) {
                console.error("Erreur lors du téléchargement de l'image :", err);
            }
        }

        // Requete d'enregistrement vers app-social-network
        try{
            const response = await axios.post(`http://${window.location.hostname}:8080/newpost`, JSON.stringify(data))
            setFetchError(false)
			CancelNewPost()
			updatePosts=(response.data)
        }
        catch (err) {
            setNotification(err.message + " : " + err.response.data.error)
            setFetchError(true)
        }
        finally {
        }
	}

	// Image post
	const loadPhotoPost = () => {
		setShowInputFile(true)
	}

	// Annulation
	const CancelNewPost = () => {
		setFormData({
            ...formData,
            group_id: props.group ? Number(props.group) : '',
			user_id: authId,
			pseudo: authPseudo,
			status: props.group ? 'private-list' : 'public',
			title: '',
			content: '',
			image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
			private_list: props.group ? props.groupMembers : [],
        })
		setPostImage('')
		setSelectedImage(null); // Efface l'image sélectionnée
  		setShowInputFile(false); // Cache l'élément pour sélectionner l'image si nécessaire
	}

	// Composant
	return (
		<NewPostContainer theme={theme}> 
			<form onSubmit={handleNewPostSubmit}>
				<StyleTitlePublication>Nouvelle publication</StyleTitlePublication>

				<InputText
					id="titleNewPost"
					name="title"
					label="Titre"
					title="Titre de publication"
					placeholder="Titre de publication"
					value={formData.title}
					onChange={handleChange}
					required
					size={470}
				/>
				<TextArea
					id="new-post"
					name="content"
					label=""
					title="contenu de publication"
					placeholder="c'est là qu'tu cause !"
					rows={3}
					cols={61}
					value={formData.content}
					onChange={handleChange}
				/>

				{showInputFile && (
					<InputFileImage 
						id="filePostImage"
						name="image"
                        label="Photo de profil"
						onChange={(file) => handleChange({ target: { name: 'image', files: [file] } })}
					/>
				)}                           
				{postImage && (
					<DisplayImage
						id="postImage"
						src={imageUrl} 
						alt="Post image"
						disabled={false}
						size={500}
					/>
				)}
				
				<StyleGroupButton>
					<Icone 
						alt="Post image" 
						image={IcnPhoto}
						onClick={loadPhotoPost}
					/>

					{ Number(props.userId) === authId && (
						<>
							<RadioBouton
								id="newPostStatusPublic"
								name="status"
								label="Public"
								value="public"
								checked={formData.status === 'public'}
								onChange={handleChange}
								alignment="vertical"
							/>
							<RadioBouton
								id="newPostStatusPrivate"
								name="status"
								label="Privé"
								value="private"
								checked={formData.status === 'private'}
								onChange={handleChange}
								alignment="vertical"
							/>
							{follower &&
								<RadioBouton
									id="newPostStatusPrivateList"
									name="status"
									label="Liste"
									value="private-list"
									checked={formData.status === 'private-list'}
									onChange={handleChange}
									alignment="vertical"
								/>
							}
						</>
					)}

					<Button 
						type="submit" 
						text="Publier" 
						disabled={!(formData.title && formData.content)} 
					/>
					<Button 
						text="Annuler" 
						disabled={false} 
						onClick={CancelNewPost}
					/>
				</StyleGroupButton>

				{fetchError && notification && (
                    <Popup texte={notification} type='error' />
                )}
			</form>

			{showFollowersSelector && (
				<FollowersSelector
					private_list={formData.private_list}
					follower={follower}
					onChange={(updatedFollowers) => {
						setFormData((prevFormData) => ({
							...prevFormData,
							private_list: updatedFollowers,
							}))
						}}
					onClose={() => {setShowFollowersSelector(false)}}
					theme={theme}
				/>
			)}
		</NewPostContainer>
	)
}

export default NewPost