/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Point d'entrée de l'application Client : localhost:3000
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './utils/AuthProvider/AuthProvider'
import { GroupProvider } from './utils/GroupProvider/GroupProvider'
import { ThemeProvider } from './utils/ThemeProvider/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
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

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GroupProvider>
              <ThemeProvider>
                <Header />
                <GlobalStyle />
                <AppContent />
                <Footer />
              </ThemeProvider>
            </GroupProvider>
          </AuthProvider>
          </QueryClientProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/groups" element={<Groupes/>} />
      <Route path="/group/:groupId" element={<Groupe/>} />
      <Route path="/tchat" element={<Tchat/>} />
      <Route path="/user/:userid" element={<User />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}