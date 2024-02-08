import React, { useEffect, useRef } from 'react';
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineController, PointElement, LineElement, ArcElement } from 'chart.js';
import Metadata from '../layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';

Chart.register(LinearScale, CategoryScale, LineController, PointElement, LineElement, ArcElement);


const Dashboard = () => {

    const dispatch = useDispatch();

    const { loading, products } = useSelector(state => state.products);


    let outOfStock = 0;
    products && products.forEach((product) => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct())
    }, [dispatch]);


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                data: [0, 4000,],
                backgroundColor: [
                    "#3083DC",
                    "rgba(54, 162, 235, 0.2)",
                ],
                hoverBackgroundColor: ["#3083DC"],
                borderColor: [
                    "#3083DC",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
                hoverOffset: 4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            },
        },
        layout: {
            padding: {
                top: 1
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                align: "middle",
            },
            title: {
                display: true,
                text: "TOTAL AMOUNT",
                position: 'top',
                fontSize: 20,
                fontColor: "black",
            },
        },
        scales: {
            x: {
                type: 'category',
                // title: {
                //     display: true,
                //     text: "LABELS",
                //     fontSize: 16,
                //     fontColor: "black",
                // },
            },
            y: {
                beginAtZero: true,
                type: 'linear',
            },
        },
    };


    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                data: [outOfStock, products.length - outOfStock],
                backgroundColor: [
                    "#8AF3FF",
                    "#D6EFFF",
                ],
                hoverBackgroundColor: ["#3083DC"],
                borderColor: [
                    "#3083DC",
                    "#3083DC",
                ],
                borderWidth: 1,
            }
        ],
        options: {
            responsive: true,
            // plugins: {
            legend: {
                display: true,
                // position: 'top',
                // align: "middle",
            },
            // title: {
            //     display: true,
            //     text: "TOTAL AMOUNT",
            //     position: 'top',
            //     fontSize: 20,
            //     fontColor: "black",
            // },
        },
        // scales: {
        //     x: {
        //         type: 'category',
        //         // title: {
        //         //     display: true,
        //         //     text: "LABELS",
        //         //     fontSize: 16,
        //         //     fontColor: "black",
        //         // },
        //     },
        //     y: {
        //         beginAtZero: true,
        //         type: 'linear',
        //     },
        // },
        // },
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: "middle",
            },
            // title: {
            //     display: true,
            //     text: "Product Stock Status",
            //     position: 'top',
            //     fontSize: 20,
            //     fontColor: "black",
            // },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        }
    };


    return (
        <>
            <Metadata title={"ADMIN DASHBORD"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='dashbordContainer'>
                    <Typography component="h1">Dashboard</Typography>
                    <div className='dashbordSummary'>
                        <div>
                            <p>
                                Total Amount <br /> ₹20000
                            </p>
                        </div>
                        <div className='dashbordSummaryBox2'>
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>10</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>20</p>
                            </Link>
                        </div>
                    </div>
                    <div className='lineChart' id='lineChart'>
                        <Line data={lineState} options={chartOptions} />
                    </div>
                    <div className='doughnutChart'>
                        <Doughnut data={doughnutState} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard