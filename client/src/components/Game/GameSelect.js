import styled from 'styled-components'
import { Container } from '../StyleHelper'
import { Link } from 'react-router-dom'

const SelectionContainer = styled.div`
  padding: 50px 300px 50px;
  background-color: #393E41;
  border-radius: 25px;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 1000px) {
    padding: 50px 100px 50px;
  }
`

const SelectionFlex = styled.div`
  display: flex;
  padding: 50px;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 7rem;
`

const StyledLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: white;
  border: 3px solid white;
  padding: 20px;
  border-radius: 25px;
  background-color: #4b5054;
`

const GameSelect = () => {
  return(
    <Container>
      <SelectionContainer>
        <h1>Select Game Type</h1>
        <SelectionFlex>
          <div>
            <StyledLink to="/game/auto">Normal Questions</StyledLink>
          </div>
          <div>
            <StyledLink to="/game/user">User Questions</StyledLink>
          </div>
        </SelectionFlex>
      </SelectionContainer>
    </Container>
  )
}

export default GameSelect