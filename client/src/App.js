import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import GameSelect from './components/Game/GameSelect'
import Play from './components/Game/Play'
import Stats from './components/Statistics/Stats'
import Create from './components/Create/Create'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = async (loginObject) => {
    const user = await loginService.login(loginObject)

    window.localStorage.setItem(
      'loggedTriviaUser', JSON.stringify(user)
    )

    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedTriviaUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTriviaUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ user ? <Navigate to="/game" /> : <Login handleLogin={handleLogin} />} />
        <Route path="/create" element={ user ? <Create /> : <Navigate to="/login" />} />
        <Route path="/game" element={<GameSelect />} />
        <Route path="/game/auto" element={<Play gameType='auto'/>} />
        <Route path="/game/user" element={<Play gameType='user'/>} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
