const Product = require("../models/product-model.js");

const getAllProducts_manager = async (options) => {
  try {
    const products = await Product.paginate({}, options);
    // .explain('executionStats');
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos con paginación");
  }
};

const createProduct_manager = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const getOneProduct_manager = async (id) => {
  return await Product.findById(id);
};

const deleteOneProduct_manager = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const updateOneProduct_manager = async (id) => {
  return await Product.updateOneProduct(id);
};

module.exports = {
  getAllProducts_manager,
  createProduct_manager,
  getOneProduct_manager,
  deleteOneProduct_manager,
  updateOneProduct_manager,
};
