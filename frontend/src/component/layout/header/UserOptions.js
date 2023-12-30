import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAlert } from 'react-alert';

function UserOptions({ user }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const alert = useAlert();
    const { avatar, role } = user;

    const orders = () => {
        navigate("/orders")
    }
    const dashboard = () => {
        navigate("/dashboard")
    }

    const account = () => {
        navigate("/account")
    }

    const logoutUser = () => {
        // dispatch(logout())
        alert.success("Logout successfully");
    }

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonOutlineIcon />, name: "Profile", func: account },
        { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
    ]

    if (role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }


    return (
        <>
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => { setOpen(false) }}
                onOpen={() => { setOpen(true) }}
                open={open}
                direction='down'
                icon={<img className='speedDialIcon' src={avatar.url ? avatar.url : "/Profile.jpg"} alt='Profile' />}
            >

                {options.map((item) => (
                    <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                ))}
            </SpeedDial>

        </>
    )
}

export default UserOptions