'use strict';

const mongoose = require("./index");

const allProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    imageUrl: String,
    description: String,
    username: String,
    type: String,
});

const allMakeupModel = mongoose.model("AllMakeups", allProductSchema);

module.exports = allMakeupModel;