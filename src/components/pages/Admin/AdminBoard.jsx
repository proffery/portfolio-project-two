import { Container, Nav, Tab, Row} from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { AdminGeneral } from "./components/AdminGeneral"
import { useState } from "react"
import { AdminFeedbacks } from "./components/AdminFeedbacks"
import { AdminPricing } from "./components/AdminPricing"
import { AdminOrders } from "./components/AdminOrders"
import { AdminPortfolio } from "./components/AdminPortfolio"

// eslint-disable-next-line react/prop-types
const AdminBoard = ({refreshPage}) => {
    const [additionalHeader, setAdditionalHeader] = useState('Admin Board')

    return (
        <Container className="admin-board align-items-center justify-content-center">
            <h2 className="mt-3 text-center">{additionalHeader}</h2>
            <Tab.Container defaultActiveKey="orders">
                <Nav className=" my-3 d-flex align-items-center justify-content-center" variant="underline">
                    <Nav.Item>
                        <Nav.Link eventKey="orders">Orders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="feedbacks">Feedbacks</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="portfolio">Portfolio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="pricing">Pricing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="general">Settings</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="orders">
                        <AdminOrders />  
                    </Tab.Pane>
                    <Tab.Pane eventKey="feedbacks">
                        <AdminFeedbacks />
                    </Tab.Pane>
                    <Tab.Pane eventKey="portfolio">
                        <AdminPortfolio />
                    </Tab.Pane>
                    <Tab.Pane eventKey="pricing">
                        <AdminPricing />
                    </Tab.Pane>
                    <Tab.Pane eventKey="general">
                        <AdminGeneral refreshPage={refreshPage} setAdditionalHeader={setAdditionalHeader} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <Row className='d-flex mt-5'>
            <Nav.Item className="align-self-center">
                <NavLink variant='secondary' to={'/#'}>Back</NavLink>
            </Nav.Item>
            </Row>
        </Container>
    )
}

export { AdminBoard }