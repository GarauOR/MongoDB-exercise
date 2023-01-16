'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const makeupRoutes = require("./routes/Makeup");
const notFoundHandler = require("./handlers/404");
const errHandler = require("./handlers/500");

app.use(cors());
app.use(express.json());
app.use(makeupRoutes);
app.use(errHandler);
app.use("*", notFoundHandler);

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
});