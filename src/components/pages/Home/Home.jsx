import { MainLogo } from './components/MainLogo'
import { Portfolio } from './components/Portfolio'
import { About } from './components/About'
import { Pricing } from './components/Pricing'
import { Contact } from './components/Contact'
import ScrollSpy from "react-ui-scrollspy"
import { ParallaxProvider } from 'react-scroll-parallax'
import { Feedbacks } from './components/Feedbacks'

const Home = () => {

    return (
        <>
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
        </>
    )
}

export { Home }