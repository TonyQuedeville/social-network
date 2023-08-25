/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant ShowConnected : Voyant d'indication user connecté (vert) ou non (rouge)
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyleContainer = styled.div `
    display: flex;
    align-items: center;
`
const StyleVoyant = styled.div `
    width: ${props => 10 * props.size}px;
    height: ${props => 10 * props.size}px;
    border-radius: 50%;
    background-color: ${props => (props.title === 'non connecté' ? '#ce0101' : '#4cce01')};
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
    margin: 10px;  
`
const StyleTitle = styled.div `
    font-style: italic;
    font-size: 0.8em;
	color: grey;
`

const ShowConnected = (props) => {
    const { isConnected, size } = props
    const title = isConnected ? 'connecté' : 'non connecté'

    return (
        <StyleContainer>
            <StyleVoyant 
                size={size}  
                alt={title}
                title={title}
            />
            <StyleTitle>{title}</StyleTitle>
        </StyleContainer>
    )
}

ShowConnected.defaultProps = {
    isAuthenticated: false,
    size: 1,
};

ShowConnected.propTypes = {
    isAuthenticated: PropTypes.bool,
    size: PropTypes.number,
};

export default ShowConnected