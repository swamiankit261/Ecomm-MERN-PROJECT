const catchAsyncError = require("../middleware/catchAsyncError");
const Stripe = require("stripe")("sk_test_51OeWzISGFp8gzo48GfpKVsihGy8Dx44M3AwoKWH9QxFMGS9gQgrXRtXgGMk5tVXeVjX0u6naWD53mxtRwZToLiAA00r3a4gYrX");

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const myPayment = await Stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        payment_method: req.body.paymentMethodId,
        confirm: true,
        receipt_email: req.user.email,
        return_url: req.body.return_url,
        description: "Payment is successfully",
        metadata: {
            // orderId: req.body.orderId
            company: "Ecommerce"
        }
    });


    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
});

// send stripe api key
exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_PUBLISHABLE_KEY,
    });
})