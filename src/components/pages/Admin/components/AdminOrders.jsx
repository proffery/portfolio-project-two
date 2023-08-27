import { Table, DropdownButton, Dropdown } from "react-bootstrap"

const AdminOrders = () => {

    return (
        <Table striped bordered hover size="md" responsive>
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
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>proffery@gmail.com</td>
                    <td>Individual</td>
                    <td>3752569790785</td>
                    <td>16.06.2023</td>
                    <td className=" text-center p-1">
                        <DropdownButton
                            variant='secondary'
                            title='In work'
                            id='input-group-dropdown-2'
                            align='end'
                            size="sm"
                        >
                            <Dropdown.Item href='#' onClick={() => {}}>In work</Dropdown.Item>
                            <Dropdown.Item href='#' onClick={() => {}}>Done</Dropdown.Item>
                            <Dropdown.Item href='#' onClick={() => {}}>Delete</Dropdown.Item>
                        </DropdownButton>    
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export { AdminOrders }