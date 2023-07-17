// src/components/InputText

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputStyle = styled.input `
    width: ${props => (props.size === "auto" ? "auto" : `${props.size}px`)};
    margin: 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
    &:disabled {
        cursor: not-allowed;
    }
`

const InputText = (props) => {
    const { onChange, id, name, label, placeholder, title, value, type, disabled, required, size } = props

    const handleChange = (event) => {
        const { value } = event.target
        const validatedValue = validateInput(value)
        onChange({ target: { id, name, value: validatedValue } })
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
                name={!name ? id : name}
                placeholder={placeholder}
                title={title}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                size={size}
            />
        </div>
    )
}

InputText.defaultProps = {
    type:'text',
    size: 'auto',
}

InputText.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default InputText