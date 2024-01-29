import axios from "axios";
import { ADD_TO_CART,REMOVE_FROM_CART, SAVE_SHIPPING_INFORMATION } from "../constants/cartConstants";


//add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity: quantity
            }
        });

        const updatedCartItems = getState().cart.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
};

//remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        });

        const updatedCartItems = getState().cart.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
};

//save shipping information
export const saveShippingInfo = (shippingInformation) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SAVE_SHIPPING_INFORMATION,
            payload: shippingInformation
        });

        const updatedCartItems = getState().cart.cartItems;
        localStorage.setItem("shippingInfo", JSON.stringify(updatedCartItems));
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
};