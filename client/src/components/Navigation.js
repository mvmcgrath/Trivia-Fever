import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href='#'>
          <Link style={linkStyle} to="/">Trivia Fever</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={linkStyle} to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={linkStyle} to="/game">Play</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={linkStyle} to="/stats">Statistics</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" as="span">
              <Link style={linkStyle} to="/login">Login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation