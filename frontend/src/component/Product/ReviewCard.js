import React from 'react'
import ReactStars from "react-rating-stars-component";
import Profile from "../../images/Profile.jpg"

const ReviewCard = ({ review }) => {
    const { name, rating, comment } = review
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: rating,
        isHalf: true,
    }
    return (
        <>
            <div className='reviewCard'>
                <img src={Profile} alt="user" />
                <p>{name}</p>
                <ReactStars {...options} />
                <span>{comment}</span>
            </div>
        </>
    )
}

export default ReviewCard