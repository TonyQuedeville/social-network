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
	width: 400px;
	height: 200px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 9999;
	border: solid 1px;
	border-radius: 10px;
	background: ${props => (props.theme === 'light' ? colors.backgroundLight : colors.backgroundDark)};
	box-shadow: 10px 5px 25px 0px black;
`
const StyleGroupButton = styled.div `
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: row;
`
const StyleGroupOk = styled.div `
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: end;
	flex-direction: row;
`
const StyleFollowersList = styled.div`
	display: flex;
	align-items: start;
	justify-content: start;
	flex-direction: column;
	width: 400px;
	height: 200px;
`

// Composant
function FollowersSelector({ follower, private_list, onChange, onClose, theme }) {
	const handleFollowerChange = (followerId) => {
		const updatedFollowers = [...private_list]
		if (updatedFollowers.includes(followerId)) {
			updatedFollowers.splice(updatedFollowers.indexOf(followerId), 1)
		} else {
			updatedFollowers.push(followerId)
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
				{follower.map((followerId) => (
					<label key={followerId}>
						<input
							type="checkbox"
							value={followerId}
							checked={private_list.includes(followerId)}
							onChange={() => handleFollowerChange(followerId)}
						/>
						{followerId}
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
