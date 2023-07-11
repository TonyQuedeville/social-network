import React, { useContext } from 'react'
import { AuthContext } from '../../../utils/AuthProvider/AuthProvider.jsx'
import { GroupContext } from '../../../utils/GroupProvider/GroupProvider.jsx'
//import PropTypes from 'prop-types'
import styled from 'styled-components'
//import colors from '../../../utils/style/Colors.js'
//import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
//import InputText from '../InputText/InputText.jsx'
//import TextArea from '../TextArea/TextArea.jsx'
//import Button from '../Button/Button.jsx'
//import RadioBouton from '../RadioBouton/RadioBouton.jsx'
//import Icone from '../Icone/Icone.jsx'
//import IcnPhoto from '../../assets/icn/icn_appareil_photo.svg'
//import InputFileImage from '../InputFileImage/InputFileImage.jsx'
//import DisplayImage from '../DisplayImage/DisplayImage.jsx'
//import FrenchFormatDateConvert from '../../utils/FrenchFormatDateConvert/FrenchFormatDateConvert.js'
import GroupeInfos from '../../GroupeInfos/GroupeInfos.jsx'
import NewPost from '../../NewPost/NewPost.jsx'
//import Post from './Post.jsx'

// css
const PageContainer = styled.div`
  height: 88.5vh;
  display: flex;
  flex-direction: row;
`
//const NewPostContainer = styled.div`
//  width: auto;
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//  justify-content: start;
//  margin: 1px;
//  padding: 5px;
//  border: solid 1px;
//  border-radius: 10px;
//  background: ${props => (props.theme === 'light' ? colors.backgroundLightSoft : colors.backgroundDark)};
//`

const Groupe = () => {
  //const { theme } = useContext(ThemeContext)
  const { authPseudo, authId, followedUsers } = useContext(AuthContext)
  const data = useContext(GroupContext)
  //console.log(data)

  const handleFollowedUsersChange = (followedUsers) => {
    console.log("followedUsers:", followedUsers)
  }

  return (
    <PageContainer>
      {data.admin === authPseudo ? (
        <div>Fonctionnalités supplémentaires réservées à l'administrateur</div>
      ) : null}
      <GroupeInfos {...data} />

      {data.membersIdList.includes(authId) ? (
        <NewPost
          followedUsers={followedUsers}
          onChange={handleFollowedUsersChange}
        />
      ) : (<></>)}
    </PageContainer>
  )
}

export default Groupe