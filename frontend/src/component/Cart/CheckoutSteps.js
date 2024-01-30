import React from 'react';
import "./CheckoutSteps.css";
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { MdLocalShipping, MdLibraryAddCheck, MdAccountBalance } from "react-icons/md";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <MdLocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <MdLibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <MdAccountBalance />,
        },
    ];

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.label} completed={activeStep > index} className="custom-step">
                        <StepLabel
                            icon={<span className="custom-step-icon" style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }}>{step.icon}</span>}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

export default CheckoutSteps;
