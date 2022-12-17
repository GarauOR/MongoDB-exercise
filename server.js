'use strict'

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const homeHandler = require("./handlers/homeHandler");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/makeup", {
    useNewUrlParser:true, useUnifiedTopology:true
});

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    imageUrl: String,
    description: String
});
const makeupModel = mongoose.model("lipstick", productSchema);

// const seedLipstickCollection = () => {
//     const bronzer = new makeupModel ({
//         name: "Maybelline Face Studio Master Hi-Light Light Booster Bronzer",
//         brand: "maybelline",
//         price: 14.99,
//         imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/991799d3e70b8856686979f8ff6dcfe0_ra,w158,h184_pa,w158,h184.png",
//         description: "Maybelline Face Studio Master Hi-Light Light Boosting bronzer formula has an expert \nbalance of shade + shimmer illuminator for natural glow. Skin goes \nsoft-lit with zero glitz.\n\n\t\tFor Best Results: Brush over all shades in palette and gently sweep over \ncheekbones, brow bones, and temples, or anywhere light naturally touches\n the face.\n\n\t\t\n\t\n\n                    "
//     });

//     const contour = new makeupModel ({
//         name: "contour",
//         brand: "maybelline",
//         price: 15.99,
//         imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/4f731de249cbd4cb819ea7f5f4cfb5c3_ra,w158,h184_pa,w158,h184.png",
//         description: "Maybelline Facestudio Master Contour Kit is the ultimate on the go all-in-one palette, with contouring brush included.  Define and highlight in a New York minute with this effortless 3-step face contouring kit.  This easy-to-use 3-step face contouring kit features a bronzer, blush and highlighter."
//     });

//     const blush = new makeupModel ({
//         name: "blush",
//         brand: "maybelline",
//         price: 14.99,
//         imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/4621032a92cb428ad640c105b944b39c_ra,w158,h184_pa,w158,h184.png",
//         description: "Maybelline Face Studio Master Hi-Light Light Boosting blush formula has an expert \nbalance of shade + shimmer illuminator for natural glow. Skin goes \nsoft-lit with zero glitz.\n\n\t\tFor Best Results: Brush over all shades in palette and gently sweep over \ncheekbones, brow bones, and temples, or anywhere light naturally touches\n the face.\n\n\t\t\n\t\n\n                    "
//     });
//     bronzer.save();
//     contour.save();
//     blush.save();
// };
//seedLipstickCollection();

app.get("/", homeHandler);
app.get("/product", productsHandler);
app.get("/product-by-brand", productByBrandHandler);
app.post("/product", addProductHandler);
app.delete("/product/:id", deleteProductHandler);
app.put("/product/:id", updateProductHandler);


async function productsHandler (req,res) {
    let productsData = await makeupModel.find({});
    res.status(200).send(productsData);
}

async function productByBrandHandler (req,res) {
    let productByBrand = req.query.brand;
    makeupModel.find({brand:productByBrand}, (err,item) => {
        if(err){
            res.status(404).send(`error in getting product's info ${err}`);
        } else {
            res.status(200).send(item);
        }
    })

}

async function addProductHandler (req,res) {
    let { name, brand, price, imageUrl, description } = req.body;
    
    const newProduct = makeupModel.create({name, brand, price, imageUrl, description});

    let dataByBrand = await makeupModel.find({ brand });
    res.status(200).send(dataByBrand);
}

async function deleteProductHandler (req,res) {
    const { id } = req.params; 
    const newProduct = await makeupModel.findByIdAndDelete(id);

    let allProds = await makeupModel.find({});
    res.status(200).send(allProds);
}

async function updateProductHandler (req,res) {
    const { id } = req.params;
    const { name, brand, price, imageUrl, description } = req.body;
    const newProduct = await makeupModel.findByIdAndUpdate(id, { name, brand, price, imageUrl, description });

    let allProds = await makeupModel.find({});
    res.status(200).send(allProds);
}

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
});