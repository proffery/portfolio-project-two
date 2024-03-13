import { Container } from 'react-bootstrap'
import { ParallaxProvider } from 'react-scroll-parallax'
import ScrollSpy from "react-ui-scrollspy"
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Feedbacks } from './components/Feedbacks'
import { MainLogo } from './components/MainLogo'
import { Portfolio } from './components/Portfolio'
import { Pricing } from './components/Pricing'

const Home = () => {

    return (
        <Container>
            <ParallaxProvider>
                <ScrollSpy scrollThrottle={300} useBoxMethod={true}>
                    <MainLogo />
                    <Portfolio />
                    <About />
                    <Pricing />
                    <Feedbacks />
                </ScrollSpy>
                    <Contact />
            </ParallaxProvider>
        </Container>
    )
}

export { Home }
