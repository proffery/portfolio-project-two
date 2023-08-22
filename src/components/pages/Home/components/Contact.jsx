import { useState, useContext, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { User } from '../../../../Context/User'
import { collection, getDocs, getFirestore, doc, getDoc } from "firebase/firestore"

const Contact = () => {
    const user = useContext(User)
    const [name, setName] = useState(user === null ? '' : user.auth.currentUser.displayName)
    const [email, setEmail] = useState(user === null ? '' : user.auth.currentUser.email)
    const [selectedPackage, setSelectedPackage] = useState('')
    const [services, setServices] = useState([])
    const [generalData, setGeneralData] = useState({
        instagram: '',
        telegram: '',
        whatsapp: '',
        bnw_mode: true
    })
    
    useEffect(() => {
        const fetchData = async() => {
            const pricingData = []
            const querySnapshot = await getDocs(collection(getFirestore(), 'pricing'));
            querySnapshot.forEach((doc) => {
                pricingData.push(
                    {
                        service_name: doc.data().service_name,
                    }
                )
            })
            setServices(pricingData)
        }
        fetchData()
    },[])
    useEffect(() => {
        const fetchGeneralData = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setGeneralData({
                    instagram: docSnap.data().instagram,
                    telegram: docSnap.data().telegram,
                    whatsapp: docSnap.data().whatsapp,
                    bnw_mode: docSnap.data().bnw_mode
                })
              } else {
                console.log("No such document!");
            }
        }
        fetchGeneralData()
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault()
        setName('')
        setEmail('')
        setSelectedPackage('')
      }

    return (
        <section
            style={ generalData.bnw_mode ? {
                backgroundImage: `url("./assets/img/contact.JPG")`,
                filter: 'grayscale(100%)',
            } : {
                backgroundImage: `url("./assets/img/contact.JPG")`,
                filter: 'none',
            }
        
            } 
            className="contact shadow" 
            id="contact"
            >
            <Container className="py-4">
                <h2>Sign up for a photo session</h2>
                <Row>
                    <Col>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <form className="d-flex flex-column flex-grow-1 p-4 align-items-center" onSubmit={handleSubmit}>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                />
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Addres"
                                    required
                                />
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                <select
                                    id="package"
                                    value={selectedPackage}
                                    onChange={(e) => setSelectedPackage(e.target.value)}
                                    required
                                >
                                    <option value="">Select Package</option>
                                    {services.map((service, index) => 
                                    <option value={service.service_name} key={`service${index}`}>{service.service_name}</option>
                                    )}
                                </select>
                            </Col>
                            <Col sm={6} className="d-flex flex-grow-1 px-1">
                                <button type="submit"><span>Submit</span></button>
                            </Col>
                        </form>
                    </Col>
                </Row>
                <Row className='social-icon d-flex justify-content-center'>
                    <a target="_blank" rel="noopener noreferrer" href={generalData.instagram}>
                        <img src='./assets/img/icon-instagram.svg' alt="Instagram" title={generalData.instagram}/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={generalData.telegram}>
                        <img src='./assets/img/icon-telegram.svg' alt="Telegram" title={generalData.telegram}/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href={generalData.whatsapp}>
                        <img src='./assets/img/icon-whatsapp.svg' alt="Whatsapp" title={generalData.whatsapp}/>
                    </a>
                </Row>
            </Container>
        </section>
    )
}

export { Contact }