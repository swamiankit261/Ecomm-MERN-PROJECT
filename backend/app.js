const express = require('express');
const ErrorMiddleware = require('./middleware/error');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoutes");

app.use('/api/v1', product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for Error
app.use(ErrorMiddleware)


module.exports = app