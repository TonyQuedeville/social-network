import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icone from '../Icone/Icone.jsx'
import IcnNotification from '../../assets/icn/icn-notification.png'
import IcnErreur from '../../assets/icn/icn-error.png'

const PopupContainer = styled.div `
  border-radius: 10px;
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TexteContainer = styled.p`
  margin: 10px;
  color: ${props => (props.type === 'error' ? 'red' : 'black')} 
`

const Popup = (props) => {
  const { texte, type } = props
  console.log("Popup !");

  return (
    <PopupContainer>
      <>
        <Icone 
          alt="Notification" 
          image={type === 'error' ? IcnErreur : IcnNotification}
          disabled={false}
          size={0.5}
        />
        <TexteContainer type={type}>
          { texte }
        </TexteContainer>
      </>
    </PopupContainer>
  )
}

Popup.defaultProps = {
  texte: '',
  type: '',
}

Popup.propTypes = {
  texte: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Popup