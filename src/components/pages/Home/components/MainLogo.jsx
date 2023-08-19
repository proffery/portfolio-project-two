import Carousel from 'react-bootstrap/Carousel'
import { Col, Row, Image } from 'react-bootstrap'
import { doc, getDoc, getFirestore} from "firebase/firestore"
import { useEffect, useState } from 'react'

const MainLogo = () => {
    const [logoTextLarge, setLogoTextLarge] = useState('')
    const [logoTextSmall, setLogoTextSmall] = useState('')
    const logoPhoto = [{
        imgUrl: './assets/img/logo1.JPG'
    }, {
        imgUrl: './assets/img/logo2.JPG'
    }, {
        imgUrl: './assets/img/logo3.JPG'
    }, {
        imgUrl: './assets/img/logo4.JPG'
    }]
    useEffect(() => {
        const getLogoText = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setLogoTextLarge(docSnap.data().banner_large)
                setLogoTextSmall(docSnap.data().banner_small)
              } else {
                console.log("No such document!");
            }
        }
        getLogoText()
    }, [])

    

    return (
        <section className='main-logo  shadow' id='home'>
            <Carousel controls={false} indicators={false} fade>
            {logoPhoto.map((photo, index)=> {return (
                <Carousel.Item key={index}>
                    <Row className="d-flex flex-column justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src={photo.imgUrl} />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <Row>
                            <Col className='text-start'>
                                <h2>{logoTextLarge}</h2>
                                <p>{logoTextSmall}</p>
                                <a href="#contact">Sign Up for a Photo Session</a>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
            )})}
            </Carousel>
        </section>
    )
}

export { MainLogo }