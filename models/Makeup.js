'use strict';

const mongoose = require("./index");

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    api_featured_image: String,
    description: String,
    username: String,
    type: String,
});

const makeupModel = mongoose.model("lipstick", productSchema);

module.exports = makeupModel;