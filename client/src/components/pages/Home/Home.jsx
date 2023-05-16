// src/components/pages/Home

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