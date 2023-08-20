import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { doc, getDoc, getFirestore, setDoc} from "firebase/firestore"

// eslint-disable-next-line react/prop-types
const AdminGeneral = ({refreshPage, setAdditionalHeader}) => {
    // eslint-disable-next-line no-unused-vars
    const [maxLengthes, setMaxLengthes] = useState({
        banner_large: 50,
        banner_small: 150,
        name: 20,
        about: 2000
    })
    const [generalData, setGeneralData] = useState({
        banner_large: '',
        banner_small: '',
        name: '',
        about: ''
    })

    const [lables, setLables] = useState({
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
    
    useEffect(() => {
        setLables({
            banner_large: `Logo text large (${maxLengthes.banner_large - generalData.banner_large.length})`,
            banner_small: `Logo text small (${maxLengthes.banner_small - generalData.banner_small.length})`,
            name: `Name (${maxLengthes.name - generalData.name.length})`,
            about: `About (${maxLengthes.about - generalData.about.length})`
        })
    }, [generalData, maxLengthes])

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
                <span>Admin Board </span>
                <Button onClick={() => {refreshPage()}} variant="secondary" type="button">Refresh page</Button>
            </>}))

        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>{lables.name}</Form.Label>
                <Form.Control value={generalData.name} onChange={(e) => onFormUpdate('name', e.target.value)} type="text" maxLength={maxLengthes.name} placeholder="Enter name" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{lables.banner_large}</Form.Label>
                <Form.Control value={generalData.banner_large} onChange={(e) => onFormUpdate('banner_large', e.target.value)} as="textarea" maxLength={maxLengthes.banner_large} rows={1} placeholder="Enter text for the main banner" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{lables.banner_small}</Form.Label>
                <Form.Control value={generalData.banner_small} onChange={(e) => onFormUpdate('banner_small', e.target.value)} as="textarea" maxLength={maxLengthes.banner_small} rows={2} placeholder="Enter text for the main banner" required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>{lables.about}</Form.Label>
                <Form.Control value={generalData.about} onChange={(e) => onFormUpdate('about', e.target.value)} as="textarea" maxLength={maxLengthes.about} placeholder="Enter text for the about section" rows={6} required/>
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please enter a text.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export { AdminGeneral }