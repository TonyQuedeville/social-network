import React, { useContext } from 'react'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import styled from 'styled-components'
//import colors from '../../utils/style/Colors.js'
//import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
//import InputFileImage from '../InputFileImage/InputFileImage.jsx'
import DisplayImage from '../DisplayImage/DisplayImage.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnNotification from '../../assets/icn/icn-notification.png'

// css
const StyleGroupContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 1px;
	padding: 5px;
	border: solid 1px;
	border-radius: 10px;
`
const StyleTitleGroupe = styled.div`
	font-weight : bold;
	display: flex;
	justify-content: center;
	margin: 5px;
	font-size: 1.5em;
`
const StyleBanner = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	border: solid 1px;
	border-radius: 10px;
`
const StyleInfo = styled.div`
	width: 30%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 5px;
	color: grey;
`
const StyleRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`
const StyleBold = styled.p`
	font-weight : bold;
	margin-right: 5px;
`

// Composant
const GroupeInfos = (props) => {
	const {groupId, title, admin, createDate, description, image, nbMembers } = props
	const { groupListRequested } = useContext(AuthContext)
	
	return (
		<StyleGroupContainer>
			<StyleTitleGroupe>
				{title}
			</StyleTitleGroupe>

			<StyleBanner>
				{image ? (
					<DisplayImage
						id={"groupImage-" + groupId}
						src={require(`../../assets/img/${image}`).default}
						alt={"Image " + title}
						disabled={false}
					/>) : <></>}
					<StyleInfo>
						<StyleBold>A propos:</StyleBold>
						<StyleRow>{description}</StyleRow>
						<StyleRow><StyleBold>Admin:</StyleBold> {admin}</StyleRow>
						<StyleRow><StyleBold>Date de création:</StyleBold>{FrenchFormatDateConvert(createDate)}</StyleRow>
						<StyleRow><StyleBold>Membres:</StyleBold> {nbMembers}</StyleRow>
					</StyleInfo>
			</StyleBanner>

			<>
				{ groupListRequested.includes(groupId) && (
					<StyleRow>
						<Icone 
							alt="Demande d'adhésion à ce groupe en cours acception !" 
							image={IcnNotification}
							size={0.5}
						/>
						<p>Demande d'adhésion à ce groupe en cours acception !</p>
					</StyleRow>
					)
				}
			</>
		</StyleGroupContainer>
	)
}

export default GroupeInfos