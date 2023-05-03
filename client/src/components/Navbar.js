import logo from '../assets/icn/icn-STS.png'
import '../styles/NavBar.css'
import IcnHome from './IcnHome'

function Navbar() {
    const title = "Social Network"

    return (
    <div className='navbar'>
        <img src={logo} alt={title} className='logo' />
		<h1 className='title'>{title}</h1>
        <div>
            <IcnHome />
        </div>
    </div>
    )
}

export default Navbar