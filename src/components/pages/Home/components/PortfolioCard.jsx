import { Card } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const PortfolioCard = ({imgUrl, blackAndWhiteMode, setFullScreen, setFullScreenUrl}) => {
    return (
    <>
        <Card 
            className='rounded-0'
            onClick={(e) => {
                e.stopPropagation()
                setFullScreen('visible')
                setFullScreenUrl(imgUrl)
            }}  
        >
            <Card.Img 
                className="rounded-0" 
                variant="top" 
                src={imgUrl} 
                style={blackAndWhiteMode ? {filter: 'grayscale(100%)'} : {filter: 'none'}}   
            />
        </Card>
    
    </>
    )
}

export { PortfolioCard }