// src/components/Footer
/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Footer : Pied de page
*/


import { useContext } from 'react'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

const FooterContainer = styled.footer`
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: solid 1px;
    border-radius: 10px;
    background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
`

function Footer() {
    const { toggleTheme, theme } = useContext(ThemeContext)

    //console.log("Footer !");
    return (
        <FooterContainer theme={theme}>
            <NightModeButton onClick={() => toggleTheme()}>
                Théme : {theme === 'light' ? '☀️' : '🌙'}
            </NightModeButton>
        </FooterContainer>
    )
}

export default Footer