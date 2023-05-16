// src/components/RadioButton

import React from 'react'
import styled from 'styled-components'

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.alignment === 'vertical' ? 'column' : 'row')};
  margin: ${props => (props.alignment === 'vertical' ? '0 5px' : '5px 0')};
`
const RadioLabel = styled.label`
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
`
const StyleRadio = styled.input`
  margin: 5px;
  border-radius: 50%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
`

const RadioBouton = (props) => {
  const { id, label, value, checked, onChange, disabled, required, alignment } = props;

  return (
    <RadioContainer alignment={alignment}>
      <StyleRadio
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        />
      <RadioLabel 
        htmlFor={id}
        disabled={disabled}
      >{label}
      </RadioLabel>
    </RadioContainer>
  );
};

export default RadioBouton;
