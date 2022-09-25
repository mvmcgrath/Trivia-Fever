import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #4b5054;
  padding: 10px;
  color: white;
  min-height: 80px;
  width: 340px;
  overflow-wrap: break-word;
  cursor: pointer;
  margin-bottom: 10px;
`

const WrongButton = styled(StyledButton)`
  border: 3px solid red;
`

const CorrectButton = styled(StyledButton)`
  border: 3px solid green;
`

const AnswerButton = ({ handleAnswer, answer, letter, status }) => {
  const handleClick = (event) => {
    event.preventDefault()
    handleAnswer(letter)
  }

  if (status === 'Wrong') {
    return(
      <WrongButton onClick={handleClick}>{answer}</WrongButton>
    )
  }

  if (status === 'Correct') {
    return(
      <CorrectButton onClick={handleClick}>{answer}</CorrectButton>
    )
  }

  return(
    <StyledButton onClick={handleClick}>{answer}</StyledButton>
  )
}

export default AnswerButton