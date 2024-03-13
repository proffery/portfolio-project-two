import { Form, Button, Container, Row } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { doc, getDoc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore"
import { User } from '../../Context/User'
import { useNavigate } from "react-router-dom"

const LeaveFeedback = () => {
    const user = useContext(User)
    const navigate = useNavigate()
    const [feedbackData, setFeedbackData] = useState({
        feedback: '',
        isPublished: false,
        timestamp: serverTimestamp(),
        author: user.auth.currentUser.displayName
    })
    const [validated, setValidated] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [maxLength, setMaxLength] = useState(250)
    const [buttonText, setButtonText] = useState('Save')
    
    useEffect(() => {
        const getFeedbackData = async() => {
            const docRef = doc(getFirestore(), 'feedback', `${user.uid}`)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                onFormUpdate('feedback', docSnap.data().feedback)
              } else {
                console.log("No such document!");
            }
        }
        getFeedbackData()
    }, [])

    useEffect(() => {
        const restLength = maxLength - feedbackData.feedback.length
        setButtonText(`Save (${restLength})`)
    }, [feedbackData.feedback, maxLength])

    const onFormUpdate = (category, value) => {
        setFeedbackData({
            ...feedbackData,
            [category]: value
        })
        setValidated(false)
    }

    const onFormSubmit = async(e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true)
        }
        else {
            await setDoc(doc(getFirestore(), 'feedback', `${user.uid}`), feedbackData)
            .then(setValidated(true))
            .then(setButtonText('Saved'))
        }
    }
    return (
        <Container className='leave-feedback py-5 align-items-center justify-content-center'>
            <Row className='d-inline-flex'>
                <Button onClick={() => navigate('/#')} variant='secondary'>Back</Button>
            </Row>
            <Row>
                <h2 className="my-4 text-center">Leave Feedback</h2>
                <Form noValidate validated={validated} onSubmit={onFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Kindly provide your thoughts on the work I’ve done.</Form.Label>
                        <Form.Control value={feedbackData.feedback} onChange={(e) => onFormUpdate('feedback', e.target.value)} as="textarea" rows={3} maxLength={maxLength} placeholder="Leave your feedback here" required/>
                        <Form.Control.Feedback>Feedback sent for moderation</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
                    </Form.Group>
                    <div className='text-center'>
                        <Button variant="secondary" type="submit">{buttonText}</Button>
                    </div>
                </Form>
            </Row>

        </Container>
    )
}

export { LeaveFeedback }