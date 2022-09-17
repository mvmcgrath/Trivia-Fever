import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href='#home'>
          Trivia Fever
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              Home
            </Nav.Link>
            <Nav.Link href="#" as="span">
              Play
            </Nav.Link>
            <Nav.Link href="#" as="span">
              Statistics
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" as="span">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation