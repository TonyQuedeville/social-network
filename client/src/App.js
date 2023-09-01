/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Point d'entrée de l'application Client : localhost:3000
*/

import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { updateUserData, setWaitFollowers, setWaitGroupsAccept, setEvents, setIsAuthenticated } from './redux/reducers'
import { GroupProvider } from './utils/GroupProvider/GroupProvider'
import { ThemeProvider } from './utils/ThemeProvider/ThemeProvider'
import { makeRequest } from './utils/Axios/Axios.js'

//import { io } from "socket.io-client" // npm install socket.io-client
import { socket } from './socket';
// import { ConnectionState } from './utils/ConnectionState/ConnectionState'; // Pour test et debuguage uniquement
// import { ConnectionManager } from './utils/ConnectionManager/ConnectionManager'; // Pour test et debuguage uniquement
// import TchatEvents from './components/TchatEvents/TchatEvents'

import Header from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
import Home from './components/pages/Home/Home'
import Users from './components/pages/Users/Users.jsx'
import LoginForm from './components/pages/LoginForm/LoginForm'
import RegisterForm from './components/pages/RegisterForm/RegisterForm'
import Groupes from './components/Groupes/Groupes.jsx'
import Groupe from './components/pages/Groupe/Groupe.jsx'
import Tchat from './components/Tchat/Tchat.jsx'
import User from './components/pages/User/User.jsx'
import Error from './components/Error/Error'
import Cookies from 'js-cookie' // npm install js-cookie


function App() {
  const dispatch = useDispatch()

  // Verification connection Socket.io pour debugage
  //const [ isConnected, setIsConnected ] = useState(socket.connected);
  //const [ tchatEvents, setTchatEvents ] = useState([]);

  useEffect(() => {
    function onDisconnect() {
      //setIsConnected(false);
    }

    function onEvent(value) {
      //setTchatEvents(previous => [...previous, value]);
    }

    socket.on('disconnect', onDisconnect);
    socket.on('tchatEvent', onEvent);
  }, [])


  useEffect(() => {
    const Verifcookie = async () => {
      try {
        const { data } = await makeRequest.get(`/verifcookie`)
        dispatch(updateUserData(data.datas.user))
        dispatch(setWaitFollowers(data.datas.waitFollowers))
        dispatch(setWaitGroupsAccept(data.datas.waitGroupsAccept))
        dispatch(setEvents(data.datas.events))
        dispatch(setIsAuthenticated(true))
        socket.connect()
        socket.emit('userConnect', data.datas.user.pseudo);
      } catch (error) {
        console.log("Erreur Verifcookie:", error);
        socket.disconnect();
      }
    }
    
    if (Cookies.get('session')) {
      Verifcookie()
    }

  }, [dispatch])

  // Application
  return (
    <Router>
      <GroupProvider>
        <ThemeProvider>
          {/* <ConnectionState isConnected={ isConnected } /> 
          <ConnectionManager /> */}
          {/* <TchatEvents events={ tchatEvents } /> */}
          <Header />
          <GlobalStyle />
          <AppContent />
          <Footer />
        </ThemeProvider>
      </GroupProvider>
    </Router>
  )
}

// Routes
function AppContent() {  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/groups" element={<Groupes />} />
      <Route path="/group/:groupId" element={<Groupe />} />
      <Route path="/tchat" element={<Tchat />} />
      <Route path="/user/:userid" element={<User />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
