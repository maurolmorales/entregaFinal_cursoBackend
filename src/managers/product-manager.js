const Product = require("../models/product-model.js");

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const getOneProduct = async (id) => {
  return await Product.findById();
};

const deleteOneProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const updateOneProduct = async (id) => {
  return await Product.updateOneProduct(id);
};

module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct
};
