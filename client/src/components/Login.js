import styled from 'styled-components'
import { useState } from 'react'

const LoginContainer = styled.div`
  padding: 200px 700px;
  color: white;
`

const LoginBox = styled.div`
  background-color: #393E41;
  text-align: center;
  padding: 50px 50px 0px;
  font-size: 2rem;
  border-radius: 25px;
`

const LoginText = styled.div`
  font-size: 1.5rem;
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
`

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('g')


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
    <LoginContainer>
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
    </LoginContainer>
  )
}

export default Login