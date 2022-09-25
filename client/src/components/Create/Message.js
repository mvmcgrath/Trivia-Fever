import styled from 'styled-components'

const MessageContainer = styled.div`
  background-color: #393E41;
  margin: 30px 100px 0px;
  height: 50px;
  border-radius: 10px;
  color: white;
  font-size: 2rem;
  display: ${props => props.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`

const Message = ({ message }) => {
  if (message === '') {
    return(
      <MessageContainer>
        {message}
      </MessageContainer>
    )
  }

  return(
    <MessageContainer visible>
      {message}
    </MessageContainer>
  )
}

export default Message