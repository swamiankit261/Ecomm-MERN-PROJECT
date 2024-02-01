const express = require('express');
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require('../controllers/paymentControllers');
const R = express.Router();

R.route("/payment/process").post(isAuthenticatedUser, processPayment);
R.route("/payment/stripeApiKey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = R;