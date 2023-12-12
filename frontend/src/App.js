import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import { useEffect } from 'react';

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
      {/* <Router> */}
        <Header />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
        </Routes>
        <Footer />
      {/* </Router> */}
    </>
  );
}

export default App;
