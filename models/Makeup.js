'use strict';

const mongoose = require("./index");

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    imageUrl: String,
    description: String,
    username: String
});

const makeupModel = mongoose.model("lipstick", productSchema);

module.exports = makeupModel;