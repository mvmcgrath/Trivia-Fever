import styled from 'styled-components'
import { useState } from 'react'
import { Container } from './StyleHelper'

const VerticalContainer = styled(Container)`
  flex-direction: column;
`

const LoginBox = styled.div`
  background-color: #393E41;
  text-align: center;
  padding: 25px 150px 0px;
  border-radius: 25px;
  margin-bottom: 20px;
  border: 3px solid white;

  @media (max-width: 1000px) {
    padding: 25px 75px;
  }
`

const DisplayBox = styled(LoginBox)`
  padding: 25px;
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
  color: white;
  border: 2px solid white;
  cursor: pointer;
  border-radius: 10px;
  background-color: #4b5054;

  @media (max-width: 1000px) {
    font-size: 4rem;
  }
`

const StyledHeader = styled.label`
  margin: 0px;
  display: block;
`

const NotificationMessage = styled.p`
  padding: 0px;
  font-size: 1.3rem;
  margin-top: 20px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  margin-bottom: 5px;
  color: red;

  @media (max-width: 1000px) {
    font-size: 2.6rem;
  }
`
const VistingMessage = styled.p`
  font-size: 1.5rem;
`


const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(false)


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
      setNotification(true)
    }
  }

  return(
    <VerticalContainer>
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
        {notification ? <NotificationMessage visible>Invalid username or password</NotificationMessage> : <NotificationMessage>Invalid username or password</NotificationMessage>}
      </LoginBox>
      <DisplayBox>
        <VistingMessage>Just visiting? Use <strong>Username: root</strong> and <strong>Password: 1234</strong> to login!</VistingMessage>
      </DisplayBox>
    </VerticalContainer>
  )
}

export default Login