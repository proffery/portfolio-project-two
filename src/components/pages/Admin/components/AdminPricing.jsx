import { useEffect, useState } from 'react'
import { Form, InputGroup, Button, Row } from 'react-bootstrap'
import { collection, deleteDoc, deleteField, doc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore"
import uniqid from 'uniqid'

const AdminPricing = () => {
    const [services, setServices] = useState([])
    const [validated, setValidated] = useState(false)
    const [buttonText, setButtonText] = useState('Save services')
    // eslint-disable-next-line no-unused-vars
    const [maxLengthes, setMaxLengthes] = useState({
        name: 15,
        description: 200,
        options: 100
    })

    const onNameUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_name = value
        setServices(newServices)
        setValidated(false)
        setButtonText("Save services")
    }

    const onDescriptionUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_description = value
        setServices(newServices)
        setValidated(false)
        setButtonText("Save services")
    }

    const onPriceUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_price = value
        setServices(newServices)
        setValidated(false)
        setButtonText("Save services")
    }

    const onOptionsUpdate = (e, value, service_index, option_index) => {
        e.stopPropagation()

        let newServices = [...services]
        newServices[service_index].service_options[option_index] = value
        setServices(newServices)
        setValidated(false)
        setButtonText("Save services")
    }

    const addServiceHandler = async () => {
        //Add service to local
        const id = uniqid()
        const newServices = [...services]
        const newService = {
            service_name: '',
            service_description: '',
            service_price: 0,
            service_options: [],
            service_id: id
        }
        newServices.push(newService)
        setServices(newServices)

        //Add service to DB
        await setDoc(doc(getFirestore(), 'pricing', `${id}`), newService)

        setValidated(false)
        setButtonText("Save services")
    }

    const deleteServiceHandler = async(service_index) => {
        //Delete service from local
        const newServices = services.filter((s, index) => service_index !== index)
        setServices(newServices)

        //Delete service from DB
        await deleteDoc(doc(getFirestore(), 'pricing', `${services[service_index].service_id}`))
        .then(console.log('Service deleted!'))

        setValidated(false)
        setButtonText("Save services")
    }

    const addOptionHandler = (service_index) => {
        const newServices = [...services]
        newServices[service_index].service_options.push('')
        setServices(newServices)
        services.forEach(async(service) => await setDoc(doc(getFirestore(), 'pricing', `${service.service_id}`), service))

        setValidated(false)
        setButtonText("Save services")
    }

    const deleteOptionHandler = async(service_index, option_index) => {
        //Delete option from local
        const newServices = [...services]
        const newOptions = services[service_index].service_options.filter((option, index) => index !== option_index)
        newServices[service_index].service_options = newOptions
        setServices(newServices)

        //Delete all options from DB
        await updateDoc(doc(getFirestore(), 'pricing', `${services[service_index].service_id}`), {
            service_options: deleteField()
        })

        //Add new options to DB
        await updateDoc(doc(getFirestore(), 'pricing', `${services[service_index].service_id}`), {
            service_options: newOptions
        })

        setValidated(false)
        setButtonText("Save services")
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
        }
        else {
            services.forEach(async(service) => await updateDoc(doc(getFirestore(), 'pricing', `${service.service_id}`), service))
            setButtonText('Saved')
            setValidated(true)
        }
    }

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
                        service_id: doc.id
                    }
                )
            })
            setServices(pricingData)
        }
        fetchData()
    },[])

    return (
        <>  
            <div className='text-center'>
                <Button variant='secondary' type='button' onClick={addServiceHandler}>+ Add new service</Button>
            </div>
            {services.length > 0 &&
                <hr/>
            }
        
            <Form noValidate validated={validated} className='my-3' onSubmit={formSubmitHandler}>
                {services.map((service, service_index) => 
                    <Row key={'service' + service_index}>
                        <Form.Label>Service {service_index + 1}:</Form.Label>
                        <Form.Group>
                            <InputGroup hasValidation className="mb-3">
                                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter service name"
                                    aria-label="Service name"
                                    aria-describedby="basic-addon1"
                                    defaultValue={service.service_name}
                                    type='text'
                                    maxLength={maxLengthes.name}
                                    required
                                    onChange={(e) => onNameUpdate(e.target.value, service_index)}
                                />
                                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
                            </InputGroup>

                            <InputGroup hasValidation className="mb-3">
                                <InputGroup.Text>Descr.</InputGroup.Text>
                                <Form.Control 
                                    as="textarea" 
                                    aria-label="Service description"
                                    placeholder="Enter service description"
                                    defaultValue={service.service_description}
                                    rows={2}
                                    type='text'
                                    maxLength={maxLengthes.description}
                                    required
                                    onChange={(e) => onDescriptionUpdate(e.target.value, service_index)}
                                />
                                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
                            </InputGroup>

                            <InputGroup hasValidation className="mb-">
                                <InputGroup.Text>Price</InputGroup.Text>
                                <Form.Control 
                                    aria-label="Amount (to the nearest dollar)" 
                                    placeholder="Enter service price"
                                    defaultValue={service.service_price}
                                    type='number'
                                    min={0}
                                    required
                                    onChange={(e) => onPriceUpdate(e.target.value, service_index)}
                                />
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control.Feedback type="invalid">Please enter a number.</Form.Control.Feedback>
                            </InputGroup>
                            <Button variant='secondary' onClick={() => addOptionHandler(service_index)} className='my-2' type='button'>+ Add new option</Button>
                            {services[service_index].service_options.map((option, option_index) => 
                                <Row key={uniqid()}>
                                    <InputGroup hasValidation className="mb-3">
                                        <InputGroup.Text id="basic-addon1">{option_index + 1}</InputGroup.Text>
                                        <Form.Control
                                            placeholder={"Enter service option " + (option_index + 1)} 
                                            aria-label="Option"
                                            defaultValue={option}
                                            aria-describedby="basic-addon1"
                                            type='text'
                                            maxLength={maxLengthes.options}
                                            required
                                            onChange={(e) => onOptionsUpdate(e, e.target.value, service_index, option_index)}
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
                                        <Button variant="outline-secondary" id="button-addon2" onClick={() => deleteOptionHandler(service_index, option_index)}>
                                            Delete
                                        </Button>
                                    </InputGroup>
                                </Row>
                            )}
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant='secondary' className="mb-3" type='button' onClick={() => deleteServiceHandler(service_index)}>Delete service</Button>
                        </div>
                        <hr/>
                    </Row>
                )}
                {services.length > 0 &&
                    <div className='text-center'>
                        <Button variant='secondary' type='submit'>{buttonText}</Button>
                    </div>
                }
            </Form>
        
        </>
    )
}

export { AdminPricing }