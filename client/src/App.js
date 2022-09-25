import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import GameSelect from './components/Game/GameSelect'
import PlayAuto from './components/Game/PlayAuto'
import PlayUser from './components/Game/PlayUser'
import Stats from './components/Stats'
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTriviaUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  //<Route path="/create" element={ user ? <Create /> : <Navigate to="/login" />} />

  return (
    <div>
      <Navigation user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ user ? <Navigate to="/game" /> : <Login handleLogin={handleLogin} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/game" element={<GameSelect />} />
        <Route path="/game/auto" element={<PlayAuto />} />
        <Route path="/game/user" element={<PlayUser />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
