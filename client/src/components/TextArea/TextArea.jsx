import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`
const InputStyle = styled.textarea `
    margin: 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
    &:disabled {
        cursor: not-allowed;
    }
`

const TextArea = (props) => {
    const { onChange, id, name, label, placeholder, title, value, disabled, required, rows, cols } = props

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
        <StyledDiv>
            <label htmlFor={id}>{label}</label>
            <InputStyle
                id={id}
                name={!name ? id : name}
                placeholder={placeholder}
                title={title}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                rows={rows}
                cols={cols}
            />
        </StyledDiv>
    )
}

TextArea.defaultProps = {
    rows: 5,
    cols: 30,
};

TextArea.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    rows: PropTypes.number,
    cols: PropTypes.number,
};

export default TextArea