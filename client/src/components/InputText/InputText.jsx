// src/components/InputText

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputStyle = styled.input `
    margin: 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
    &:disabled {
        cursor: not-allowed;
    }
`

const InputText = (props) => {
    const { onChange, id, label, placeholder, title, value, type, disabled, required } = props

    const handleChange = (event) => {
        const { value } = event.target
        const validatedValue = validateInput(value)
        onChange({ target: { id, value: validatedValue } })
    }
    
    // Empèche l'injection de code
    const validateInput = (input) => {
        const regex = /[<>{}()*+=#&%!,;:]/
        if (regex.test(input)) {
            return input.replace(regex, '')
        }
        return input
    }

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <InputStyle
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                title={title}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                required={required}
            />
        </div>
    )
}

InputText.defaultProps = {
    type:'text'
};

InputText.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
};

export default InputText