import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"

const About = () => {
    return (
        <section className="about" id="about">
            <Container>
                <h2 className='my-5'>About me</h2>
                <Row className="mb-4 justify-content-center">
                    <Col>
                        <p>
                            Welcome to my photography portfolio! I’m passionate about capturing moments and turning them into timeless memories. With a camera in hand and an eye for detail, I strive to create images that tell stories and evoke emotions.
                        </p>
                        <p>
                            Photography has been my creative outlet for over a decade. From breathtaking landscapes to intimate portraits, I’ve had the privilege of exploring diverse subjects and styles. Every click of the shutter is a chance to freeze a unique perspective in time.
                            My work is a reflection of my curiosity and love for the world around me. Through my lens, I aim to share a piece of my journey and the beauty I find in both the ordinary and the extraordinary.
                        </p>
                        <p>
                            Thank you for visiting my portfolio. Feel free to explore my galleries and get in touch if you’d like to collaborate or inquire about my services. Let’s capture moments together!
                        </p>
                    </Col>
                    <Col md={6} className="image-holder">
                        <Image className='my-1' src="./assets/img/about.JPG" alt="About me" rounded   />
                    </Col>
                </Row>
                <Row>
                    <h2>Process</h2>
                </Row>
                <Row>
                    <ListGroup horizontal={'md'} className="mt-4">
                        <ListGroup.Item>
                            <h3>Acquaintance</h3>
                            <p>
                                Every photoshoot starts with getting to know each other. We’ll discuss your ideas, preferences, and any specific moments you want to capture. This helps me tailor the shoot to your vision and style.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Prepayment</h3>
                            <p>
                                To secure your session date, a prepayment is required. This step ensures that your slot is reserved exclusively for you. Once the prepayment is received, we can move forward with planning the details.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Filming</h3>
                            <p>
                                The day of the photoshoot is all about bringing your ideas to life. I’ll guide you through the process, capturing authentic and candid moments. Whether it’s a portrait session or an event, I aim to make you feel comfortable and at ease.
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Result</h3>
                            <p>
                                After the shoot, I carefully curate and edit the photos to enhance their natural beauty. You’ll receive a collection of high-resolution images that tell the story of our session. These images are yours to cherish and share with your loved ones.
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Container>
        </section>
    )
}

export { About }