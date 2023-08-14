import { Container, Nav, Tab } from "react-bootstrap"
import { AdminGeneral } from "./components/AdminGeneral"

// eslint-disable-next-line react/prop-types
const AdminBoard = ({refreshPage}) => {
    return (
        <Container className="admin-board py-5 align-items-center justify-content-center">
            <h2 className="mt-5 text-center">Admin Board</h2>
            <Tab.Container defaultActiveKey="general">
                <Nav className=" my-3 d-flex align-items-center justify-content-center" variant="underline">
                    <Nav.Item>
                        <Nav.Link eventKey="general">General</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="gallery">Gallery</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="feedbacks">Feedbacks</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="general">
                        <AdminGeneral refreshPage={refreshPage}/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    )
}

export { AdminBoard }