import React from 'react';
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

// css
const StylePostComment = styled.div`
	width: 98%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
	background: ${props => (props.theme === 'light' ? colors.backgroundWhite : colors.backgroundDarkSoft)};
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
				<div>{comment.create_date}</div>
			</StyleInfo>
			<StyleComment>{comment.content}</StyleComment>
		</StylePostComment>
	)
}

export default Comment
