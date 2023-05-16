import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './utils/AuthProvider/AuthProvider'
import { ThemeProvider } from './utils/ThemeProvider/ThemeProvider'
import Header from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
import Home from './components/pages/Home/Home'
import Users from './components/pages/Users/Users'
import { userlist } from './datas/UserList.js'
import LoginForm from './components/pages/LoginForm/LoginForm'
import RegisterForm from './components/pages/RegisterForm/RegisterForm'
import Groupes from './components/Groupes/Groupes.jsx'
import Tchat from './components/Tchat/Tchat.jsx'
import User from './components/pages/User/User'
import Profile from './components/pages/Profile/Profile.jsx'
import Error from './components/Error/Error'

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <GlobalStyle />
            <AppContent />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

function AppContent() {
  // Vous pouvez ajouter d'autres contextes ici
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/groups" element={<Groupes />} />
      <Route path="/tchat" element={<Tchat />} />
      <Route path="/profile" element={<User />} >
        {userlist.map((user, index) => (
          <Route
            key={`${user.pseudo}-${index}`}
            path={`/profile/:username`}
            element={
              <Profile
                pseudo={user.pseudo}
                photoProfile={user.picture}
                sexe={user.sexe}
                title={user.title} 
              />
            }
          />
        ))}
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}