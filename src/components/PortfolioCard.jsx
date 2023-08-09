import { Card } from "react-bootstrap"

const PortfolioCard = ({imgUrl}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imgUrl} />
        </Card>
    )
}

export { PortfolioCard }