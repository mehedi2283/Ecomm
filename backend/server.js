const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// app.get("*", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });

//Handleing Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down Server due to Uncaught Exceptions`);
    process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });
const PORT = process.env.PORT;

//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

//Unhandled Promise errors
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down Server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
