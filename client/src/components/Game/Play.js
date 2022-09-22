import { Container } from '../StyleHelper'
import { useParams } from 'react-router-dom'


const Play = () => {
  const id = useParams().id

  return(
    <Container>
      This is the game!
      {id}
    </Container>
  )
}

export default Play