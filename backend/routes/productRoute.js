const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduect, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();

const isValidId = [
    body("id", "please enter the valid Id!").matches(/^[0-9a-fA-F]{24}$/)
];

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


router.route("/products/:id").get(getSingleProduect);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router