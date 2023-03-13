'use strict';

const mongoose = require("./index");

const allProductSchema = new mongoose.Schema({
    makeup: Array,
});

const AllMakeupModel = mongoose.model("AllMakeups", allProductSchema);

module.exports = AllMakeupModel;