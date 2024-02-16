import React, { useEffect, useState } from 'react';
import "./ProductReviews.css";
import { getAdminProduct, clearError, deleteProduct, getAllReviews, deleteReview } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { BiStar } from 'react-icons/bi';
// import Sidebar from './Sidebar';

const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector(state => state.reviews);
    const { error, reviews, loading } = useSelector(state => state.productReviews);

    const [productId, setProductId] = useState("");
    
    const deleteReviewsHandler = (reviewId) => {
        dispatch(deleteReview(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success("Review deleted successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            dispatch(getAllReviews(productId))
        }
    }, [error, alert, dispatch, deleteError, isDeleted, navigate, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
        { field: "comment", headerName: "Comment", minWidth: 300, flex: .5 },
        {
            field: "rating", headerName: "Rating", type: "number", minWidth: 180, flex: 0.4,
            cellClassName: (params) => (params.row.rating >= 3 ? "greenColor" : "redColor"),
        },
        {
            field: "actions", headerName: "Actions", type: "number", sortable: false, filterable: false, hideable: false, minWidth: 150, flex: .3
            , renderCell: (params) => (
                <strong>
                    <Button onClick={() => deleteReviewsHandler(params.row.id)}><MdDelete /></Button>
                </strong>
            ),
        },
    ];

    const rows = [];

    reviews && reviews.forEach((items) => rows.push({ id: items._id, user: items.name, comment: items.comment, rating: items.rating }));
    return (
        <>
            <Metadata title={"ALL REVIEWS -ADMIN"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='productReviewsContainer'>
                    <form className='productReviewsForm' encType='multipart/form-data' onSubmit={productReviewsSubmitHandler}>
                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>
                        <div>
                            <BiStar />
                            <input type="text" placeholder='Product Id' required value={productId} onChange={(e) => setProductId(e.target.value)} />
                        </div>
                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false || productId === "" ? true : false}>
                            Search
                        </Button>
                    </form>

                    {reviews.length > 0 ? (<DataGrid className='productListTable' rows={rows} columns={columns} autoPageSize={true} />) : (
                        <h1 className='productReviewsFormHading'>No Reviews Found</h1>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductReviews;