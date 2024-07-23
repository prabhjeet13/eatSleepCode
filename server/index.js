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
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)
//routes
const authRoutes = require('./Routes/Auth');
const problemsRoutes = require('./Routes/Problems');

const compilerRoutes = require('./Routes/Compiler');

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",problemsRoutes);
app.use("/api/v1/compiler",compilerRoutes);


//database
const {dbConnect} = require('./config/database');

// listening on port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})


dbConnect();