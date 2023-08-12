import { NavBar } from '../NavBar'
import { MainLogo } from '../MainLogo'
import { Portfolio } from '../Portfolio'
import { About } from '../About'
import { Pricing } from '../Pricing'
import { Contact } from '../Contact'
import { Footer } from '../Footer'
import ScrollSpy from "react-ui-scrollspy"
import { ParallaxProvider } from 'react-scroll-parallax'

const Home = () => {

    return (
        <>
            <ParallaxProvider>
                <NavBar />
                <ScrollSpy scrollThrottle={180} useBoxMethod={false}>
                    <MainLogo />
                    <Portfolio />
                    <About />
                    <Pricing />
                </ScrollSpy>
                <Contact />
                <Footer />
            </ParallaxProvider>
        </>
    )
}

export { Home }