import { useEffect } from "react"
import { Table, DropdownButton, Dropdown, Alert, Button, NavLink } from "react-bootstrap"
import { collection, getDocs, getFirestore, doc, updateDoc, deleteDoc} from "firebase/firestore"
import { useState } from "react"

const AdminOrders = () => {
    const [ordersData, setOrdersData] = useState([])
    const [orderSort, setOrderSort] = useState('all')
    useEffect(() => {
        const fetchData = async() => {
            const ordersData = []
            const querySnapshot = await getDocs(collection(getFirestore(), 'orders'));
            querySnapshot.forEach((doc) => {
                ordersData.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    package: doc.data().package,
                    timestamp: doc.data().timestamp,
                    inWork: doc.data().inWork,
                    deleteAlertShow: false
                })
            })

            if (orderSort === 'all') {
                setOrdersData(ordersData)
            } 
            else if (orderSort === 'in work') {
                const sortedOrders = ordersData.filter(order => order.inWork === true)
                setOrdersData(sortedOrders)
            } 
            else {
                const sortedOrders = ordersData.filter(order => order.inWork === false)
                setOrdersData(sortedOrders)
            }

        }
        fetchData()
    }, [orderSort])

    const changeInWorkStatus = async(id, status) => {
        //Update database
        const feedbackRef = doc(getFirestore(), 'orders', `${id}`)
        await updateDoc(feedbackRef, {
            inWork: status
        })

        //Update local
        const newOrders = ordersData.map((order) => {
            if (order.phone === id) {
                return {...order, inWork: status}
            }
            return order
        })
        setOrdersData(newOrders)
    }

    const deleteOrder = async(id) => {
        //Remove from database
        await deleteDoc(doc(getFirestore(), 'orders', `${id}`))

        //Remove local
        const newOrders = ordersData.filter((order) => order.phone !== id)
        setOrdersData(newOrders)
    }

    const setDeleteAlertShow = (id, value) => {
        const currentOrderIndex = ordersData.findIndex((order) => order.phone === id)
        const updatedOrders = {...ordersData[currentOrderIndex], deleteAlertShow: value}
        const newOrders = [...ordersData]
        newOrders[currentOrderIndex] = updatedOrders
        setOrdersData(newOrders)
    }

    return (
        <>
            <Dropdown data-bs-theme="dark" className="mb-2">
                <Dropdown.Toggle as={NavLink}><span className="text-capitalize">{orderSort}</span></Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setOrderSort('all')}>All</Dropdown.Item> 
                    <Dropdown.Item onClick={() => setOrderSort('in work')}>In work</Dropdown.Item>
                    <Dropdown.Item onClick={() => setOrderSort('doned')}>Doned</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Table className="mb-5" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name:</th>
                        <th>Email:</th>
                        <th>Package:</th>
                        <th>Phone:</th>
                        <th>Date:</th>
                        <th>Status:</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData.map((order, index) => 
                        <tr key={'order' + index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.package}</td>
                            <td>{order.phone}</td>
                            <td>{new Date(order.timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})}</td>
                            <td className=" text-center p-1">
                                <DropdownButton
                                    variant={order.inWork ? 'secondary' : 'outline-secondary'}
                                    title={order.inWork ? 'Work' : 'Done'}
                                    id='input-group-dropdown-2'
                                    align='end'
                                    size="sm"
                                >
                                    {order.inWork ? 
                                        <Dropdown.Item href='#' onClick={() => {changeInWorkStatus(order.phone, false)}}>Done</Dropdown.Item> :
                                        <Dropdown.Item href='#' onClick={() => {changeInWorkStatus(order.phone, true)}}>In work</Dropdown.Item>
                                    }   
                                    <Dropdown.Item href='#' onClick={() => {setDeleteAlertShow(order.phone, true)}}>Delete</Dropdown.Item>
                                </DropdownButton>    
                                {order.deleteAlertShow && (
                                    <Alert 
                                        className='alert d-flex flex-column position-fixed top-50 start-50 translate-middle' 
                                        variant="danger" 
                                        show={order.deleteAlertShow} 
                                        onClose={() => setDeleteAlertShow(order.phone, false)} 
                                        dismissible
                                    >
                                        <Alert.Heading>Do you really want to delete this order?</Alert.Heading>
                                        <p>{`${order.name} (${order.phone}) - ${order.package}`}</p>
                                        <Button 
                                            className='align-self-center' 
                                            type='button' 
                                            variant='danger' 
                                            onClick={() => deleteOrder(order.phone)}
                                        >Delete</Button>
                                    </Alert>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export { AdminOrders }