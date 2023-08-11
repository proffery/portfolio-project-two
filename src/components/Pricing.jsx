import { Container, Table } from "react-bootstrap"

const Pricing = () => {
    return (
        <section className="pricing" id="pricing">
            <Container>
                <h2 className='my-5'>Pricing</h2>
                <Table className='mb-5' bordered hover>
                    <tbody>
                        <tr>
                            <th>Individual</th>
                            <td>Perfect for capturing your individual essence. Whether it’s a portrait, headshot, or personal branding, this package is designed to highlight your uniqueness.</td>
                            <td>
                                <ul>
                                    <li>1-hour session</li>
                                    <li>15 edited photos</li>
                                    <li>Assistance with choosing a location</li>
                                </ul>
                            </td>
                            <th>150$</th>
                        </tr>
                        <tr>
                            <th>Love Story</th>
                            <td>Celebrate your love story with a dedicated photoshoot. From engagement sessions to anniversary moments, this package captures your connection and emotions.</td>
                            <td>
                                <ul>
                                    <li>2-hour session</li>
                                    <li>30 edited photos</li>
                                    <li>Assistance with choosing a location</li>
                                </ul>
                            </td>
                            <th>250$</th>
                        </tr>
                        <tr>
                            <th>Street</th>
                            <td>Dive into the dynamic energy of the streets with this package. Ideal for urban explorers and those who want candid street-style photography.</td>
                            <td>
                                <ul>
                                    <li>1.5-hour session</li>
                                    <li>20 edited photos</li>
                                    <li>Assistance with choosing a location</li>
                                </ul>
                            </td>
                            <th>180$</th>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </section>
    )
}

export { Pricing }