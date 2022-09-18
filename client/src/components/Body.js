import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table'
import firstScreenshot from '../assets/FirstScreenshot.png'
import secondScreenshot from '../assets/SecondScreenshot.png'
import thirdScreenshot from '../assets/ThirdScreenshot.png'

const Body = () => {
  return(
    <div>
      <div className="p-5 bg-secondary variant-dark">
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={firstScreenshot}
              alt="First screenshot"
            />
            <Carousel.Caption>
              <h3>Lots of fun!</h3>
              <p>It seriously is, you should believe me when I say that</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={secondScreenshot}
              alt="First screenshot"
            />
            <Carousel.Caption>
              <h3>Lots of fun!</h3>
              <p>It seriously is, you should believe me when I say that</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block mx-auto"
              src={thirdScreenshot}
              alt="First screenshot"
            />
            <Carousel.Caption>
              <h3>Lots of fun!</h3>
              <p>It seriously is, you should believe me when I say that</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="bg-primary variant-dark text-white text-center p-3">
        <h1>Features</h1>
      </div>
      <div className="bg-primary variant-dark text-white text-center p-2">
        <Table striped variant="dark">
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
        </Table>
      </div>
    </div>
  )
}

export default Body