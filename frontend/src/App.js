import './App.css';
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import { useEffect } from 'react';
import LoginSignUpPage from './component/user/LoginSignUpPage.js';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid sans', "Chilanka"]
      }
    });
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
