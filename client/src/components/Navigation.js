import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = () => {
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

  return (
    <Bar>
      <LinkContainer>
        <StyledLink to="/">Trivia Fever</StyledLink>
        <StyledLink to="/game">Play</StyledLink>
        <StyledLink to="/create">Create</StyledLink>
        <StyledLink to="/stats">Statistics</StyledLink>
      </LinkContainer>
      <RightLinkContainer>
        <StyledLink to="/login">Login</StyledLink>
      </RightLinkContainer>
    </Bar>
  )
}

export default Navigation