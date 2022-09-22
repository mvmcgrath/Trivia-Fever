import styled from 'styled-components'
import { useState } from 'react'
import { Container } from './StyleHelper'

const LoginBox = styled.div`
  background-color: #393E41;
  text-align: center;
  padding: 25px 150px 0px;
  border-radius: 25px;
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    padding: 25px 75px;
  }
`

const LoginText = styled.div`
  font-size: 1.5rem;

  @media (max-width: 1000px) {
    font-size: 3rem;
  }
`

const StyledInput = styled.input`
  height: 20px;
`

const StyledButton = styled.button`
  height: 50px;
  width: 150px;
  font-size: 2rem;
  margin-top: 20px;
  background-color: #393E41;
  color: white;
  border: 2px solid white;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 4rem;
  }
`

const StyledHeader = styled.p`
  margin: 0px;
`

const NotificationMessage = styled.p`
  padding: 0px;
  font-size: 1.3rem;
  margin-top: 20px;
  visibility: hidden;
  margin-bottom: 5px;
  color: red;

  @media (max-width: 1000px) {
    font-size: 2.6rem;
  }
`

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('Placeholder')


  const addLogin = async (event) => {
    event.preventDefault()

    try {
      await handleLogin({
        username,
        password
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Error: Incorrect username or password')
    }
  }

  return(
    <Container>
      <LoginBox>
        <form onSubmit={addLogin}>
          <LoginText>
            <StyledHeader>Username</StyledHeader>
            <StyledInput
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </LoginText>
          <LoginText>
            <StyledHeader>Password</StyledHeader>
            <StyledInput
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </LoginText>
          <StyledButton type="submit" id="login-button">Login</StyledButton>
        </form>
        <NotificationMessage>{notification}</NotificationMessage>
      </LoginBox>
    </Container>
  )
}

export default Login