import { useEffect, useState } from 'react'
import { Container, Table } from "react-bootstrap"
import { collection, getDocs, getFirestore } from "firebase/firestore"
const Pricing = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const pricingData = []
            const querySnapshot = await getDocs(collection(getFirestore(), 'pricing'));
            querySnapshot.forEach((doc) => {
                pricingData.push(
                    {
                        service_name: doc.data().service_name,
                        service_description: doc.data().service_description,
                        service_price: doc.data().service_price,
                        service_options: doc.data().service_options,
                    }
                )
            })
            setServices(pricingData)
        }
        fetchData()
    },[])
    return (
        <section className="pricing" id="/#pricing">
            <Container>
                <h2 className='my-4'>Pricing</h2>
                <Table className='mb-5' bordered hover>
                    <tbody>
                        {services.map((service, index) =>
                            <tr key={`service${index}`}>
                                <th>{service.service_name}</th>
                                <td>{service.service_description}</td>
                                <td>
                                    <ul>
                                        {service.service_options.map((option, index) => 
                                        <li key={`option${index}`}>{option}</li>
                                        )}
                                    </ul>
                                </td>
                                <th>{service.service_price}$</th>
                            </tr>
                        ) }
                    </tbody>
                </Table>
            </Container>
        </section>
    )
}

export { Pricing }