import axios from "axios";
import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL
} from "../constants/productConstants";

export const getProduct = (keyword = '', currentpage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};

// get product for admin
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get('/api/v1/admin/products');

        dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data, });

    } catch (error) {
        dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.response.data.message });
    }
};

// get products admin routes
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = {headers: {'Content-Type': 'application/json'}};

        const { data } = await axios.post('/api/v1/admin/products/new', productData, config);

        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data, });
    } catch (error) {
        dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
    }
};


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/products/${id}`);
        console.log(data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
};

// new review request
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/review', reviewData, config);
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success, });
    } catch (error) {
        dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message })
    }
};

//Clearing Errors
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};