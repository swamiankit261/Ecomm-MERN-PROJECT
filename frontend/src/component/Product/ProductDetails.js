import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert()

    const { product, loading, error } = useSelector(state => state.productDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert]);

    const { images, name, _id, numOfReviews, price, stock, description, ratings, reviews } = product;
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: ratings,
        isHalf: true,
    };

    return (
        <>
            {loading ? <Loader /> : (
                <>
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
                                <ReactStars {...options} />
                                <span>({numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹ ${price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button>-</button>
                                        <input type="Number" value={1} readOnly />
                                        <button>+</button>
                                    </div>
                                    <button>Add to Cart</button>
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
                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    <h3 className='reviewsHeading'>REVIEWS</h3>

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