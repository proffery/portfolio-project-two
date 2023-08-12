import Carousel from 'react-bootstrap/Carousel'
import { Col, Row, Image } from 'react-bootstrap'
import { useParallax } from 'react-scroll-parallax'

const MainLogo = () => { 
    const { ref } = useParallax({ speed: -10 })

    return (
        <section ref={ref} className='main-logo' id='home'>
            <Carousel fade>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo1.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>Your Moments Captured</h2>
                                <p>Welcome to my photography studio, where every moment is a memory waiting to be captured.</p>
                                <a href="#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo2.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>Your Moments Captured</h2>
                                <p>Welcome to my photography studio, where every moment is a memory waiting to be captured.</p>
                                <a href="#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo3.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>Your Moments Captured</h2>
                                <p>Welcome to my photography studio, where every moment is a memory waiting to be captured.</p>
                                <a href="#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src="./assets/img/logo4.JPG" />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>Your Moments Captured</h2>
                                <p>Welcome to my photography studio, where every moment is a memory waiting to be captured.</p>
                                <a href="#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}

export { MainLogo }