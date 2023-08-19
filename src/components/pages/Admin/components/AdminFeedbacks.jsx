import { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore"

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
                    id: doc.id
                })
            })
            setFeedbacks(feedbacksData)
        }
        fetchData()
    },[])

    const publishFeedbackHandler = async (id, value) => {
        const feedbackRef = doc(getFirestore(), 'feedback', `${id}`)
        await updateDoc(feedbackRef, {
            isPublished: value
        })

        const currentFeedbackIndex = feedbacks.findIndex((feedback) => feedback.id === id)
        const updatedFeedback = {...feedbacks[currentFeedbackIndex], isPublished: value}
        const newFeedbacks = [...feedbacks]
        newFeedbacks[currentFeedbackIndex] = updatedFeedback
        setFeedbacks(newFeedbacks)
        console.log(newFeedbacks)
    }

    const deleteFeedbackHandler = () => {

    }

    return (<>
        {feedbacks.map((feedback, index) => {
            return (
                <Form key={index + feedback.id}>
                    <Form.Label>{feedback.author} ({feedback.id}):</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control value={feedback.feedback} as="textarea" rows={2} readOnly/>
                        <DropdownButton
                            variant={feedback.isPublished ? 'outline-secondary' : 'secondary'}
                            title={feedback.isPublished ? 'Published' : 'Pending...'}
                            id="input-group-dropdown-2"
                            align="end"
                        >
                            {feedback.isPublished ? 
                                <Dropdown.Item href='#' onClick={() => {publishFeedbackHandler(feedback.id, false)}}>Don’t publish</Dropdown.Item> : 
                                <Dropdown.Item href='#' onClick={() => {publishFeedbackHandler(feedback.id, true)}}>Publish</Dropdown.Item>
                            }
                            <Dropdown.Item href='#' onClick={() => {deleteFeedbackHandler(feedback.id, false)}}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </Form>
            )
        })}
    </>
    )
}

export { AdminFeedbacks }