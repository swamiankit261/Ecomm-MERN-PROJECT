import React, { useEffect, useRef } from 'react';
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineController, PointElement, LineElement, ArcElement } from 'chart.js';
import Metadata from '../layout/Metadata';

Chart.register(LinearScale, CategoryScale, LineController, PointElement, LineElement, ArcElement);


const Dashboard = () => {

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                data: [0, 4000],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                labels: ["Initial Amount", "Amount Earned"],
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top', // You can adjust the position as needed (top, bottom, left, right)
                align: "middle",
                // display: true,
            },
            title: {
                display: true,
                text: "TOTAL AMOUNT",
                fontSize: 20,
                fontColor: "black",
            },
        },
    };


    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                data: [4000, 6000],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            }
        ]
    }


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
                                <p>50</p>
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
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard