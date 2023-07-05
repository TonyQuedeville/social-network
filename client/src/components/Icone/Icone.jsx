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
    margin: 10px;
    transition: 200ms;
    ${(props) =>
        !props.disabled &&
        css`
            &:hover {
            transform: scale(1.05);
            cursor: pointer;
            box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
        }
    `}
    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.2;
            cursor: not-allowed;
    `}
    
`
const IcnStyle = styled.img `
    width: 90%;
    margin: 3px;
    transition: 300ms;
    transform: rotate(${props => props.rotate}deg);
`

const Icone = (props) => {
    const { image, alt, disabled, size, onClick, rotate } = props

    return (
        <IcnContainer 
            size={size}
            disabled={disabled}  
            onClick={!props.disabled ? onClick : null}
        >
            <IcnStyle 
                src={image} 
                alt={alt} 
                title={alt}
                rotate={rotate}
            />
        </IcnContainer>
    )
}

Icone.defaultProps = {
    alt: '',
    size: 1,
    disabled: false,
    title: '',
    rotate: 0,
};

Icone.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    size: PropTypes.number,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    onClick: PropTypes.func,
    rotate: PropTypes.number,
};

export default Icone