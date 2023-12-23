import React, { useState } from 'react';
import './navbar-layout.css';
import './navbar-animations.css';
import { Link } from 'react-router-dom';
import { AiOutlineAmazon } from "react-icons/ai";
import { MdLocalGroceryStore } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { BiSolidUserRectangle } from "react-icons/bi";

const NavbarComponent = () => {

    const [isAnimated, setAnimated] = useState(false);
    const [isAnimated2, setAnimated2] = useState(false);

    const startAnimation = () => {
        setAnimated(!isAnimated);
        setAnimated2(isAnimated);
    };

    return (
        <div>
            <div className="navbar">
                <div className={`nav-item ${isAnimated ? 'animateF1' : `${isAnimated2 ? "animate_up1" : ""}`}`} id="nav_1">
                    <Link className="nav-child1" to={"/"} onClick={startAnimation}><MdLocalGroceryStore fontSize={30} /></Link>
                    <div className="hamb" onClick={startAnimation}>
                        <span className={`ham_1 ${isAnimated ? 'ham_1' : ''}`}>|</span>
                        <span className={`ham_2 ${isAnimated ? 'ham_2' : ''}`}>|</span>
                        <span className={`ham_3 ${isAnimated ? 'ham_3' : ''}`}>|</span>
                    </div>
                </div>
                <div className={`nav-item ${isAnimated ? 'animateF2' : `${isAnimated2 ? "animate_up2" : ""}`}`} id="nav_2">
                    <div className="nav-child2">
                        <Link className="nav-child2_1" to={"/"} onClick={startAnimation}>Home</Link>
                        <Link className="nav-child2_2" to={'/products'} onClick={startAnimation}>Products</Link>
                    </div>
                </div>
                <div className={`nav-item ${isAnimated ? 'animateF3' : `${isAnimated2 ? "animate_up3" : ""}`}`} id="nav_3">
                    <div className="nav-child3">
                        <Link className="nav-child3_1" to={"/"} onClick={startAnimation}>Contact</Link>
                        <Link className="nav-child3_2" to={"/"} onClick={startAnimation}>About</Link>
                    </div>
                </div>
                <div className={`nav-item ${isAnimated ? 'animateF4' : `${isAnimated2 ? "animate_up4" : ""}`}`} id="nav_4">
                    <div className="nav-child4">
                        <Link className="nav-child4_1" to={"/search"} onClick={startAnimation}>< IoSearchSharp fontSize={25} /></Link>
                        <Link className="nav-child4_2" to={"/"} onClick={startAnimation}><FiShoppingBag fontSize={25} /></Link>
                        <Link className="nav-child4_3" to={"/"} onClick={startAnimation}><BiSolidUserRectangle fontSize={25} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
