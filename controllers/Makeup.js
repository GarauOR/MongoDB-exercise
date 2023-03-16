"use strict";

const axios = require("axios");
const makeupModel = require("../models/Makeup");
const allMakeupModel = require("../models/AllMakeup")

function homeHandler(req, res) {
  res.status(200).send("BASE URL");
}

async function favProdsHandler(req, res) {
  let favProdsData = await makeupModel.find({ username: req.query.username });
  res.status(200).send(favProdsData);
}

async function prodByBrandHandler(req, res) {
  let productByBrand = req.query.brand;
  makeupModel.find({ brand: productByBrand }, (err, item) => {
    if (err) {
      res.status(404).send(`error in getting product's info ${err}`);
    } else {
      res.status(200).send(item);
    }
  });
}

async function addProdHandler(req, res) {
  let { name, brand, price, imageUrl, description, username, type } = req.body;
  await makeupModel.create({
    name,
    brand,
    price,
    imageUrl,
    description,
    username,
    type,
  });

  let allProds = await makeupModel.find({ username: username });
  res.status(200).send(allProds);
}

async function delProdHandler(req, res) {
  const { id } = req.params;
  await makeupModel.findByIdAndDelete(id);

  let allProds = await makeupModel.find({ username: req.query.username });
  res.status(200).send(allProds);
}

async function updProdHandler(req, res) {
  const { id } = req.params;
  const { name, brand, price, imageUrl, description } = req.body;
  await makeupModel.findByIdAndUpdate(id, {
    name,
    brand,
    price,
    imageUrl,
    description,
    type,
  });

  let allProds = await makeupModel.find({ username: req.query.username });
  res.status(200).send(allProds);
}

async function prodListHandler(req, res) {
  const prodResAPI = await axios.get(
    "http://makeup-api.herokuapp.com/api/v1/products.json"
  );
  res.status(200).send(prodResAPI.data);
}

async function addAllMakeupHandler(req, res) {
  let { name, brand, price, imageUrl, description, username, type } = req.body;
  await allMakeupModel.create({
    name,
    brand,
    price,
    imageUrl,
    description,
    username,
    type,
  });

  let allMakeup = await allMakeupModel.find();
  res.status(200).send(allMakeup);
}

async function allMakeupHandler(req, res) {
  let allMakeup = await allMakeupModel.find();
  res.status(200).send(allMakeup);
}

module.exports = {
  homeHandler,
  favProdsHandler,
  prodByBrandHandler,
  addProdHandler,
  delProdHandler,
  updProdHandler,
  prodListHandler,
  allMakeupHandler,
  addAllMakeupHandler,
};
