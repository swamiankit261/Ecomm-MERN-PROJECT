const app = require("./app");
const dotenv = require('dotenv');
const connnectDb = require('./config/dataBase');
const cloudinary = require("cloudinary")

//Hndling uncaught Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1)
})

//config
dotenv.config({ path: "backend/config/.env" });

//connect to database
connnectDb()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`server is working on http://localhost: ${process.env.PORT}`)
})

//unhandled promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise Rejection`);
    server.close(() => {
        process.exit(1)
    });
});