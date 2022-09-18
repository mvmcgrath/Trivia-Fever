import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import Game from './components/Game'
import Stats from './components/Stats'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="container-fluid">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
