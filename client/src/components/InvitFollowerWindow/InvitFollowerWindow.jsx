/*
	Projet Zone01 : Social network
	Tony Quedeville 
	01/09/2023
	Composant InvitFollowerWindow : Affichage d'une fenetre d'invitaion followers à un groupe de discutiion
*/

import React from 'react'
import { useSelector } from "react-redux"
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import RadioBouton from '../RadioBouton/RadioBouton.jsx'
import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'

//css
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
function InvitFollowerWindow({ groupId, onClose, theme }) {
    // AuthUser
    const user = useSelector(state => state.user)
    const follower = user.follower

	const handleFollowerChange = (followerId) => {
        console.log("inviter followerId:", followerId, "groupId:", groupId);
        // requete d'invitation (post)
	}

	const close = () => {
		onClose();
	}

	return (
		<StyleWindow theme={theme}>
			<StyleFollowersList>
				{/* Afficher la liste des followers avec cases à cocher */}
				{follower.map((followerData) => (
					<label key={followerData.id}>
						<StyleLabel>
						{followerData.pseudo}
                        <RadioBouton
                            id="invitFollower"
                            name="invitFollower"
                            label="inviter"
                            value={followerData.pseudo}
                            onChange={() => handleFollowerChange(followerData.id)}
                            alignment="vertical"
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
					text="fermer" 
					onClick={close}
				/>
			</StyleGroupOk>
		</StyleWindow>
	)
}

export default InvitFollowerWindow
