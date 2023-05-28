const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/productController');

const router = express.Router();

//GET all products
router.get('/', getProducts);

//GET product by ID
router.get('/:id', getProduct);

//POST a new product
router.post('/', createProduct);

//DELETE product
router.delete('/:id', deleteProduct);

//UPDATE product
router.patch('/:id', updateProduct);

module.exports = router;

