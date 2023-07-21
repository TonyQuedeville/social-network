/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant RadioButton : 
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
  const { id, name, label, value, checked, onChange, disabled, required, title, alignment } = props;

  return (
    <RadioContainer alignment={alignment}>
      <StyleRadio
        type="radio"
        id={id}
        name={!name ? id : name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        title={title}
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

RadioBouton.defaultProps = {
  disabled: false
}

RadioBouton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.string,
}

export default RadioBouton;
