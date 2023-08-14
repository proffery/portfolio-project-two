import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { doc, getDoc, getFirestore, setDoc} from "firebase/firestore"

const AdminGeneral = () => {
    const [generalData, setGeneralData] = useState({
        banner_large: '',
        banner_small: '',
        name: ''
    })
    const [validated, setValidated] = useState(false)
    const [buttonText, setButtonText] = useState('Save')
    
    useEffect(() => {
        const getGeneralData = async() => {
            const docRef = doc(getFirestore(), 'admin', 'general')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setGeneralData(docSnap.data())
              } else {
                console.log("No such document!");
            }
        }
        getGeneralData()
    }, [])
    
    const onFormUpdate = (category, value) => {
        setGeneralData({
            ...generalData,
            [category]: value
        }) 
    }

    const onFormSubmit = async(e) => {
        e.preventDefault()
        setButtonText("Saving...")
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            await setDoc(doc(getFirestore(), 'admin', 'general'), generalData)
            .then(setButtonText("Save"))
        }
        setValidated(true)
        
    }

    return (
        <Form noValidate validated={validated} onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control value={generalData.name} onChange={(e) => onFormUpdate('name', e.target.value)} type="text" placeholder="Enter name" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Logo text (large)</Form.Label>
                <Form.Control value={generalData.banner_large} onChange={(e) => onFormUpdate('banner_large', e.target.value)} as="textarea" rows={2} required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Logo text (small)</Form.Label>
                <Form.Control value={generalData.banner_small} onChange={(e) => onFormUpdate('banner_small', e.target.value)} as="textarea" rows={2} required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export { AdminGeneral }