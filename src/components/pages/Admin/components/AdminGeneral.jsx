import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { doc, getDoc, getFirestore, setDoc} from "firebase/firestore"

// eslint-disable-next-line react/prop-types
const AdminGeneral = ({refreshPage, setAdditionalHeader}) => {
    const [generalData, setGeneralData] = useState({
        banner_large: '',
        banner_small: '',
        name: '',
        about: ''
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
        setButtonText("Save")
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
            await setDoc(doc(getFirestore(), 'admin', 'general'), generalData)
            .then(setValidated(true))
            .then(setButtonText('Saved'))
            .then(setAdditionalHeader(() => {return <>
                <span>Admin Board</span>
                <Button onClick={() => {refreshPage()}} variant="secondary" type="button">Refresh page</Button>
            </>}))

        }
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
                <Form.Control value={generalData.banner_large} onChange={(e) => onFormUpdate('banner_large', e.target.value)} as="textarea" rows={2} placeholder="Enter text for the main banner" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Logo text (small)</Form.Label>
                <Form.Control value={generalData.banner_small} onChange={(e) => onFormUpdate('banner_small', e.target.value)} as="textarea" rows={2} placeholder="Enter text for the main banner" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>About</Form.Label>
                <Form.Control value={generalData.about} onChange={(e) => onFormUpdate('about', e.target.value)} as="textarea" placeholder="Enter text for the about section" rows={4} required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export { AdminGeneral }