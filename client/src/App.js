import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Navigation from './components/Navigation'
import Body from './components/Body'

const App = () => {
  return (
    <div>
      <Navigation />
      <Body />
    </div>
  )
}

export default App
