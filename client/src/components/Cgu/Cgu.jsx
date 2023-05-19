import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icone from '../Icone/Icone.jsx'
import IcnDown from '../../assets/icn/icn-down.png'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

const CguContainer = styled.div`
  width: ${props => props.larg}%;
  height: ${props => (props.expanded ? 'auto' : '50px')};
  transition: height 300ms ease;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 1px;
  padding: 5px;
  border: solid 1px;
  border-radius: 10px;
  overflow: hidden;
`

const CguText = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word; 
`

const Cgu = (props) => {
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
      larg={larg} 
      expanded={expanded}
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