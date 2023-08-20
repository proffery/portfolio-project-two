import { Form, InputGroup, Button, Row } from 'react-bootstrap'
import { useState } from 'react'

const AdminPricing = () => {
    const [services, setServices] = useState([])

    const onNameUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_name = value
        setServices(newServices)
    }

    const onDescriptionUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_description = value
        setServices(newServices)
    }

    const onPriceUpdate = (value, service_index) => {
        let newServices = [...services]
        newServices[service_index].service_price = value
        setServices(newServices)
    }

    const onOptionsUpdate = (value, service_index, option_index) => {
        let newServices = [...services]
        newServices[service_index].service_options[option_index] = value
        setServices(newServices)
    }

    const addServiceHandler = () => {
        const newServices = [...services]
        newServices.push({
            service_name: '',
            service_description: '',
            service_price: 0,
            service_options: []
        })
        setServices(newServices)
    }

    const deleteServiceHandler = (service_index) => {
        const newServices = services.filter((s, index) => service_index !== index)
        setServices(newServices)
    }

    const addOptionHandler = (service_index) => {
        const newServices = [...services]
        newServices[service_index].service_options.push('')
        setServices(newServices)
    }

    const deleteOptionHandler = (service_index, option_index) => {
        const newServices = [...services]
        const newOptions = newServices[service_index].service_options.filter((o, index) => option_index !== index)
        newServices[service_index].service_options = newOptions
        setServices(newServices)
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        console.log('Form submited!')
    }

    return (
        <>  
            <div className='text-center'>
                <Button variant='secondary' type='button' onClick={addServiceHandler}>+ Add new service</Button>
            </div>
            {services.length > 0 &&
                <hr/>
            }
        
            <Form className='my-3'>
                {services.map((service, service_index) => 
                    <Row key={'service' + service_index}>
                        <Form.Label>Service {service_index + 1}:</Form.Label>
                        <Form.Group>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter service name"
                                    aria-label="Service name"
                                    aria-describedby="basic-addon1"
                                    defaultValue={service.service_name}
                                    type='text'
                                    onChange={(e) => onNameUpdate(e.target.value, service_index)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>Description</InputGroup.Text>
                                <Form.Control 
                                    as="textarea" 
                                    aria-label="Service description"
                                    placeholder="Enter service description"
                                    defaultValue={service.service_description}
                                    rows={1}
                                    type='text'
                                    onChange={(e) => onDescriptionUpdate(e.target.value, service_index)}
                                />
                            </InputGroup>

                            <InputGroup className="mb-">
                                <InputGroup.Text>Price</InputGroup.Text>
                                <Form.Control 
                                    aria-label="Amount (to the nearest dollar)" 
                                    placeholder="Enter service price"
                                    defaultValue={service.service_price}
                                    type='number'
                                    onChange={(e) => onPriceUpdate(e.target.value, service_index)}
                                />
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup>
                            <Button variant='secondary' onClick={() => addOptionHandler(service_index)} className='my-2' type='button'>+ Add new option</Button>
                            {services[service_index].service_options.map((option, option_index) => 
                                <Row key={'option' + option_index}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Option {option_index + 1}</InputGroup.Text>
                                        <Form.Control
                                            placeholder={"Enter service option " + (option_index + 1)} 
                                            aria-label="Option"
                                            defaultValue={option}
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => onOptionsUpdate(e.target.value, service_index, option_index)}
                                        />
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
                        <Button onClick={formSubmitHandler} variant='secondary' type='button'>Save services</Button>
                    </div>
                }
            </Form>
        
        </>
    )
}

export { AdminPricing }