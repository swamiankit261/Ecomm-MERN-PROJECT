const express = require('express');
const ErrorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use('/api/v1', product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//middleware for Error
app.use(ErrorMiddleware);

//config
dotenv.config({ path: "backend/config/.env" });


module.exports = app