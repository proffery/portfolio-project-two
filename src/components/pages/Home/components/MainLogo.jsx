import Carousel from 'react-bootstrap/Carousel'
import { Col, Row, Image } from 'react-bootstrap'
import { doc, getDoc, getDocs, collection, getFirestore} from "firebase/firestore"
import { useEffect, useState } from 'react'

const MainLogo = () => {
    const [logoTextLarge, setLogoTextLarge] = useState('')
    const [logoTextSmall, setLogoTextSmall] = useState('')
    const [blackAndWhite, setBlackAndWhite] = useState(true)
    const [logoPhotos, setLogoPhotos] = useState([]) 
    useEffect(() => {
        const getLogoText = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setLogoTextLarge(docSnap.data().banner_large)
                setLogoTextSmall(docSnap.data().banner_small)
                setBlackAndWhite(docSnap.data().bnw_mode)
              } else {
                console.log("No such document!");
            }
        }
        getLogoText()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const photosData = []
            const querySnapshot = await getDocs(collection(getFirestore(), 'main_logo'));
            querySnapshot.forEach((doc) => {
                photosData.push(doc.data())
            })
            setLogoPhotos(photosData)
        }
        fetchData()
    }, [])

    return (
        <section className='main-logo shadow' id='/#'>
            <Carousel controls={false} indicators={false} fade>
            {logoPhotos.map((photo, index)=>
                <Carousel.Item key={index}>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image 
                                style={blackAndWhite ? {filter: 'grayscale(100%)'} : {filter: 'none'}} 
                                src={photo.imgUrl} 
                            />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>{logoTextLarge}</h2>
                                <p>{logoTextSmall}</p>
                                <a href="#/#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
            )}
            </Carousel>
        </section>
    )
}

export { MainLogo }