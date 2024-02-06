import React from 'react';
import "./Sidebar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom';
import { MdDashboard, MdPostAdd, MdRateReview } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import ListAlt from '@mui/icons-material/ListAlt';

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <Link to="/">
                    <img src="https://i.ibb.co/z4z4z4z/logo.png" alt="logo" />
                </Link>
                <Link to="/admin/dashboard">
                    <MdDashboard /> Dashboard
                </Link>
                <Link to="">
                    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                        <TreeItem nodeId='1' label="Products">
                            <Link to="/admin/products">
                                <TreeItem nodeId='2' label="All" icon={<MdPostAdd />}></TreeItem>
                            </Link>
                            <Link to="/admin/products">
                                <TreeItem nodeId='3' label="Create" icon={<IoMdAdd />}></TreeItem >
                            </Link>
                        </TreeItem>
                    </TreeView>
                </Link>
                <Link to="/admin/orders">
                    <p>
                        <ListAlt />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <BsPeople />
                        Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <MdRateReview />
                        Reviews
                    </p>
                </Link>
            </div>
        </>
    )
}

export default Sidebar