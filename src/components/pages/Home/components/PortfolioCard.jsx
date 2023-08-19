import { Card } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const PortfolioCard = ({imgUrl}) => {
    return (
        <Card className='rounded-0'>
            <Card.Img className="rounded-0" variant="top" src={imgUrl} />
        </Card>
    )
}

export { PortfolioCard }