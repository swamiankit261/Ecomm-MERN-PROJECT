import React from 'react'
import Profile from "../../images/Profile.jpg"
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
    const { name, rating, comment } = review
    const options = {
        // size: "large",
        value: rating,
        precision: .5,
        readOnly: true
    };
    return (
        <>
            <div className='reviewCard'>
                <img src={Profile} alt="user" />
                <p>{name}</p>
                <Rating {...options} />
                <span className='reviewCardComment'>{comment}</span>
            </div>
        </>
    )
}

export default ReviewCard