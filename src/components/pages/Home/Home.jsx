import { MainLogo } from './components/MainLogo'
import { Portfolio } from './components/Portfolio'
import { About } from './components/About'
import { Pricing } from './components/Pricing'
import { Contact } from './components/Contact'
import ScrollSpy from "react-ui-scrollspy"
import { ParallaxProvider } from 'react-scroll-parallax'

const Home = () => {

    return (
        <>
            <ParallaxProvider>
                <ScrollSpy scrollThrottle={180} useBoxMethod={false}>
                    <MainLogo />
                    <Portfolio />
                    <About />
                    <Pricing />
                </ScrollSpy>
                <Contact />
            </ParallaxProvider>
        </>
    )
}

export { Home }