import React, { useState, useContext, useEffect } from 'react'
//import { useParams } from 'react-router-dom'
//import { Loader } from '../../../utils/Atom.jsx'
//import { useQuery } from '@tanstack/react-query' //'react-query'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

import InputText from '../InputText/InputText.jsx'
import TextArea from '../TextArea/TextArea.jsx'
import Button from '../Button/Button.jsx'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import FollowersSelector from '../FollowersSelector/FollowersSelector.jsx';

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
const NewPost = ({ followedUsers, onChange }) => {
	const { theme } = useContext(ThemeContext)
	
	// New Post
	const [titleNewPost, setTitleNewPost] = useState('')
	const [newPostContent, setNewPostContent] = useState('')
	const [postImage, setPostImage] = useState(null)
	const [showInputFile, setShowInputFile] = useState(false)
	const [validNewPostisDisabled, setValidNewPostisDisabled] = useState(true)
	const [newPostConfidencial, setNewPostConfidencial] = useState('private')
	//const { dataNewPosts, isLoadingNewPosts, errorNewPosts } = useFetch('http://localhost:8080/newposts.json')

	const handleNewPostSubmit = (event) => {
		event.preventDefault()
    //onChange(followedUsers);
		console.log("handleNewPostSubmit:",event)
	}
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
	const CancelNewPost = () => {
		setNewPostContent('')
		setTitleNewPost('')
		setPostImage('')
		//console.log("annuler new post !");
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

	// Gestion d'erreurs
	//const [notification, setNotification] = useState('')
	//const [fetchError, setFetchError] = useState(false)
	//useEffect(() => {
	//    if (errorNewPosts) {
	//        setNotification("L'envoi de cette publicaion a échouée !")
	//        setFetchError(true)
	//    }
	//},[errorNewPosts])

	useEffect(() => {
			setValidNewPostisDisabled(!(titleNewPost && newPostContent))
	}, [titleNewPost, newPostContent])

	// Followers
	const [showFollowersSelector, setShowFollowersSelector] = useState(false)
	const [followers, setFollowers] = useState([])

    // Fenetre de selection followers (private-list)
	const handleSelectedFollowersChange = (event) => {
			//console.log("handleSelectedFollowersChange :", event)
			setFollowers(event)
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
					value={titleNewPost}
					onChange={handleTitleNewPostChange}
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
					value={newPostContent}
					onChange={handleNewPostChange}
				/>

				{showInputFile && (
					<InputFileImage 
						id="filePostImage"
						value={postImage}
						onChange={handlePostImageChange} 
					/>
				)}                           
				{postImage && (
					<DisplayImage
						id="postImage"
						src={URL.createObjectURL(postImage)} 
						alt="Post image"
						disabled={false}
					/>
				)}
				
				<StyleGroupButton>
					<Icone 
						alt="Post image" 
						//disabled={!postImage} 
						image={IcnPhoto}
						onClick={loadPhotoPost}
					/>

					<RadioBouton
						id="newPostConfidencialPublic"
						label="Public"
						value="public"
						checked={newPostConfidencial === 'public'}
						onChange={handleNewPostConfidencialChange}
						alignment="vertical"
					/>
					<RadioBouton
						id="newPostConfidencialPrivate"
						label="Privé"
						value="private"
						checked={newPostConfidencial === 'private'}
						onChange={handleNewPostConfidencialChange}
						alignment="vertical"
					/>
					<RadioBouton
						id="newPostConfidencialPrivateList"
						label="Liste"
						value="private-list"
						checked={newPostConfidencial === 'private-list'}
						onChange={handleNewPostConfidencialChange}
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
			</form>

			{showFollowersSelector && (
				<FollowersSelector
					followedUsers={followedUsers}
					followers={followers}
					onChange={handleSelectedFollowersChange}
					onClose={handleFollowersSelectorClose}
					theme={theme}
				/>
			)}
		</NewPostContainer>
  )
}

export default NewPost