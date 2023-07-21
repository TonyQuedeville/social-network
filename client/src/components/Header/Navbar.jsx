/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Navbar : Barre de navigation
*/

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'
import Button from '../Button/Button.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnHome from '../../assets/icn/icn-home.jpg'
import IcnUsers from '../../assets/icn/icn-group.png'
import IcnGroupe from '../../assets/icn/icn-group-discut.png'
import IcnTchat from '../../assets/icn/icn-tchat.jpg'
//import DefaultPictureH from '../../assets/img/user-profile-avatar-h.png'
//import DefaultPictureF from '../../assets/img/user-profile-avatar-f.png'
import { AuthContext } from '../../utils/AuthProvider/AuthProvider.jsx'
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'

const StyledNav = styled.nav `
    margin: 1px;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 1px;
    border-radius: 10px;
    background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`

const StyledGroupIcn = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Navbar = () => {
    const { theme } = useContext(ThemeContext)
    const { authId, photoProfile, isAuthenticated, handleLogout } = useContext(AuthContext)

    return (
        <StyledNav theme={theme}>
            <StyledGroupIcn>
                <Link to="/">
                    <Icone 
                        alt="Page d'accueil" 
                        image={IcnHome}
                        disabled={false}
                    />
                </Link>
                <Link to="/users">
                    <Icone 
                        alt="Communauté" 
                        image={IcnUsers}
                        disabled={false}
                    />
                </Link>
                <Link to="/groups">
                    <Icone 
                        alt="Groupes de discution" 
                        image={IcnGroupe}
                        disabled={false}
                    />
                </Link>
                <Link to="/tchat">
                    <Icone 
                        alt="Tchat" 
                        image={IcnTchat}
                        disabled={false}
                    />
                </Link>
            </StyledGroupIcn>

            <StyledGroupIcn>
                {isAuthenticated ? (
                    <>
                        <Link to="/">
                            <Button text="Se déconnecter" onClick={handleLogout} disabled={false} />
                        </Link>
                        <Link to={`/user/${authId}`}>
                            <Icone 
                                alt="Mon profile" 
                                disabled={!isAuthenticated} 
                                image={`http://${window.location.hostname}:4000/download/${photoProfile}`}
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button text="Se connecter" disabled={false} />
                        </Link>
                        <Link to="/register">
                            <Button text="Créer un compte" disabled={false} />
                        </Link>
                    </>
                )}
            </StyledGroupIcn>
        </StyledNav>
    )
}

export default Navbar