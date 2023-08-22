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
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
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
                //console.log(doc.id, " => ", doc.data())
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
        <section ref={ref} className="feedbacks mb-3" id="feedbacks">
            <Container >
                <h2 className='mb-3'>Feedbacks</h2>
            </Container>
                <Carousel 
                    responsive={responsive} 
                    infinite={true} 
                    autoPlay={true}
                    keyBoardControl={true}
                    arrows={false}
                    focusOnSelect={false}
                    centerMode={true}
                    rewind={false}
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