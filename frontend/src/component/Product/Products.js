import React, { useEffect } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearError } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useAlert } from "react-alert";

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, products, productCount } = useSelector(state => state.products)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert]);
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <h2 className='productsHeading'>products</h2>
                    <div className='products'>
                        {products.length > 0 && products.map((product) => {
                            return (
                                <ProductCard key={product._id} product={product} />
                            )
                        })}
                    </div>
                </>
            )}
        </>
    )
}

export default Products