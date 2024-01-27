import { ADD_TO_CART } from "../constants/cartConstants";

export const addToCart = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            
            const items = action.payload;

            const isItemExists = state.cartItems.find(item => item.product===items.product);

            if(isItemExists) {
                return {
                 ...state,
                    cartItems: state.cartItems.map(item => item.product===items.product? items : item)
                }
            }else {
                return {
                  ...state,
                    cartItems: [
                      ...state.cartItems,
                        items
                    ]
                }
            }
    
        default:
            return state;
    }
};