// src/components/Header

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/Colors.js'

const StyledNav = styled.nav `
    padding: 10px;
    background: ${colors.backgroundLight};
`

const StyledLink = styled(Link)`
    padding: 15px;
    color: ${colors.primary}
    text-decoration: none;
    font-size: 18px;
    margin: 10px;
`

const Navbar = () => {
    return (
        <StyledNav>
            <StyledLink to="/">Accueil</StyledLink>
            <StyledLink to="/users">Users</StyledLink>
            <StyledLink to="/profile">Profile</StyledLink>
        </StyledNav>
    )
}

export default Navbar