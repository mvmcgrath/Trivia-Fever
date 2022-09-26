import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Bar = styled.div`
  display: flex;
  background-color: #393E41;
  padding: 20px 200px;
  font-size: 1.5em;
  align-items: center;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
    font-size: 3em;
  }
`

const LinkContainer = styled.div`
  margin: 0px;
  display: flex;
  justify-content: flex-start;
  column-gap: 1em;
  flex-basis: 100%
`
const RightLinkContainer = styled(LinkContainer)`
  justify-content: flex-end;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const StyledSpan = styled.span`
  color: white;
  margin-right: 20px;
`

const LogoutButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #4b5054;
  color: white;
  overflow-wrap: break-word;
  cursor: pointer;
`

const Navigation = ({ user, handleLogout }) => {

  const handleClick = (event) => {
    event.preventDefault()
    handleLogout()
  }


  return (
    <Bar>
      <LinkContainer>
        <StyledLink to="/">Trivia Fever</StyledLink>
        <StyledLink to="/game">Play</StyledLink>
        <StyledLink to="/create">Create</StyledLink>
        <StyledLink to="/stats">Statistics</StyledLink>
      </LinkContainer>
      <RightLinkContainer>
        {user === null ?
          <StyledLink to="/login">Login</StyledLink> :
          <div>
            <StyledSpan>{user.username}</StyledSpan>
            <LogoutButton onClick={handleClick}>Logout</LogoutButton>
          </div>}
      </RightLinkContainer>
    </Bar>
  )
}

export default Navigation