import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const IcnContainer = styled.div `
    width: ${props => 40 * props.size}px;
    height: ${props => 40 * props.size}px;
    border-radius: 15%;
    background-color: #FFFF;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.2;
            cursor: not-allowed;
    `}
    margin: 10px;
    transition: 200ms;
    &:hover {
        transform: scale(1.05);
        cursor: pointer;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
    }
`
const IcnStyle = styled.img `
    width: 90%;
    margin: 3px;
`

const Icone = (props) => {
    const { image, alt, disabled, size } = props

    return (
        <IcnContainer size={size}>
            <IcnStyle 
                src={image} 
                alt={alt} 
                title={alt}
                disabled={disabled}                 
            />
        </IcnContainer>
    )
}

Icone.defaultProps = {
    src: '',
    size: 1,
    disabled: false,
    title: '',
};

Icone.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    title: PropTypes.string,
};

export default Icone