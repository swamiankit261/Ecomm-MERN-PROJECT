import React, { useState } from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearError } from '../../actions/productAction';
import { MdAccountTree, MdAttachMoney, MdDescription, MdOutlineSpellcheck, MdStorage } from 'react-icons/md';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(state => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Smartphones",
    ];

    const createSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach(image =>
            myForm.append("images", image)
        );
        dispatch(createProduct(myForm));
    };

    const createProductImageChangeHandler = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(prev => [...prev, reader.result]);
                    setImages(prev => [...prev, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (success) {
            alert.success("Product created successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [error, dispatch, alert, success, navigate]);

    return (
        <>
            <Metadata title={"Create Product"} />

            <div className='dashbord'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form className='crateProductForm' encType='multipart/form-data' onSubmit={createSubmitHandler}>
                        <h1>Create Product</h1>
                        <div>
                            <MdOutlineSpellcheck />
                            <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <MdAttachMoney />
                            <input type="number" placeholder='Price' required value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <MdDescription />
                            <textarea placeholder='Description' required cols="30" rows="1" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <MdAccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((category) => (

                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <MdStorage />
                            <input type="number" placeholder='Stock' required value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>
                        <div id='createProductFormFile'>
                            <input type="file" name='Avatar' accept='image/*' multiple onChange={createProductImageChangeHandler} />
                        </div>
                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, i) => (
                                <img key={i} src={image} alt="Avatar Preview" />
                            ))}
                        </div>
                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct;