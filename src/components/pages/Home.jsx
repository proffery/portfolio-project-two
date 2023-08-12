import { MainLogo } from '../MainLogo'
import { Portfolio } from '../Portfolio'
import { About } from '../About'
import { Pricing } from '../Pricing'
import { Contact } from '../Contact'
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