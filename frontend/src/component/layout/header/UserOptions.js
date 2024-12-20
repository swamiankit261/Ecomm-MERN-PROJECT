import React, { useState } from 'react'
import "./UserOptions.css"
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAlert } from 'react-alert';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';

function UserOptions({ user }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((item) => item.cart);

    const { avatar, role } = user;

    const orders = () => {
        navigate("/orders")
    }
    const dashboard = () => {
        navigate("/admin/dashboard")
    }

    const account = () => {
        navigate("/account")
    };

    const cart = () => {
        navigate("/cart")
    }

    const logoutUser = () => {
        dispatch(logout())
        alert.success("Logout successfully");
    }

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonOutlineIcon />, name: "Profile", func: account },
        { icon: <RiShoppingCart2Fill color={cartItems.length > 0 ? "tomato" : "unset"} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
    ]

    if (role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }


    return (
        <>
            <Backdrop
                sx={{ color: '#fff' }}
                style={{ zIndex: 1 }}
                open={open}
            ></Backdrop>
            <SpeedDial
                className='speeddial'
                style={{ zIndex: 1 }}
                ariaLabel='SpeedDial tooltip example'
                onClose={() => { setOpen(false) }}
                onOpen={() => { setOpen(true) }}
                open={open}
                direction='down'
                icon={<img className='speedDialIcon' src={avatar.url || "/Profile.jpg"} alt='Profile' />}
            >

                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true : false} />
                ))}
            </SpeedDial>

        </>
    )
}

export default UserOptions