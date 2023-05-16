// src/components/pages/Home

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../../HomePage';
import LoginForm from '../../LoginForm';
import ProfilePage from '../../ProfilePage';
import Navbar from '../../Header/index.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/">
            <HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>

          <Route path="/login">
            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
          </Route>
          
          <Route path="/profile">
            <ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </Route>
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
