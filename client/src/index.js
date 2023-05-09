import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './utils/context'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalStyle from './utils/style/GlobalStyle'
import Home from './components/pages/Home'
import { userlist } from './datas/UserList.js'
import Users from './components/pages/Users'
import Profile from './components/pages/Profile'
import Error from './components/Error'


ReactDOM.render(
  <React.StrictMode>
      <Router>
        <ThemeProvider>
          <Header />

          <GlobalStyle />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />

              <Route path="/profile" element={<Profile />} >
                { /* Imbrication des composants dans profile */}
                <Route path="toto" element={<Profile 
                        pseudo={userlist[0].pseudo}
                        photoProfile={userlist[0].picture}
                        title={userlist[0].jobTitle}/>} />
                <Route path="titi" element={<Profile 
                        pseudo={userlist[1].pseudo}
                        photoProfile={userlist[1].picture}
                        title={userlist[1].jobTitle}/>} />
                <Route path="tata" element={<Profile 
                        pseudo={userlist[2].pseudo}
                        photoProfile={userlist[2].picture}
                        title={userlist[2].jobTitle}/>} />
              </Route>

              <Route path="*" element={<Error />} />
            </Routes>

          <Footer />
        </ThemeProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
