// src/utils/style

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