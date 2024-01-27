import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getstate) => {
    const { data } = await axios.get(`/api/v1/products/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity: quantity
    });


    localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));

};