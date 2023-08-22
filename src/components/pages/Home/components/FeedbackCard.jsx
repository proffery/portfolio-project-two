/* eslint-disable react/prop-types */

const FeedbackCard = ({author, timestamp, feedback}) => {
    return (
        <div className="feedback-card">
            <div className="txtBx">
                <p>{feedback}</p>
            </div>
            <div className="details">
                <h2>{author}
                    <br/>
                    <span>{new Date(timestamp.seconds * 1000).toLocaleString("ru-RU", {dateStyle: "short"})}</span>
                </h2>
            </div>
       </div>
    )
}

export { FeedbackCard }