// src/components/Button

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

const CommonButtonStyle = styled.button `
        padding: 10px;
        border-radius: 5px;
        border: solid 0px;
        background-color: ${colors.buttonColor};
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
        margin: 5px;
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.5);
        }
        transition: 200ms;
        &:hover {
            transform: scale(1.05);
            cursor: pointer;
            box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
        }
    `


function Button(props) {
    const { onClick, text, disabled } = props

    return (
        <CommonButtonStyle onClick={onClick} disabled={disabled}>
            {text}
        </CommonButtonStyle>
    );
}

Button.defaultProps = {
    text: '',
    disabled: false,
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button