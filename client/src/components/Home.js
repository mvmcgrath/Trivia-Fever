import styled from 'styled-components'

const Home = () => {
  const BodyContainer = styled.div`
    display: flex;
    background-color: #A67DB8;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 100px 0px;
    color: white;
  `

  const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
  `

  const TextHeading = styled.h1`
    font-size: 4em;
    margin: 0px;
  `

  const Header = styled.header`
    font-size: 3em;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0px;
  `

  return(
    <BodyContainer>
      <Header>
        <TextHeading>Trivia Fever</TextHeading>
        <p>The web browser trivia game anyone can play</p>
      </Header>
      <BottomContainer>
        <div>
          <div>
            <h1>Features</h1>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>Play games of trivia with thousands of possible questions!</td>
                </tr>
                <tr>
                  <td>See detailed information about questions, including their percieved difficulty and category!</td>
                </tr>
                <tr>
                  <td>Create your own questions and games, that you can share with friends</td>
                </tr>
                <tr>
                  <td>Keep track of your trivia statistics, and see how you rank overall!</td>
                </tr>
                <tr>
                  <td>Become the best trivia player ever!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div>
            <h1>About</h1>
          </div>
        </div>
      </BottomContainer>
    </BodyContainer>
  )
}

export default Home