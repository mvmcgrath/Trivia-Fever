import Carousel from 'react-bootstrap/Carousel'
import firstScreenshot from '../assets/FirstScreenshot.png'
import secondScreenshot from '../assets/SecondScreenshot.png'
import thirdScreenshot from '../assets/ThirdScreenshot.png'

const Body = () => {
  return(
    <div className="h-100">
      <div className="variant-dark text-white text-center p-5">
        <h1>Trivia Fever</h1>
        <p>A fun web browser based trivia game!</p>
      </div>
      <div className="variant-dark mx-auto">
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
    </div>
  )
}

export default Body