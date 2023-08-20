import { useState } from 'react'
/* eslint-disable react/prop-types */
import { Card, Col, Row } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const FeedbackCard = ({author, timestamp, feedback}) => {
    const [expandedText, setExpandedText] = useState('more')
    return (
        <Card className='feedback-card pt-1 rounded-0' style={{minWidth: '11rem'}} bg='light' text='dark'>
            <Card.Body>
                <h6>{author}</h6>
                <hr />
                <Card.Text className={expandedText === 'less' && 'expanded'}>{feedback}
                <Card.Subtitle className="mt-1 text-muted">{new Date(timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})} </Card.Subtitle>
                </Card.Text>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                    <Col>
                        <Card.Link onClick={() => {expandedText === 'more' ? setExpandedText('less') : setExpandedText('more')}}>{expandedText}</Card.Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export { FeedbackCard }