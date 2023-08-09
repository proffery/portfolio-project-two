import { Container, Row, Nav, Tab, TabPane } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { PortfolioCard } from './PortfolioCard';

const Portfolio = () => {
    const porfolioPhoto = [{
        category: "Individual",
        imgUrl: './assets/img/individual1.JPG'
    }, {
        category: "Individual",
        imgUrl: './assets/img/individual2.JPG'
    }, {
        category: "Individual",
        imgUrl: './assets/img/individual3.JPG.png'
    }]

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    }

    return (
        <section className="porfolio" id="portfolio">
            <Container>
                <Row>
                    <h2 className='my-5'>Portfolio</h2>
                    <Tab.Container id="porfolio-tab" defaultActiveKey='first'>
                        <Nav variant="underline" className="mb-5 px-3 d-flex align-items-center">
                            <Nav.Item className='flex-fill'>
                                <Nav.Link className='flex-fill' eventKey="first">Individual</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='flex-fill'>
                                <Nav.Link className='flex-fill' eventKey="second">Love story</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='flex-fill '>
                                <Nav.Link className='flex-fill' eventKey="third">Street</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <TabPane eventKey='first'>
                                <Carousel responsive={responsive} infinite={true} className='portfolio-slider'>
                                {porfolioPhoto.filter(photo =>  photo.category === 'Individual').map(filteredPhoto => {
                                    return (
                                        <PortfolioCard key={filteredPhoto.category + filteredPhoto.imgUrl} {...filteredPhoto}/>
                                    )
                                })}
                                </Carousel>
                            </TabPane>
                            <TabPane eventKey='second'>
                            <Carousel responsive={responsive} infinite={true} className='portfolio-slider'>
                                {porfolioPhoto.filter(photo =>  photo.category === 'Love story').map(filteredPhoto => {
                                    return (
                                        <PortfolioCard key={filteredPhoto.category + filteredPhoto.imgUrl} {...filteredPhoto}/>
                                    )
                                })}
                                </Carousel>
                            </TabPane>
                            <TabPane eventKey='third'>
                            <Carousel responsive={responsive} infinite={true} className='portfolio-slider'>
                                {porfolioPhoto.filter(photo =>  photo.category === 'Street').map(filteredPhoto => {
                                    return (
                                        <PortfolioCard key={filteredPhoto.category + filteredPhoto.imgUrl} {...filteredPhoto}/>
                                    )
                                })}
                                </Carousel>
                            </TabPane>
                        </Tab.Content>
                    </Tab.Container>
                </Row>
            </Container>
        </section>
    )
}

export { Portfolio }