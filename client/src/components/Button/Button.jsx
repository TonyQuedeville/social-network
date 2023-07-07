// src/components/Button

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

const CommonButtonStyle = styled.button `
        padding: 10px;
        border-radius: ${props => (props.format === 'rond' ? '50%' : '5px')};
        border: solid 0px;
        background-color: ${colors.buttonColor};
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
        margin: 5px;
        transition: 200ms;
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
            box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
        }
        &:disabled {
            opacity: 0.8;
            cursor: not-allowed;
            box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.5);
        }
    `


function Button(props) {
    const { type, onClick, text, format, disabled } = props

    return (
        <CommonButtonStyle 
            type={type} 
            onClick={onClick} 
            format={format}
            disabled={disabled}
        >
            {text}
        </CommonButtonStyle>
    )
}

Button.defaultProps = {
    type: "button",
    text: '',
    format: '',
    disabled: false,
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    format: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button