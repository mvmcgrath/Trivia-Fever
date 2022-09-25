import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  width: 80%;
  background-color: #393E41;
  margin-bottom: 50px;
  padding 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 3px solid white;
  margin-top: 100px;
`

const Label = styled.label`
  font-size: 1.5rem;
  background-color: #4b5054;
  padding: 10px;
  border-radius: 10px;
`

const InfoBar = ({ question, number, correct }) => {
  return (
    <Container>
      <div>
        <Label>Difficulty: {question.difficulty}</Label>
      </div>
      <div>
        <Label>Category: {question.category}</Label>
      </div>
      <div>
        <Label>Question: {number}/10</Label>
      </div>
      <div>
        <Label>Correct Answers: {correct}</Label>
      </div>
    </Container>
  )
}

export default InfoBar