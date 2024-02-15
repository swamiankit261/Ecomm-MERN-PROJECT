const express = require("express");
const { registerUser, loginUser, logout, forgotPassword,
    resetPassword, getUserDetails, updatePassword, updateUserProfile,
    getAllUsers, getSingleUser, upDateUserRole, deleteUser } = require("../controllers/userControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { body } = require("express-validator");
const R = express.Router();

const upDateUserRoleValidation = [
    // body("name", "name must be required").isLength({ min: 2 }),
    // body("email", "email must be required\ninvalid Email").isEmail(),
    body("role", "role must be required").isLength({ min: 4, max: 5 }),
]

R.route("/register").post(registerUser);

R.route("/login").post(loginUser);
R.route("/logout").get(logout);

R.route('/password/forgot').post(forgotPassword);
R.route('/password/reset/:token').put(resetPassword);
R.route("/me").get(isAuthenticatedUser, getUserDetails);

R.route("/password/update").put(isAuthenticatedUser, updatePassword);
R.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

R.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
R.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), upDateUserRoleValidation, upDateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports = R;