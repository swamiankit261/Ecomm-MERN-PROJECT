import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducers";
import { userReducer } from "./reducers/userReducers";
import { forgotPasswordReducer, updateProfileReducer } from "./reducers/updateProfile";
import { addToCart } from "./reducers/cartReducers";
import { myOrdersReducer, newOrderRequest } from "./reducers/orderReducers";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: addToCart,
    newOrder: newOrderRequest,
    myOrders: myOrdersReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));



export default store