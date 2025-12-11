// import express module
const express = require("express");

// import dotenv module
require("dotenv").config();

// import sanitize module
const sanitize = require("sanitize");

// import port
const port = process.env.PORT;

// import cors module
const cors = require('cors');

// import router module
const router = require("./Routes");
// setup the CORS  option to allow requests from our front-end
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://pro-roadmap.vercel.app"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};


// initialize express app
const app = express();

app.use(cors(corsOptions  ));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add sanitizer to express middleware
app.use(sanitize.middleware);



app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;