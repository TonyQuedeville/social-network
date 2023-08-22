/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Comment : Affiche un commentaire
*/

import React from 'react';
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'

// css
const StylePostComment = styled.div`
	width: 98%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 5px;
	background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite })` : colors.backgroundDark)};
`
const StyleComment = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: start;
	margin: 5px;
`
const StyleInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 5px;
	font-style: italic;
	font-size: 0.8em;
	color: grey;
`

// Composant
const Comment = ({ comment, theme }) => {
	return (
		<StylePostComment theme={theme}>
			<StyleInfo>
				<div>{comment.pseudo}</div>
				<div>{FrenchFormatDateConvert(comment.updated_date)}</div>
			</StyleInfo>
			
			<StyleComment>{comment.content}</StyleComment>

			{comment.image && (
					<DisplayImage
						id="commentImage"
						src={`http://${window.location.hostname}:4000/download/${comment.image}`} 
						alt="image commentaire"
						disabled={false}
						size={500}
					/>
				)}
		</StylePostComment>
	)
}

export default Comment
