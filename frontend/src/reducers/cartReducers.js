import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFORMATION } from "../constants/cartConstants";

export const addToCart = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const items = action.payload;

            const isItemExists = state.cartItems.find(item => item.product === items.product);

            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product === isItemExists.product ? items : item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        items
                    ]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }

        case SAVE_SHIPPING_INFORMATION:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state;
    }
};