import React, { useState } from 'react';
import "./UpdateProduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import Sidebar from './Sidebar';
import { updateProduct, getProductDetails, clearError } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { MdAccountTree, MdAttachMoney, MdDescription, MdOutlineSpellcheck, MdStorage } from 'react-icons/md';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    const { error, product } = useSelector(state => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Books",
        "Smartphones",
    ];

    const updateFormSubmitHandler = (e) => {
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
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImageChangeHandler = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("Product updated successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [error, dispatch, alert, isUpdated, navigate, product, productId, updateError]);

    return (
        <>
            <Metadata title={"Update Product"} />

            <div className='dashbord'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form className='crateProductForm' encType='multipart/form-data' onSubmit={updateFormSubmitHandler}>
                        <h1>Update Product</h1>
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
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                            <input type="file" name='Avatar' accept='image/*' multiple onChange={updateProductImageChangeHandler} />
                        </div>
                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, i) => (
                                <img key={i} src={image.url} alt="OldProduct Preview" />
                            ))}
                        </div>
                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, i) => (
                                <img key={i} src={image} alt="Product Preview" />
                            ))}
                        </div>
                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct;