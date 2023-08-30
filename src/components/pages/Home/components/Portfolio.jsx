import { useState, useEffect } from 'react'
import { Container, Row, Nav, Tab, TabPane, Image } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { PortfolioCard } from './PortfolioCard'
import { doc, getDoc, getFirestore, getDocs, collection } from "firebase/firestore"
import { useParallax } from 'react-scroll-parallax'

const Portfolio = () => {
    const [blackAndWhiteMode, setBlackAndWhiteMode] = useState(true)
    const [fullScreen, setFullScreen] = useState('hidden')
    const [fullScreenUrl, setFullScreenUrl] = useState('')
    const { ref } = useParallax({ speed: 5 })
    const [portfolioPhotos, setPortfolioPhotos] = useState([])
    const [categories, setCategories] = useState([])
    const responsive = {
        superLargeDesktop: {
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

    useEffect(() => {
        const fetchData = async () => {
            let cat = []
            const portfolioData = []
            const querySnapshot = await getDocs(collection(getFirestore(), "portfolio"))
            querySnapshot.forEach((doc) => {
                portfolioData.push({
                    category: doc.data().category,
                    imgUrl: doc.data().imgUrl,
                })
                !cat.includes(doc.data().category) && (cat.push(doc.data().category))
            })
            setPortfolioPhotos(portfolioData)
            setCategories(cat)
        }
        fetchData()
    },[])
    
    useEffect(() => {
        setTimeout(() => {
            const activeCategory = document.querySelector(`[data-rr-ui-event-key="${categories[0]}"]`)
            activeCategory.click()
        }, 50) 
    }, [categories])

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
                        <Tab.Container id="porfolio-tab" defaultActiveKey={categories[0]}>
                            <Nav variant="underline" className="mb-4 px-3 d-flex align-items-center">
                                {categories.map((category) => 
                                    <Nav.Item key={category} className='flex-fill'>
                                        <Nav.Link className='flex-fill' eventKey={category}>{category}</Nav.Link>
                                    </Nav.Item>
                                )}
                            </Nav>
                            <Tab.Content>
                                {categories.map((category) => 
                                    <TabPane key={category} eventKey={category}>
                                        <Carousel 
                                            responsive={responsive} 
                                            infinite={true} 
                                            autoPlay={true} 
                                            autoPlaySpeed={5000}
                                            className='portfolio-slider'>
                                            {portfolioPhotos.filter(photo =>  photo.category === category).map(filteredPhoto => {
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
                                )}
                            </Tab.Content>
                        </Tab.Container>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export { Portfolio }