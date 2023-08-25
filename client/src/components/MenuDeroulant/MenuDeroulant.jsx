/*
	Projet Zone01 : Social network
	Tony Quedeville 
	25/08/2023
	Composant MenuDeroulant : Affiche un menu déroulant
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

const CommonButtonStyle = styled.select `
    width:97%;
    padding: 10px;
    border-radius: 5px;
    border: solid 1px;
    background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundWhite}, ${colors.backgroundLight})` : colors.backgroundDark)};
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    margin: 5px;
    transition: 200ms;
    &:hover {
        transform: scale(1.02);
        cursor: pointer;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
    }
    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
        box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.5);
    }
    outline: 0;
`


function MenuDeroulant(props) {
    const { onChange, disabled, id, name, theme, options } = props

    return (
        <CommonButtonStyle 
            onChange={onChange} 
            disabled={disabled}
            id={id}
            name={name}
            theme={theme}
        >
        {options.map((option, index) => (
            <option key={index} value={option.id}>
                {option.name}
            </option>
        ))}
        </CommonButtonStyle>
    )
}

MenuDeroulant.defaultProps = {
    format: '',
    disabled: false,
}

MenuDeroulant.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    theme: PropTypes.string,
}

export default MenuDeroulant