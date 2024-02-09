const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");

//create product-- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    };

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const image = await cloudinary.v2.uploader.upload(images[i], { folder: "products" });
        imagesLinks.push({
            public_id: image.public_id,
            url: image.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const productData = await Product.create(req.body);

    res.status(201).json({
        success: true,
        productData
    })

});


// GET ALL product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search().filter()

    let products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });

});


// GET ALL products (admin only)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    })
})

// GET single product / product Details
exports.getSingleProduect = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })
});

// Update product-- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    //Images are stored in the cloudinary database in order of appearance in the product list

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    };

    if (images !== undefined) {
        // delete images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        };

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const image = await cloudinary.v2.uploader.upload(images[i], { folder: "products" });
            imagesLinks.push({
                public_id: image.public_id,
                url: image.secure_url,
            });
        };
        req.body.images = imagesLinks;
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true, useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

});

// Delete product-- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    //Delete product images from cloudinary server storage
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    };

    // await product.remove();
    const result = await Product.findByIdAndDelete(productId);

    if (result.deletedCount === 0) {
        return next(new ErrorHandler("product not delete", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });

});

// Create NEW Review or Update The review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment
    };

    const product = await Product.findById(productId);

    const isReviewed = await product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    // const avg = product.reviews.reduce((total, rev) => total + rev.rating, 0) / product.reviews.length;


    let avg = 0

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;


    await product.save({ validateBeforeSave: false });

    const HTTP_STATUS_OK = 200;
    res.status(HTTP_STATUS_OK).json({
        success: true,
    });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, { new: true, runValidators: true, useFindAndModify: false })

    res.status(200).json({
        success: true
    });
});
