/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Style Permet de definir les thémes de couleur clair ou sombre de l'application
*/


import { useContext } from 'react'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'
import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        background-color: ${({ isDarkMode }) =>
            isDarkMode ? '#2F2E41' : 'white'
        };
        color: ${({ isDarkMode }) =>
            isDarkMode ? 'white' : 'black'
        };
        margin: 0;
    }
`

function GlobalStyle() {
    const { theme } = useContext(ThemeContext)
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle