const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        PaymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems,
        PaymentInfo, itemsPrice,
        taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        userRef: req.user._id
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Get single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("userRef", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get logged in user Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ userRef: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });

});

// get all orders (Admin)
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => totalAmount += order.totalPrice);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// update order status (Admin)
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this _id:${req.params.id}`), 404);
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Delivered") {
        order.orderItems.forEach(async ord => await updateStock(ord.product, ord.quantity));
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});


async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
};

// Delete a order (Admin)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this Id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        order: order.orderItems.name
    });
});