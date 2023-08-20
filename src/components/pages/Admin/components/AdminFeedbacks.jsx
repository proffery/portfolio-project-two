import { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Form, InputGroup, Alert, Button } from 'react-bootstrap'
import { collection, doc, getDocs, getFirestore, updateDoc, deleteDoc } from "firebase/firestore"

const AdminFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const feedbacksData = []
            const querySnapshot = await getDocs(collection(getFirestore(), "feedback"))
            querySnapshot.forEach((doc) => {
                feedbacksData.push({
                    author: doc.data().author,
                    isPublished: doc.data().isPublished,
                    feedback: doc.data().feedback,
                    timestamp: doc.data().timestamp,
                    id: doc.id,
                    deleteAlertShow: false
                })
            })
            setFeedbacks(feedbacksData)
        }
        fetchData()
    },[])

    const publishFeedbackHandler = async (id, value) => {
        //Update database
        const feedbackRef = doc(getFirestore(), 'feedback', `${id}`)
        await updateDoc(feedbackRef, {
            isPublished: value
        })
        //Update local
        const currentFeedbackIndex = feedbacks.findIndex((feedback) => feedback.id === id)
        const updatedFeedback = {...feedbacks[currentFeedbackIndex], isPublished: value}
        const newFeedbacks = [...feedbacks]
        newFeedbacks[currentFeedbackIndex] = updatedFeedback
        setFeedbacks(newFeedbacks)
    }

    const deleteFeedbackHandler = async (id) => {
        //Remove from database
        await deleteDoc(doc(getFirestore(), 'feedback', `${id}`))
        //Remove local
        const newFeedbacks = feedbacks.filter((feedback) => feedback.id !== id)
        setFeedbacks(newFeedbacks)
    }

    const setDeleteAlertShow = (id, value) => {
        const currentFeedbackIndex = feedbacks.findIndex((feedback) => feedback.id === id)
        const updatedFeedback = {...feedbacks[currentFeedbackIndex], deleteAlertShow: value}
        const newFeedbacks = [...feedbacks]
        newFeedbacks[currentFeedbackIndex] = updatedFeedback
        setFeedbacks(newFeedbacks)
    }

    return (<>
        {feedbacks.map((feedback, index) => {
            return (
                <Form className='mb-4' key={index + feedback.id}>
                    <Form.Label>{feedback.author} ({feedback.id}):</Form.Label>
                    <InputGroup className='mb-3'>
                        <Form.Control value={feedback.feedback} as='textarea' rows={2} readOnly/>
                        <DropdownButton
                            variant={feedback.isPublished ? 'outline-secondary' : 'secondary'}
                            title={feedback.isPublished ? 'Published' : 'Pending...'}
                            id='input-group-dropdown-2'
                            align='end'
                        >
                            {feedback.isPublished ? 
                                <Dropdown.Item href='#' onClick={() => {publishFeedbackHandler(feedback.id, false)}}>Don’t publish</Dropdown.Item> : 
                                <Dropdown.Item href='#' onClick={() => {publishFeedbackHandler(feedback.id, true)}}>Publish</Dropdown.Item>
                            }
                            <Dropdown.Item href='#' onClick={() => {
                                setDeleteAlertShow(feedback.id, true)
                            }}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                    {feedback.deleteAlertShow && (
                        <Alert className='d-flex flex-column' variant="danger" show={feedback.deleteAlertShow} onClose={() => setDeleteAlertShow(feedback.id, false)} dismissible>
                            <Alert.Heading>Do you really want to delete this review?</Alert.Heading>
                            <p>
                                {feedback.feedback}
                            </p>
                            <Button className='align-self-center' type='button' variant='danger' onClick={() => deleteFeedbackHandler(feedback.id)}>Delete</Button>
                      </Alert>
                    )}
                </Form>
            )
        })}
    </>
    )
}

export { AdminFeedbacks }