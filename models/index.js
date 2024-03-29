'use strict';

const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(`${MONGODB_URL}/makeup`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;