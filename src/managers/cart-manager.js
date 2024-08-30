const Cart = require("../models/cart-model.js");

const addProdToCart_manager = async (pid) => {
  // Buscar un carrito con estado "open"
  try {
    let cart = await Cart.findOne({ status: "open" });
    // Si no existe un carrito "open", crear uno nuevo
    if (!cart) { cart = new Cart({ products: [], status: "open" }) }

    // Verificar si el producto ya está en el carrito
    const productExists = cart.products.some( (item) => item.product.toString() === pid );

    // Agregar el producto al carrito
    if (!productExists) { cart.products.push({ product: pid }) }

    // Guardar el carrito actualizado
    console.log('manager: todo bien')
    return await cart.save();
    // return cart;
  } catch (error) {
    console.error("Error al buscar o crear un carrito", error);
    throw new Error("Error al buscar o crear un carrito");
  }
};

const delProdToCart_manager = async (cid, pid) => {
  try {
    console.log('ok, manager')
     // Encuentra el carrito por su ID
     const cart = await Cart.findById(cid);

     if (!cart) { throw new Error("Carrito no encontrado") }

    // Filtra los productos para eliminar el que coincida con el ID del producto
    cart.products = cart.products.filter( (item) => item.product.toString() !== pid );

    // Guarda el carrito actualizado
    const updatedCart = await cart.save();

    return updatedCart;
  } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el producto del carrito");
  }
};

const getAllCarts_manager = async () => {
  const carts = await Cart.find();
  if (!carts) {
    return [{}];
  }
  // .explain('executionStats');
  return carts;
};

const createCart_manager = async (data) => {
  const cart = new Cart(data);
  return await cart.save();
};

const getOneCart_manager = async (id) => {
  return await Cart.findById(id).populate("products.product");
};

const emptyCart_manager = async (cid) => {
  return await Cart.findByIdAndUpdate(
    cid, // Filtro: ID del documento que queremos actualizar
    { $set: { products: [] } }, // Actualización: Vaciar el array de productos
    { new: true } // Opcional: Devuelve el documento actualizado en lugar del original)
)};

const deleteOneCart_manager = async (id) => {
  return await Cart.findByIdAndDelete(id);
};

const updateOneCart_manager = async (id) => {
  return await Cart.updateOneCart(id);
};

module.exports = {
  delProdToCart_manager,
  addProdToCart_manager,
  getAllCarts_manager,
  createCart_manager,
  getOneCart_manager,
  emptyCart_manager,
  deleteOneCart_manager,
  updateOneCart_manager,
};
