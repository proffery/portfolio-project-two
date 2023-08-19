import { useState } from 'react'
/* eslint-disable react/prop-types */
import { Card, Col, Row } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const FeedbackCard = ({author, timestamp, feedback}) => {
    const [expandedText, setExpandedText] = useState('more')
    return (
        <Card className='feedback-card fill rounded-4 pt-1' style={{minWidth: '11rem'}} bg='light' text='dark'>
            <Card.Body>
                <h6 className='mb-1'>{author}:</h6>
                <Card.Text className={expandedText === 'less' && 'expanded'}>{feedback}
                <Card.Subtitle className="mt-1 text-muted">{new Date(timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})} </Card.Subtitle>
                </Card.Text>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card.Link onClick={() => {expandedText === 'more' ? setExpandedText('less') : setExpandedText('more')}}>{expandedText}</Card.Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export { FeedbackCard }