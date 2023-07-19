/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Home
    Page d'acceuil : Route http://localhost:3000/
*/

import React from "react"
import styled from 'styled-components'

const StyleHomePage = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
`

function Home() {
    return (
        <StyleHomePage>
            <h1>Page d'accueil </h1>
        </StyleHomePage>
    )
}

export default Home