import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const GroupContainer = styled.div`
  width: ${props => props.larg}%;
  min-height: 88.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1px;
  border: solid 1px;
  border-radius: 10px;
`

const Groupes = (props) => {
  const { larg } = props

  return (
    <GroupContainer larg={larg}>
      Groupes
    </GroupContainer>
  )
}

Groupes.defaultProps = {
  larg: null,
}

Groupes.propTypes = {
  larg: PropTypes.number,
}

export default Groupes