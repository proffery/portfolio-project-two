import { useState, useEffect } from "react"
import { Button, Form, Card, Row } from "react-bootstrap"
import { storage } from "../../../../Firebase/config"
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import {
    getFirestore,
    setDoc,
    doc,
    getDocs,
    collection,
    deleteDoc
} from 'firebase/firestore'
import uniqid from 'uniqid'

const AdminPortfolio = () => {
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState('')
    const [porfolioPhotos, setPorfolioPhotos] = useState([])
    const [validated, setValidated] = useState(false)
    const [reloadComponentTrigger, setReloadComponentTrigger] = useState('')
    
    useEffect(() => {
        const fetchData = async() => {
            const photosData = []
            const querySnapshot = await getDocs(collection(getFirestore(), 'portfolio'));
            querySnapshot.forEach((doc) => {
                photosData.push(doc.data())
            })
            setPorfolioPhotos(photosData)
        }
        fetchData()
    },[reloadComponentTrigger])
    
    const formSubmitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true)
        }
        else {
            const id = uniqid()
            uploadImage(id)
            setValidated(true)
        }
    }
    
    const deleteImage = (id, name) => {
        const desertRef = ref(storage, `images/portfolio/${name}`)
        // Delete the file
        deleteObject(desertRef).then(async () => {
            await deleteDoc(doc(getFirestore(), 'portfolio', `${id}`))
            .then(setReloadComponentTrigger(uniqid()))
        }).catch((error) => {
            console.log(error)
        })
        
    }
    
    const uploadImage = async(id) => {
        if (file === null) {
            console.log('No file chosen!')
            return
        }

        const imageRef = ref(storage, `images/portfolio/${id + file.name}`)
        await uploadBytes(imageRef, file)
        getDownloadURL(imageRef)
        .then((url) => {
            const metadata = {
                name: id + file.name,
                category: category,
                id: id,
                imgUrl: url
            }
            saveDataToDB(id, metadata)            
        })
        .then(() => {
            setCategory('')
            setReloadComponentTrigger(uniqid())
        })
        
    }
    
    async function saveDataToDB(id, photo) {
        //Push photo Object to Cloud Firestore.
        try {
            await setDoc(doc(getFirestore(), 'portfolio', id), photo)
        }
        catch(error) {
            console.error('Error writing new post to Firebase Database', error)
        }

    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={formSubmitHandler}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Add new photo</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={category} 
                        placeholder="Enter image category" 
                        onChange={(e) => {
                            setCategory(e.target.value)
                            setValidated(false)
                        }} 
                        required/>
                </Form.Group>
                <Form.Group controlId="category"  className="mb-3">
                    <Form.Control 
                        type="file" 
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            setValidated(false)
                        }}
                        required />
                </Form.Group>
                <div className='text-center'>
                    <Button type="submit" variant="secondary">Add photo</Button>
                </div>
            </Form>
            <Row className="d-flex align-items-centerd-flex justify-content-around">
                {porfolioPhotos.map((photo) => 
                    <Card className="m-3" style={{ width: "18rem" }} key={photo.imgUrl}>
                        <Card.Img variant="top" src={photo.imgUrl} />
                        <Card.Body>
                            <Card.Title className="text-center">{photo.category}</Card.Title>
                            <div className='text-center'>
                                <Button variant="secondary" onClick={() => deleteImage(photo.id, photo.name)} >Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </Row>
        </>
    )
}

export { AdminPortfolio }