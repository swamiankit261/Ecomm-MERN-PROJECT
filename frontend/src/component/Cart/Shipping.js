import React, { useState } from 'react';
import "./Shipping.css";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from "../Cart/CheckoutSteps";
import { saveShippingInfo } from '../../actions/cartActions';
import { Country, State } from "country-state-city";
import { useAlert } from 'react-alert';
import { IoMdHome } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { TbMapPinCode } from "react-icons/tb";
import { MdPhone } from "react-icons/md";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import Metadata from '../layout/Metadata';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const shippingInfo = useSelector((state) => state.cart.shippingInfo);


    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phone, setPhone] = useState(shippingInfo.phone);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (!address || !city || !state || !country || !pincode || !phone) {
            alert.show('Please fill all the fields');
            return;
        } else if (!phone.match(/^[0-9]{10}$/g)) {
            alert.error('Please enter a valid phone number');
            return;
        }
        else {
            dispatch(saveShippingInfo({ address, city, state, country, pincode, phone }));
            navigate("/order/confirm");
        }
    };

    return (
        <>
            <Metadata title={"Shipping Details"} />
            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2 className='shippingHeading'>Shipping Details</h2>

                    <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                        <div>
                            <IoMdHome />
                            <input
                                type='text'
                                name='address'
                                value={address}
                                placeholder='Address'
                                required={shippingInfo.address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                        </div>
                        <div>
                            <MdLocationCity />
                            <input
                                type='text'
                                name='city'
                                value={city}
                                placeholder='City'
                                required={shippingInfo.city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                        </div>
                        <div>
                            <TbMapPinCode />
                            <input
                                type='number'
                                name='pincode'
                                value={pincode}
                                placeholder='Pincode'
                                required={shippingInfo.pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />

                        </div>
                        <div>
                            <MdPhone />
                            <input
                                type='number'
                                name='phone'
                                value={phone}
                                placeholder='Phone'
                                required={shippingInfo.phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                        </div>
                        <div>
                            <BsGlobeAmericas />
                            {console.log("ffffff", country)}
                            <select
                                name='country'
                                value={country}
                                required={shippingInfo.Country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                {Country && Country.getAllCountries().map((country) => (

                                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                ))};

                            </select>

                        </div>
                        {country && (
                            <div>
                                <MdOutlineTransferWithinAStation />
                                <select
                                    name='state'
                                    value={state}
                                    required={shippingInfo.state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    {State && State.getStatesOfCountry(country).map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <button className='shippingBtn' type='submit' value="Continue" disabled={state ? false : true}>Continue</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping