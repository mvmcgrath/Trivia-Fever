import { Link } from 'react-router-dom'

const Navigation = () => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  return (
    <span>
      <Link style={linkStyle} to="/">Trivia Fever</Link>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/game">Play</Link>
      <Link style={linkStyle} to="/stats">Statistics</Link>
      <Link style={linkStyle} to="/login">Login</Link>
    </span>
  )
}

export default Navigation