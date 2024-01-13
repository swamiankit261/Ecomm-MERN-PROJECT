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
import { useEffect } from 'react';
import LoginSignUpPage from './component/user/LoginSignUpPage.js';
import store from './Store.js';
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/header/UserOptions.js"
import { useSelector } from 'react-redux';
import ProtectedRoute from "./component/routes/ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state => state.user));
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', "Chilanka"]
      }
    });


    store.dispatch(loadUser());
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
