import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, productsReducer, reviewsReducer } from "./reducers/productReducers";
import { allUserReducer, userDetailsReducer, userReducer } from "./reducers/userReducers";
import { forgotPasswordReducer, updateProfileReducer } from "./reducers/updateProfile";
import { addToCart } from "./reducers/cartReducers";
import { allOrdersReducer, myOrdersReducer, newOrderRequest, orderDetailsReducer, orderReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: addToCart,
    newOrder: newOrderRequest,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: deleteProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    reviews: reviewsReducer,
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