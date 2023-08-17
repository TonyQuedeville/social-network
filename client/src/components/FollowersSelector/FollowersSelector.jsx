/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant FollowersSelector : Afficher un selecteur de followers avec cases à cocher
*/

import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'

// css
const StyleWindow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 200px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 9999;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
	box-shadow: 10px 5px 25px 0px black;
`
const StyleGroupButton = styled.div `
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`
const StyleGroupOk = styled.div `
	display: flex;
	align-items: end;
	justify-content: center;
	flex-direction: row;
	margin: 15px;
`
const StyleFollowersList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 15px;
	max-height: 400px;
	overflow: auto;
`
const StyleLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`
const StylePhotoProfile = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	margin: 5px;
`

// Composant
function FollowersSelector({ follower, private_list, onChange, onClose, theme }) {
	const handleFollowerChange = (followerId) => {
		const updatedFollowers = [...private_list]
		const followerIndex = updatedFollowers.findIndex((follower) => follower.id === followerId)
	
		if (followerIndex !== -1) {
			updatedFollowers.splice(followerIndex, 1)
		} else {
			const selectedFollower = follower.find((follower) => follower.id === followerId)
			if (selectedFollower) {
				updatedFollowers.push(selectedFollower)
			}
		}
	
		onChange(updatedFollowers)
	}

	const Validfollowers = () => {
		//console.log("Validfollowers !");
		onClose();
	}
	const handleSelectAll = () => {
		onChange([...follower])
	}

	const handleDeselectAll = () => {
		onChange([])
	}

	return (
		<StyleWindow theme={theme}>
			<StyleGroupButton>
				<Button 
					text="tous" 
					onClick={handleSelectAll}
				/>
				<Button 
					text="aucun" 
					onClick={handleDeselectAll}
				/>
			</StyleGroupButton>
			<StyleFollowersList>
				{/* Afficher la liste des followers avec cases à cocher */}
				{follower.map((followerData) => (
					<label key={followerData.id}>
						<StyleLabel>
						{followerData.pseudo}
						<input
							name="private_list"
							type="checkbox"
							value={followerData.id}
							checked={private_list.some((follower) => follower.id === followerData.id)}
							onChange={() => handleFollowerChange(followerData.id)}
						/>
						{followerData.image ? 
							<StylePhotoProfile src={`http://${window.location.hostname}:4000/download/${followerData.image}`} id={`user-photo-${followerData.pseudo}`} alt="photoProfile" />
							: <StylePhotoProfile src={followerData.sexe === 'h' ? DefaultPictureF : DefaultPictureH} id={`user-photo-${followerData.pseudo}`} alt="photoProfile" />
						}
						</StyleLabel>
					</label>
				))}
			</StyleFollowersList>
			<StyleGroupOk>
				<Button 
					text="Ok" 
					format="rond"
					onClick={Validfollowers}
				/>
			</StyleGroupOk>
		</StyleWindow>
	)
}

export default FollowersSelector
