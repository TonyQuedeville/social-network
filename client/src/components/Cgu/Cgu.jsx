/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Cgu : Affiche la fenetre repliable des conditions générale d'utilisation du reseau social.
*/

import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icone from '../Icone/Icone.jsx'
import IcnDown from '../../assets/icn/icn-down.png'
import colors from '../../utils/style/Colors.js'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

const CguContainer = styled.div`
  width: ${props => props.larg}%;
  height: ${props => (props.isexpanded === 'true' ? 'auto' : '50px')};
  transition: height 300ms ease;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 1px;
  padding: 5px;
  border: solid 1px;
  border-radius: 5px;
  overflow: hidden;
  background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundWhite})` : colors.backgroundDark)};
`

const CguText = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word; 
`

const Cgu = (props) => {
  const { theme } = useContext(ThemeContext)
  const { larg } = props
  const [cguText, setCguText] = useState('')
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    console.log("toggleExpand !");
    setExpanded(!expanded)
  }

  useEffect(() => {
    fetch('/datas/cgu.txt')
      .then(response => response.text())
      .then(text => setCguText(text))
      .catch(error => console.error('Error loading CGU:', error))
  }, [])

  return (
    <CguContainer 
      theme={theme}
      larg={larg} 
      isexpanded={expanded.toString()}
    >
      <TitleContainer>
        <p>Conditions générales d'utilisation</p>
        {expanded ? 
          <Icone 
              alt="Fermer les CGU" 
              image={IcnDown}
              disabled={false}
              size={0.5}
              onClick={!props.disabled ? toggleExpand : null}
              rotate={180}
          /> : 
          <Icone 
              alt="Lire les CGU" 
              image={IcnDown}
              disabled={false}
              size={0.5}
              onClick={!props.disabled ? toggleExpand : null}
          />
        }
      </TitleContainer>
      <CguText>{cguText}</CguText>
    </CguContainer>
  )
}

Cgu.defaultProps = {
  larg: null,
}

Cgu.propTypes = {
  larg: PropTypes.number,
}

export default Cgu