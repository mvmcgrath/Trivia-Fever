import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #4b5054;
  padding: 10px;
  color: white;
  min-height: 58px;
  width: 340px;
  overflow-wrap: break-word;
  cursor: pointer;
  margin-bottom: 10px;
`

const QuestionButton = ({ loadQuestion, question }) => {

  const handleClick = (event) => {
    event.preventDefault()
    loadQuestion(question)
  }

  return(
    <StyledButton onClick={handleClick} id={question.id}>{question.content}</StyledButton>
  )
}

export default QuestionButton