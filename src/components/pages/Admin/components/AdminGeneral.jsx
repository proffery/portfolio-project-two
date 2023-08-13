import { Form, Button } from 'react-bootstrap'

const AdminGeneral = () => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Banner text (large)</Form.Label>
                <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Banner text (small)</Form.Label>
                <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="secondary" type="submit">Submit</Button>
        </Form>
    )
}

export { AdminGeneral }