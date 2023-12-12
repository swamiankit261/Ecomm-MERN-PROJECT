const express = require("express");
const R = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderControllers");

R.route("/order/new").post(isAuthenticatedUser, newOrder);

R.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
R.route("/orders/me").get(isAuthenticatedUser, myOrders);

R.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
R.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);
R.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = R;