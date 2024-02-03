import React from 'react';
import "./Sidebar.css";
// import { TreeView } from "@mui/material"
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <Link to="/">
                    <div className='logo'>
                        weq
                        {/* <img src="https://i.ibb.co/z4z4z4z/logo.png" alt="logo" /> */}
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Sidebar