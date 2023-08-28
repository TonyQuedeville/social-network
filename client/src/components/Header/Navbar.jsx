/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Composant Navbar : Barre de navigation
*/

import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { ThemeContext } from '../../utils/ThemeProvider/ThemeProvider.jsx'
import colors from '../../utils/style/Colors.js'
import styled from 'styled-components'
import Button from '../Button/Button.jsx'
import Notifications from '../Notifications/Notifications.jsx'
import Icone from '../Icone/Icone.jsx'
import IcnHome from '../../assets/icn/icn-home.jpg'
import IcnUsers from '../../assets/icn/icn-group.png'
import IcnGroupe from '../../assets/icn/icn-group-discut.png'
import IcnTchat from '../../assets/icn/icn-tchat.jpg'
import IcnNotif from '../../assets/icn/icn-notification.png'
import { handleLogout } from '../../redux/reducers.js'

const StyledNav = styled.nav `
    margin: 1px;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 1px;
    border-radius: 5px;
    background: ${props => (props.theme === 'light' ? `linear-gradient(to right, ${colors.backgroundLight}, ${colors.backgroundLightSoft})` : colors.backgroundDark)};
`

const StyledGroupIcn = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Navbar = () => {
    const { theme } = useContext(ThemeContext)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [showNotificationsWindow, setShowNotificationsWindow] = useState(false) // fenetre des notifications

    const handleNotifications = () => {
		setShowNotificationsWindow(true)
	}
    const handleLogoutClick = () => {
		dispatch(handleLogout())
        //console.log("user:",user);
	}

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
                {user.isAuthenticated ? (
                    <>
                        <Link to="/login">
                            <Button text="Se déconnecter" onClick={() => {handleLogoutClick()}} disabled={false} />
                        </Link>
                        <Link to={`/user/${user.id}`}>
                            <Icone 
                                alt="Mon profile" 
                                disabled={!user.isAuthenticated} 
                                image={`http://${window.location.hostname}:4000/download/${user.image}`}
                            />
                        </Link>
                        <Icone 
                            alt="Notifications" 
                            image={IcnNotif}
                            disabled={false}
                            onClick={handleNotifications}
                        />
                        {showNotificationsWindow && (
                            <Notifications
                                onClose={() => {setShowNotificationsWindow(false)}}
                            />						
						)}
                        
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