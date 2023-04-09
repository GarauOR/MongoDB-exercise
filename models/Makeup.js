'use strict';

const mongoose = require("./index");

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    api_featured_image: String,
    description: String,
    username: String,
    product_type: String,
    product_link: String,
});

const makeupModel = mongoose.model("lipstick", productSchema);

module.exports = makeupModel;