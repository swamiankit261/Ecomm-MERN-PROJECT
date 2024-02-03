import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import Metadata from '../layout/Metadata.js';
import { addItemsToCart } from '../../actions/cartActions.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector(state => state.newReview);

    const QuantityHandler = (e) => {

        if (e === "increase" && product.stock > quantity) {
            setQuantity(e => e += 1);
        } else if (e === "decrease" && quantity > 1) {
            setQuantity(e => e -= 1);
        }
    };
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added successfully");
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const submitReviewHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(!open);
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearError())
        }
        if (success) {
            alert.success("Review submitted successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success]);

    const { images, name, _id, numOfReviews, price, stock, description, ratings, reviews } = product;
    const options = {
        size: "large",
        value: ratings,
        precision: .5,
        readOnly: true
    };

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title={`${name} -- ECOMMERCE`} />
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {images && images.map((item, i) => {
                                    return (
                                        <img className='carouselImage' key={item.url} src={item.url} alt={`${i} slide`} />
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{name}</h2>
                                <p>Product # {_id}</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'>({numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹ ${price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={() => QuantityHandler("decrease")}>-</button>
                                        <input type="Number" value={quantity} readOnly />
                                        <button onClick={() => QuantityHandler("increase")}>+</button>
                                    </div>
                                    <button disabled={stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status={""}
                                    <b className={stock < 1 ? "redColor" : "greenColor"}>
                                        {stock < 1 ? "OutofStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-4'>
                                Description : <p>{description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                        </div>
                    </div>

                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                        <DialogTitle id="simple-dialog-title">Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating onChange={(e) => setRating(e.target.value)} value={rating} size='large' />

                            <textarea className='submitDialogText' cols="30" rows="5" onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Write your review here...' />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                            <Button onClick={submitReviewHandler} color='primary'>Submit</Button>
                        </DialogActions>

                    </Dialog>

                    {reviews && reviews[0] ? (
                        <div className='reviews'>
                            {reviews && reviews.map((review, i) => {
                                return (
                                    <ReviewCard key={review} review={review} />
                                )
                            })}
                        </div>

                    ) : (
                        <p className='noReviews'>No Reviews yet</p>
                    )}
                </>
            )}
        </>
    )
}

export default ProductDetails