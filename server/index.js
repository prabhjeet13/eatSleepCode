// express
const express = require("express");
const app = express();

require('dotenv').config();

// fetch port
const PORT = process.env.PORT || 4000;


// builtin middlewares
const cookiePaser = require('cookie-parser');
app.use(express.json());
app.use(cookiePaser());


//routes
const authRoutes = require('./Routes/Auth');
app.use("/api/v1/auth",authRoutes);

//database
const {dbConnect} = require('./config/database');

// listening on port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})


dbConnect();