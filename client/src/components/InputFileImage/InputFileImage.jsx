import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputStyle = styled.input `
  margin: 5px;
  border-radius: 5px;
  border: solid 1px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
  &:disabled {
    cursor: not-allowed;
  }
`

const InputFileImage = (props) => {
  const { onChange, id, label, disabled, required } = props

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        // Fichier valide
        onChange(file)
      } else {
        // Fichier non valide
        console.log('Veuillez sélectionner une image.')
      }
    }
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <InputStyle 
        type="file" 
        id={id}
        accept="image/*" 
        onChange={handleFileChange}
        disabled={disabled}
        required={required}
      />
    </div>
  )
}

InputFileImage.defaultProps = {
  id:"fileImage",
  disabled: false
}

InputFileImage.propTypes = {
  id: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.string,
}

export default InputFileImage