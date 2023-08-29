import { useState, useEffect } from "react"
import { Container, Row, Col, Alert } from "react-bootstrap"
import { collection, getDocs, getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

const Contact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedPackage, setSelectedPackage] = useState('')
    const [services, setServices] = useState([])
    const [isAlertShow, setIsAlertShow] = useState(false)
    const [alert, setAlert] = useState('')
    const [logoPhoto, setLogoPhoto] = useState('')
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

    useEffect(() => {
        const fetchLogoPhoto = async () => {
            const docRef = doc(getFirestore(), "contact_logo", "contact")
            const docSnap = await getDoc(docRef)
    
            if (docSnap.exists()) {
                setLogoPhoto(docSnap.data().imgUrl)
                console.log(logoPhoto)
            } else {
                console.log("No such document!")
            }
        }
        fetchLogoPhoto()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const docRef = doc(getFirestore(), 'orders', `${phone}`)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setIsAlertShow(true)
            showAlert('danger', 'Please be patient. We will contact you shortly.', 'Order already exists!')
        }
        else {
            await setDoc(doc(getFirestore(), 'orders', `${phone}`), {
                name: name,
                email: email,
                phone: phone,
                package: selectedPackage,
                inWork: true,
                timestamp: serverTimestamp()
            }).then(() => {
                showAlert('success', 'Order is processed. We will contact you shortly.', 'Success!')
                setIsAlertShow(true)
            }
            )
        }
      }

      const showAlert = (type, msg, header) => {
        setAlert(
            <Alert 
                className='alert d-flex flex-column position-fixed top-50 start-50 translate-middle' 
                variant={type} 
                onClose={() => setIsAlertShow(false)} 
                dismissible
            >
                <Alert.Heading>{header}</Alert.Heading>
                <p>{msg}</p>
            </Alert>)
      }
      
      return (
        <>
            {isAlertShow && alert}
            <section
                style={ generalData.bnw_mode ? {
                    backgroundImage: `url("${logoPhoto}")`,
                    filter: 'grayscale(100%)'
                } : {
                    backgroundImage: `url("${logoPhoto}")`,
                    filter: 'none'
                }
            
                } 
                className="contact shadow" 
                id="/#contact"
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
                                        placeholder="Name*"
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Addres*"
                                        required
                                    />
                                </Col>
                                <Col sm={6} className="d-flex flex-grow-1 px-1 pb-2">
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone*"
                                        pattern="(375)\d{9}"
                                        title="375123456789"
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
        </>
    )
}

export { Contact }