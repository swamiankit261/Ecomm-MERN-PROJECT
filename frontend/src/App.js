import './App.css';
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/order/MyOrders";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrdersList from "./component/Admin/OrdersList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import React, { useEffect, useState } from 'react';
import LoginSignUpPage from './component/user/LoginSignUpPage.js';
import store from './Store.js';
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/header/UserOptions.js"
import { useSelector } from 'react-redux';
import ProtectedRoute from "./component/routes/ProtectedRoute";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/payment/stripeApiKey`);

    setStripeApiKey(data.stripeApiKey);
  }
  const { isAuthenticated, user } = useSelector((state => state.user));
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', "Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUpPage />} />

        <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
        <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path="/login/shipping" element={<ProtectedRoute component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />

        {stripeApiKey && <Route exact path="/process/payment" element={
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute component={Payment} />
          </Elements>
        } />}
        <Route exact path="/success" element={<ProtectedRoute component={OrderSuccess} />} />
        <Route exact path="/orders" element={<ProtectedRoute component={MyOrders} />} />
        <Route exact path="/order/:id" element={<ProtectedRoute component={OrderDetails} />} />
        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={Dashboard} />} />
        <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
        <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
        <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true} component={NewProduct} />} />
        <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
        <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true} component={OrdersList} />} />
        <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />} />
        <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true} component={UsersList} />} />
        <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} component={UpdateUser} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
