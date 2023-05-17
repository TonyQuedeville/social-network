// src/components/Checkbox

import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.alignment === 'vertical' ? 'column' : 'row')};
  margin: ${props => (props.alignment === 'vertical' ? '0 5px' : '5px 0')};
`
const CheckboxLabel = styled.label`
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
`
const StyleCheckbox = styled.input`
  margin: 5px;
  border-radius: 50%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
`

const Checkbox = (props) => {
  const { id, label, value, checked, onChange, disabled, required, alignment } = props

  return (
    <CheckboxContainer alignment={alignment}>
      <StyleCheckbox
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        />
      <CheckboxLabel 
        htmlFor={id}
        disabled={disabled}
      >{label}
      </CheckboxLabel>
    </CheckboxContainer>
  )
}

export default Checkbox;