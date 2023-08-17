/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const FeedbackCard = ({author, timestamp, feedback}) => {
    return (
        <Card style={{ width: '18rem' }} bg='light' text='dark'>
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{new Date(timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})}</Card.Subtitle>
                <Card.Text>{feedback}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export { FeedbackCard }