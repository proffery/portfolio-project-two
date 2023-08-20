import { Form, InputGroup, Button, Container, Row } from 'react-bootstrap'
import { useState } from 'react'

const AdminPricing = () => {
    const [services, setServices] = useState([])

    const addServiceHandler = () => {
        const newService = [...services]
        newService.push({
            servise_name: '',
            service_description: '',
            service_price: 0,
            service_options: []
        })
        setServices(newService)
        console.log(services)
    }

    const deleteServiceHandler = (index) => {

    }

    const addOptionHandler = (index) => {

    }

    const deleteOptionHandler = (index) => {

    }

    return (
        <>
            <Button variant='secondary' type='button' onClick={addServiceHandler}>+ Add new sevice</Button>
            {services.map((service, index) => 
                <Row key={'servise' + index}>
                    <Form className='my-3'>
                        <Form.Label>Service {index + 1}:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                            <Form.Control
                                placeholder="Service name"
                                aria-label="Service name"
                                aria-describedby="basic-addon1"
                                value={service.servise_name}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control 
                                as="textarea" 
                                aria-label="Service description"
                                placeholder="Service description"
                                value={service.service_description}
                                rows={1}
                            />
                        </InputGroup>

                        <InputGroup className="mb-1">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control 
                                aria-label="Amount (to the nearest dollar)" 
                                placeholder="Service price"
                                value={service.service_price}
                                type='number'
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        
                        <Container>
                            <Form.Label className="mt-3">Options</Form.Label>
                            <Button variant='secondary' onClick={addOptionHandler(index)} className='mb-2 mx-2' type='button'>+ Add new option</Button>
                            {service.service_options.map((option, index) => 
                                <Form key={'option' + index}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Option {index + 1}</InputGroup.Text>
                                        <Form.Control
                                            placeholder={"Option " + (index + 1)} 
                                            aria-label="Option"
                                            value={option}
                                            aria-describedby="basic-addon1"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={deleteOptionHandler(index)}>
                                            Delete
                                        </Button>
                                    </InputGroup>
                                </Form>
                            )}
                        </Container>
                        <Button variant='secondary' type='submit'>Save sevice</Button>
                        <Button variant='secondary' className='mx-2' type='button' onClick={deleteServiceHandler(index)}>Delete sevice</Button>
                    </Form>
                    <hr/>
                </Row>
            )}
        </>
    )
}

export { AdminPricing }