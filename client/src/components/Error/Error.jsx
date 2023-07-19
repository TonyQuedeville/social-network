/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Error : Affiche la page Error 404
*/

import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
        height: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1px;
        border: solid 1px;
        border-radius: 10px;
    `

const Error = () => {

    return (
        <ErrorContainer>
            <h1>Error 404 !</h1>
        </ErrorContainer>
    )
}

export default Error