import { Container } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { FeedbackCard } from "./FeedbackCard"
import Carousel from 'react-multi-carousel'
import { useParallax } from 'react-scroll-parallax'

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const { ref } = useParallax({ speed: -5 })

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1280, min: 464 },
          items: 3
        },
        largeMobile: {
            breakpoint: { max: 640, min: 464 },
            items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(getFirestore(), "feedback"), where("isPublished", "==", true))
            const querySnapshot = await getDocs(q)
            const feedbacksData = []
            querySnapshot.forEach((doc) => {
                feedbacksData.push({
                    author: doc.data().author,
                    isPublished: doc.data().isPublished,
                    feedback: doc.data().feedback,
                    timestamp: doc.data().timestamp
                })
            })
            setFeedbacks(feedbacksData)
        }
        fetchData()
    }, [])

    return (
        <section ref={ref} className="feedbacks my-5" id="/#feedbacks">
            <Container >
                <h2 className='mt-5'>Feedbacks</h2>
            </Container>
                <Carousel 
                    responsive={responsive} 
                    infinite={true} 
                    autoPlay={false}
                    keyBoardControl={false}
                    arrows={false}
                    focusOnSelect={false}
                    centerMode={false}
                    rewind={false}
                    showDots={true}
                    className='feedback-slider p-5'>
                    {feedbacks.map((feedback, index) => {
                        return (
                            <FeedbackCard key={index} {...feedback}/>
                            )
                    })}
                </Carousel>
        </section>
    )
}

export { Feedbacks }