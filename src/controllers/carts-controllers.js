const mongoose = require("mongoose");
const {
  addProdToCart_manager,
  getAllCarts_manager,
  getOneCart_manager,
  createCart_manager,
  deleteOneCart_manager,
  updateOneCart_manager,
  delProdToCart_manager,
  emptyCart_manager
} = require("../managers/cart-manager.js");

const addProdToCart_controller = async (req, res) => {
  try {
    // Verificar si existe un carrito con estado "open" para el usuario
    let cart = await addProdToCart_manager(req.params.pid);
    if (!cart) {
      await res.status(404).json({ error: "Lista de Carritos no encontrada" });
    }
    res.status(201).redirect("/carts");
    //.render("carts", cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los carritos(controller)" });
  }
};

const getAllCarts_controller = async (req, res) => {
  try {
    const carts = await getAllCarts_manager();
    if (!carts) {
      res
        .status(404)
        .json({ error: "Lista de Carritos no encontrada" }, error.message);
    }
    const plainCarts = JSON.parse(JSON.stringify(carts));
    res.status(200).render("carts", { plainCarts});
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
};

const getOneCart_controller = async (req, res) => {
  try {
    const cart = await getOneCart_manager(req.params.cid);
      const plainCart = JSON.parse(JSON.stringify(cart));
      console.log('plain', plainCart)
      res.status(200).render("idCart", plainCart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un carrito" });
  }
};

const createCart_controller = async (req, res) => {
  try {
    const cartBody = req.body;

    // verifico los tipos de cada uno de los elementos:
    if (
      typeof cartBody.title !== "string" ||
      cartBody.title == null ||
      cartBody.title === "" ||
      cartBody.title == undefined
    ) {
      return res.status(400).json({ error: "Title no válida o inexistente" });
    }

    if (
      typeof cartBody.description !== "string" ||
      cartBody.description == null ||
      cartBody.description === "" ||
      cartBody.description == undefined
    ) {
      return res
        .status(400)
        .json({ error: "Descrición no válida o inexistente" });
    }

    if (
      typeof cartBody.code !== "string" ||
      cartBody.code == null ||
      cartBody.code === "" ||
      cartBody.code == undefined
    ) {
      return res.status(400).json({ error: "Code no válida o inexistente" });
    }

    if (
      typeof cartBody.price !== "number" ||
      cartBody.price == null ||
      cartBody.price === "" ||
      cartBody.price == undefined
    ) {
      return res.status(400).json({ error: "Price no válida o inexistente" });
    }

    if (
      typeof cartBody.stock !== "number" ||
      cartBody.stock == null ||
      cartBody.stock === "" ||
      cartBody.stock == undefined
    ) {
      return res.status(400).json({ error: "Stock no válida o inexistente" });
    }

    if (
      typeof cartBody.category !== "string" ||
      cartBody.category == null ||
      cartBody.category === "" ||
      cartBody.category == undefined
    ) {
      return res
        .status(400)
        .json({ error: "Category no válida o inexistente" });
    }

    const savedCart = await createCart_manager(cartBody);
    return res.status(201).json(savedCart);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el carrito" });
  }
};

const delProdToCart_controller = async (req, res) => {
  try {
    console.log('ok, controllers')
    const { cid, pid } = req.params; 

    // Llama al manager para eliminar el producto
    const updatedCart = await delProdToCart_manager(cid, pid);

    if (!updatedCart) { return res.status(404).json({ error: "Carrito o producto no encontrado" }) }
    // Redirige o responde según sea necesario
    res.status(200).redirect("/carts");

  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los carritos(controller)"})
  }  
};

const emptyCart_controller = async (req, res) => {
  try {
    console.log('ok, controllers dee')
    const { cid } = req.params; 

    // Llama al manager para eliminar el producto
    const updatedCart = await emptyCart_manager(cid);

    if (!updatedCart) { return res.status(404).json({ error: "Carrito o producto no encontrado" }) }
    // Redirige o responde según sea necesario
    res.status(200).redirect("/carts");

  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los carritos(controller)"})
  }  
};

const deleteOneCart_controller = async (req, res) => {
  try {
    const cart = await deleteOneCart_manager(req.params.pid);
    if (cart) {
      res.status(200).json({ message: "Cart Eliminado" });
    } else {
      res.status(404).json({ error: "Cart no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener un Carrito" });
  }
};

const updateOneCart_controller = async (req, res) => {
  try {
    const cartBody = req.body;
    const cart = await updateOneCart_manager(req.params.pid, cartBody);
    if (cart) {
      return res
        .status(200)
        .json({ message: "carrito actualizado exitosamente" });
    } else {
      return res.status(404).json({ error: "carrito no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener un carritos" });
  }
};

module.exports = {
  addProdToCart_controller,
  emptyCart_controller,
  getAllCarts_controller,
  getOneCart_controller,
  createCart_controller,
  deleteOneCart_controller,
  delProdToCart_controller,
  updateOneCart_controller,
};
