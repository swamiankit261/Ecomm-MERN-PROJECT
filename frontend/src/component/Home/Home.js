import React, { useEffect } from 'react';
import { PiMouseSimpleFill } from "react-icons/pi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import Metadata from '../layout/Metadata.js';
import { clearError, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? (<Loader />) : (<>
                <Metadata title={"ECOMMERCE"} />
                <div className='banner'>
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>
                    <a href="#container">
                        <button>scroll <PiMouseSimpleFill /></button>
                    </a>
                </div>
                <div className='maincontainer'>
                    <h2 className='homeHeading'>Featured Products</h2>
                    <div className='container' id='container'>
                        {products && products.map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                </div>
            </>)}
        </>
    )
}

export default Home