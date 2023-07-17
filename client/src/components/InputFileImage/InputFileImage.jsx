import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Popup from '../Popup/Popup.jsx'

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
  const { onChange, id, name, label, disabled, required } = props

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      if (file.type.startsWith('image/')) {
        // Fichier valide
        onChange(file)
        setNotification("")
      } else {
        // Fichier non valide
        setNotification("Erreur ! ce fichier n'est pas une image.")
      }
    }
  }

  const [notification, setNotification] = useState('')

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <InputStyle 
        type="file" 
        id={id}
        name={!name ? id : name}
        accept="image/*" 
        onChange={handleFileChange}
        disabled={disabled}
        required={required}
      />

      {notification && (
        <Popup texte={notification} type='error' />
      )}
    </div>
  )
}

InputFileImage.defaultProps = {
  id:"fileImage",
  disabled: false
}

InputFileImage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.string,
}

export default InputFileImage