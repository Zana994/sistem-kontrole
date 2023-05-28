const Product = require('../models/productModel');
const mongoose = require('mongoose');

//GET all products
const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
}

//GET product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'The type of product ID is invalid.'});
  }

  const product = await Product.findOne({ _id: id });

  if(!product) {
    return res.status(400).json({error: 'There is no product with given ID.'});
  }

  res.status(200).json(product);
}

//POST product
const createProduct = async (req, res) => {
  const {name, manufacturer, serial_number, country_of_origin, description} = req.body;
  
  if(!name || !manufacturer || !country_of_origin) {
    return res.status(400).json({error: 'Please fill marked fields!'});
  }

  try {
    const product = await Product.create({
      name, 
      manufacturer, 
      serial_number, 
      country_of_origin, 
      description
    });
    res.status(200).json(product);
  }
  catch(error) {
    res.status(400).json({error: error.message});
  }
}

//DELETE product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'The type of product ID is invalid.'});
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if(!product) {
    return res.status(400).json({error: 'There is no product with given ID.'});
  }

  res.status(200).json(product);
}

//UPDATE product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'The type of product ID is invalid.'})
  }

  const product = await Product.findOneAndUpdate({ _id: id }, 
    {...req.body}, {returnOriginal: false});

  if(!product) {
    return res.status(400).json({error: 'There is no product with the given ID.'});
  }

  res.status(200).json(product);
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
};