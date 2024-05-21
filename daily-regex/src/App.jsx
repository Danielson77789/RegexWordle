import { useState } from 'react'
import './css/App.css'
import LoginCard from './components/Login-Card'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import GamePage from './pages/GamePage';


function App() {

  return (
    
    <Router>
      <Routes>
        <Route exact path='/' Component={LoginPage} />
        <Route exact path='/game-page' Component={GamePage} />
      </Routes>
    </Router>

    // <>
    //   <LoginCard/>
    // </>
  )
}

export default App
