import Carousel from 'react-bootstrap/Carousel'
import { Col, Row, Image } from 'react-bootstrap'

const MainLogo = () => { 
    return (
        <section className='main-logo' id='home'>
            <Carousel fade>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo1.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>First slide label</h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo2.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>Second slide label</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo3.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>Third slide label</h2>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo4.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>Third slide label</h2>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}

export { MainLogo }