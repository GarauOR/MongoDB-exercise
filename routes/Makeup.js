'use strict';

const express = require('express');
const MKRouter = express.Router();
const MKHandlers = require('../controllers/Makeup');

MKRouter.get("/", MKHandlers.homeHandler);
MKRouter.get("/product", MKHandlers.favProdsHandler);
MKRouter.get("/prodlist", MKHandlers.prodListHandler);
MKRouter.get("/productbybrand", MKHandlers.prodByBrandHandler);
MKRouter.post("/product", MKHandlers.addProdHandler);
MKRouter.delete("/product/:id", MKHandlers.delProdHandler);
MKRouter.put("/product/:id", MKHandlers.updProdHandler);

module.exports = MKRouter; 