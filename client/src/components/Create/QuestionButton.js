import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 1.5rem;
  border: 3px solid white;
  border-radius: 25px;
  background-color: #EC4E20;
  padding: 10px;
  color: white;
  max-width: 400px;
  overflow-wrap: break-word;
  cursor: pointer;
`

const QuestionButton = ({ loadQuestion, text, id }) => {

  const handleClick = (event) => {
    event.preventDefault()
    loadQuestion(id)
  }

  return(
    <StyledButton onClick={handleClick} id={id}>{text}</StyledButton>
  )
}

export default QuestionButton