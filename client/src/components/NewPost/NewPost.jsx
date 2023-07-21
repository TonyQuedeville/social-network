/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant NewPost : Affiche une fenetre d'édition d'un nouveau post
*/

import React, { useState, useContext, useEffect } from 'react'
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
	background: ${props => (props.theme === 'light' ? colors.backgroundLightSoft : colors.backgroundDark)};
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
//const NewPost = ({ follower, onChange }) => {
	//console.log("follower:", follower);
const NewPost = () => {
	const { theme } = useContext(ThemeContext)

	// AuthUser
    const { authId, follower } = useContext(AuthContext)
	
	// New Post
	const { imageUrl, selectedImage, setImageUrl, setSelectedImage, uploadImage } = useImageUpload() // Hook personalisé: image selectionnée qui sera envoyée au server app-image-storage
	const [fetchError, setFetchError] = useState(false) // Gestion des erreurs
	const [notification, setNotification] = useState('') // Message de notification dans le composant Popup
	
	const [titleNewPost, setTitleNewPost] = useState('')
	const [newPostContent, setNewPostContent] = useState('')
	const [postImage, setPostImage] = useState(null)
	const [showInputFile, setShowInputFile] = useState(false)
	const [validNewPostisDisabled, setValidNewPostisDisabled] = useState(true)
	//const [newPostConfidencial, setNewPostConfidencial] = useState('private')
	//const { dataNewPosts, isLoadingNewPosts, errorNewPosts } = useFetch('http://localhost:8080/newposts.json')

	// Followers
	const [showFollowersSelector, setShowFollowersSelector] = useState(false)
	const [private_list, setPrivate_list] = useState([])

	const [formData, setFormData] = useState({
        user_id: authId,
		status: '',
		title: '',
		content: '',
		image: '', // Nom de fichier unique de l'image stockée sur server app-image-storage
		private_list: '',
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
						setShowInputFile(true)
                    }
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

	const handleNewPostSubmit = async (event) => {
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
            }
        }
        
        // Requete d'enregistrement vers app-social-network
        try{
            await axios.post(`http://${window.location.hostname}:8080/newpost`, JSON.stringify(data))

            setFetchError(false)
        }
        catch (err) {
            setNotification(err.message + " : " + err.response.data.error)
            setFetchError(true)
        }
        finally {
        }
	}

	const CancelNewPost = () => {
		setNewPostContent('')
		setTitleNewPost('')
		setPostImage('')
		//console.log("annuler new post !");
	}

	/*
	const handleTitleNewPostChange = (event) => {
		setTitleNewPost(event.target.value)
		//console.log("setTitleNewPost:", titleNewPost)
	}
	const handleNewPostChange = (event) => {
		setNewPostContent(event.target.value)
		//console.log("handleNewPostChange:", newPostContent)
	}
	const handleNewPostConfidencialChange = (event) => {
		setNewPostConfidencial(event.target.value)
		//console.log("newPostConfidencial:", newPostConfidencial)
		if (event.target.value === "private-list") {
			setShowFollowersSelector(true)
		} else {
			setShowFollowersSelector(false)
		}
	}
	// Image post
	const loadPhotoPost = () => {
		//console.log("loadPhotoPost !")
		setShowInputFile(true)
	}
	const handlePostImageChange = (file) => {
		setPostImage(file)
		setShowInputFile(false)
	}
	//*/

	useEffect(() => {
		setValidNewPostisDisabled(!(titleNewPost && newPostContent))
	}, [titleNewPost, newPostContent])

    // Fenetre de selection private-list
	const handleSelectedPrivatelistChange = (event) => {
		//console.log("handleSelectedPrivatelistChange :", event)
		setPrivate_list(event)
		//onChange(event)
    }
    const handleFollowersSelectorClose = () => {
			setShowFollowersSelector(false)
			//console.log("followers :", followers)
    }

		// Composant
	return (
		<NewPostContainer theme={theme}> 
			<form onSubmit={handleNewPostSubmit}>
				<StyleTitlePublication>Nouvelle publication</StyleTitlePublication>

				<InputText
					id="titleNewPost"
					label="Titre"
					title="Titre de publication"
					placeholder="Titre de publication"
					//value={title}
					onChange={handleChange}
					required
					size={470}
				/>
				<TextArea
					id="new-post"
					label=""
					title="contenu de publication"
					placeholder="c'est là qu'tu cause !"
					rows={3}
					cols={61}
					//value={content}
					onChange={handleChange}
				/>

				{showInputFile && (
					<InputFileImage 
						id="filePostImage"
						name="image"
                        label="Photo de profil"
						//value={image}
						onChange={(file) => handleChange({ target: { name: 'image', files: [file] } })}
					/>
				)}                           
				{postImage && (
					<DisplayImage
						id="postImage"
						src={imageUrl} 
						alt="Post image"
						disabled={false}
					/>
				)}
				
				<StyleGroupButton>
					<Icone 
						alt="Post image" 
						//disabled={!postImage} 
						image={IcnPhoto}
						onClick={handleChange}
					/>

					<RadioBouton
						id="newPostStatusPublic"
						label="Public"
						//value="public"
						//checked={status === 'public'}
						onChange={handleChange}
						alignment="vertical"
					/>
					<RadioBouton
						id="newPostStatusPrivate"
						label="Privé"
						//value="private"
						//checked={status === 'private'}
						onChange={handleChange}
						alignment="vertical"
					/>
					<RadioBouton
						id="newPostStatusPrivateList"
						label="Liste"
						//value="private-list"
						//checked={status === 'private-list'}
						onChange={handleChange}
						alignment="vertical"
					/>

					<Button 
						type="submit" 
						text="Publier" 
						disabled={validNewPostisDisabled} 
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
					private_list={private_list}
					follower={follower}
					onChange={handleSelectedPrivatelistChange}
					onClose={handleFollowersSelectorClose}
					theme={theme}
				/>
			)}
		</NewPostContainer>
	)
}

export default NewPost