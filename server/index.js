// express
const express = require("express");
const app = express();

require('dotenv').config();

// fetch port
const PORT = process.env.PORT || 4000;

//routes

// builtin middlewares
const cookiePaser = require('cookie-parser');


//database
const {dbConnect} = require('./config/database');


app.use(express.json());
app.use(cookiePaser());


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})


dbConnect();