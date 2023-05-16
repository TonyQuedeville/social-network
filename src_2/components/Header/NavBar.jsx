// src/components/Header

import { Link } from 'react-router-dom'
import logo from '../../assets/icn/icn-STS.png'
import '../../styles/NavBar.css'
import IcnHome from '../IcnHome'
import IcnProfil from '../../../client/src/components/pages/Profile/IcnProfil.js'
import Button from '../Button.js'
/*import useRedirectToHome from '../../hooks/useRedirectToHome.js'
import useRedirectToLogin from '../../hooks/useRedirectToLogin.js'
import useRedirectToProfile from '../../hooks/useRedirectToProfile.js'
//*/

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const title = "Social Network"
    /*const redirectToHome = useRedirectToHome();
    const redirectToLogin = useRedirectToLogin();
    const redirectToProfile = useRedirectToProfile();

    // HomePage
    const handleHome = () => {
        redirectToHome();
    }

    // Se déconnecter
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    // Se connecter
    const handleLogin = () => {
        redirectToLogin();
    }

    // Profile
    const handleProfile = () => {
        redirectToProfile();
    }
    //*/

    return (
    <nav className='navbar'>
        <div className='groupIcn'>
            <img src={logo} alt={title} className='icn' />
            <Link to="/">
                <IcnHome />
            </Link>
        </div>

		<h1 className='title'>{title}</h1>

        <div className='groupIcn'>
            {isLoggedIn ? (
                <Link to="/">
                    <Button text="Logout" disabled={false} />
                </Link>
            ) : (
                <Link to="/login">
                    <Button text="Login" disabled={false} />
                </Link>
            )}

            <Link to="/profile">
                <IcnProfil text="My profile" disabled={isLoggedIn} />
            </Link>
        </div>
    </nav>
    )
}

export default Navbar
