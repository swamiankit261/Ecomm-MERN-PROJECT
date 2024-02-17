import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearError } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Metadata from "../layout/Metadata";



const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Books",
    "Watches",
    "Smartphones",
    "Accessories",
    "Home Decor",
    "Electronics",
    "Fitness Equipment",
    "Kitchen Appliances",
    "Toys and Games",
    "Jewelry",
    "Sports Gear",
    "Beauty Products",
    "Stationery",
    "Music Instruments",
    "Outdoor Gear"
];

const Products = () => {
    const dispatch = useDispatch();

    const [currentpage, setCurrentpage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const alert = useAlert()
    const { loading, error, products, productCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const params = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentpage(e)
    }

    const priceHandler = (event, newPrice) => {
        event.preventDefault();
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getProduct(params["keyword"], currentpage, price, category, ratings))
    }, [dispatch, error, alert, params, currentpage, price, category, ratings]);

    let count = filteredProductsCount;

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title={"PRODUCTS -- ECOMMERCE"} />
                    <h2 className='productsHeading'>products</h2>
                    <div className='products'>
                        {products && products.map((product) => {
                            return (
                                <ProductCard key={product._id} product={product} />
                            )
                        })}
                    </div>

                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => {
                                return <li className='category-link'
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            })}
                        </ul>

                        <fieldset>
                            <Typography component={"legend"}>Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                valueLabelDisplay='auto'
                                onChange={(e, newRatings) => {
                                    setRatings(newRatings)
                                }}
                                aria-labelledby='continuous-slider'
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && <div className='paginationBox'>
                        <Pagination
                            activePage={currentpage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText={"next"}
                            prevPageText={"prev"}
                            firstPageText={"1st"}
                            lastPageText={"last"}
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            itemClass="page-item"
                            activeLinkClass='pageLinkActive'
                        />
                    </div>}
                </>
            )}
        </>
    )
}

export default Products