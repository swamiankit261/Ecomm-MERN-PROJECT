const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");
const cloudinary = require("cloudinary");


// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password, avatar } = req.body;

    const existEmail = await User.findOne({ email });

    if (existEmail) {
        return next(new ErrorHandler("You can't use invalid or duplicate emails.", 409))
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, { folder: "Avatars", width: 200, CropMode: "scale" },function (error, result) { console.log(error); });

    // const myCloud = await cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    //     { folder: "Avatars" },
    //     function (error, result) { console.log("sdjhfksd"); });


    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    const message = `Dear ${user.name},\n welcome to the Ecommerce Website family! We hope you find everything you need and more.\n\nHappy shopping!\n\nBest regards,\nThe Ecommerce Website Team.`

    sendEmail({
        email: user.email,
        subject: `Welcome to [My Ecommerce Website]!`,
        message
    });

    sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email & password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);

});

// logout user 

exports.logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    });
});


// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        next(new ErrorHandler("user not found", 404));
    }

    // Get ResetPassword token

    const resetToken = user.getResetPaswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :-\n\n ${resetPasswordUrl} \n\n if you have not requested this email than, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        // user.resetPasswordToken = undefined;
        // user.resetPasswordExpier = undefined;

        // await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset password 
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Creating token hash

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpier: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler(`Reset password token is invalid or has been expired`, 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(`Password does not match`, 400));
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpier = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get user Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
});

// update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

});

// Update User Profile
exports.updateUserProfile = async (req, res, next) => {

    let user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.avatar !== "") {

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, { folder: "Avatars", width: 200, CropMode: "scale" });

        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

    };

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
};


// Get All Users (Admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

//Get Single user (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role (Admin)
exports.upDateUserRole = catchAsyncError(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return next(new ErrorHandler(`${JSON.stringify(result.array())}`), 400);
    }

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`user note found`, 404));
    }
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });



    res.status(200).json({
        success: true,
        user
    });
});


// Delete user (Admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);


    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).send({
        success: true,
        message: `User Deleted successfully`
    });
});