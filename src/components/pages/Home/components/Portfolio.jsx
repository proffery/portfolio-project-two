import { useState, useEffect } from 'react'
import { Container, Row, Nav, Tab, TabPane, Image } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { PortfolioCard } from './PortfolioCard'
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { useParallax } from 'react-scroll-parallax'

const Portfolio = () => {
    const [blackAndWhiteMode, setBlackAndWhiteMode] = useState(true)
    const [fullScreen, setFullScreen] = useState('hidden')
    const [fullScreenUrl, setFullScreenUrl] = useState('')
    const { ref } = useParallax({ speed: 5 })
    const porfolioPhotos = [{
        category: "Individual",
        imgUrl: './assets/img/porfolio_individual1.JPG'
    }, {
        category: "Individual",
        imgUrl: './assets/img/porfolio_individual2.JPG'
    }, {
        category: "Individual",
        imgUrl: './assets/img/porfolio_individual3.JPG'
    }, {
        category: "Love story",
        imgUrl: './assets/img/logo2.JPG'
    }, {
        category: "Individual",
        imgUrl: './assets/img/porfolio_individual4.JPG'
    }, {
        category: "Love story",
        imgUrl: './assets/img/porfolio_love1.JPG'
    }, {
        category: "Love story",
        imgUrl: './assets/img/porfolio_love2.JPG'
    }, {
        category: "Love story",
        imgUrl: './assets/img/porfolio_love3.JPG'
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

    useEffect(() => {
        const getGenetalData = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setBlackAndWhiteMode(docSnap.data().bnw_mode)
            } else {
                console.log("No such document!")
            }
        }
        getGenetalData()
    }, [])
    
    return (
        <>
            {fullScreen === 'visible' &&
                <div 
                    style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    visibility: `${fullScreen}`,
                    zIndex: '9999'
                    }}>
                    <Image 
                        className='shadow'
                        style={{
                            width: '100vw',
                            height: '100vh',
                            objectFit: 'contain'
                        }} 
                        src={fullScreenUrl} 
                        onClick={() => setFullScreen('hidden')}
                    />
                </div>
            }
            <section ref={ref} className="portfolio" id="/#portfolio">
                <Container>
                    <h2 className='my-4'>Portfolio</h2>
                    <Row>
                        <Tab.Container id="porfolio-tab" defaultActiveKey='first'>
                            <Nav variant="underline" className="mb-4 px-3 d-flex align-items-center">
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
                                    <Carousel 
                                        responsive={responsive} 
                                        infinite={true} 
                                        autoPlay={true} 
                                        autoPlaySpeed={5000}
                                        className='portfolio-slider'>
                                        {porfolioPhotos.filter(photo =>  photo.category === 'Individual').map(filteredPhoto => {
                                            return (
                                                <PortfolioCard 
                                                    key={filteredPhoto.category + filteredPhoto.imgUrl} 
                                                    {...filteredPhoto} 
                                                    blackAndWhiteMode={blackAndWhiteMode}
                                                    setFullScreen={setFullScreen}
                                                    setFullScreenUrl={setFullScreenUrl}
                                                />
                                                )
                                            })}
                                    </Carousel>
                                </TabPane>
                                <TabPane eventKey='second'>
                                <Carousel responsive={responsive} 
                                        infinite={true} 
                                        autoPlay={true} 
                                        autoPlaySpeed={5000}
                                        className='portfolio-slider'>
                                        {porfolioPhotos.filter(photo =>  photo.category === 'Love story').map(filteredPhoto => {
                                            return (
                                                <PortfolioCard 
                                                    key={filteredPhoto.category + filteredPhoto.imgUrl} 
                                                    {...filteredPhoto} 
                                                    blackAndWhiteMode={blackAndWhiteMode}
                                                    setFullScreen={setFullScreen}
                                                    setFullScreenUrl={setFullScreenUrl}
                                                />
                                                )
                                            })}
                                    </Carousel>
                                </TabPane>
                                <TabPane eventKey='third'>
                                <Carousel responsive={responsive} 
                                        infinite={true} 
                                        autoPlay={true} 
                                        autoPlaySpeed={5000}
                                        className='portfolio-slider'>
                                        {porfolioPhotos.filter(photo =>  photo.category === 'Street').map(filteredPhoto => {
                                            return (
                                                <PortfolioCard 
                                                    key={filteredPhoto.category + filteredPhoto.imgUrl} 
                                                    {...filteredPhoto} 
                                                    blackAndWhiteMode={blackAndWhiteMode}
                                                    setFullScreen={setFullScreen}
                                                    setFullScreenUrl={setFullScreenUrl}
                                                />
                                            )
                                            
                                        })}
                                    </Carousel>
                                </TabPane>
                            </Tab.Content>
                        </Tab.Container>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export { Portfolio }