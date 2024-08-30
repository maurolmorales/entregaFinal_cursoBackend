const express = require("express");
const router = express.Router();

const {
  getAllCarts_controller,
  addProdToCart_controller,
  delProdToCart_controller,
  getOneCart_controller,
  addProdToCart,
  emptyCart_controller,
} = require("../controllers/carts-controllers.js");

router.get("/", getAllCarts_controller);


router.get("/:cid", getOneCart_controller);


router.post("/", async (req, res) => {
  try {
    const createdCart = await createCart();
    return res.status(201).json(createdCart);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el carrito." });
  }
});

router.post("/:pid", addProdToCart_controller);

//deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", delProdToCart_controller);

//deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put("/:cid", async (req, res) => {
  try {
    //const cartParams = await deleteProdToCart(req.params.cid, req.params.pid);
    return res.status(200).json(cartParams);
  } catch (error) {
    if (error.tipo == 404) {
      res.status(404).json({ error: error.data });
    } else {
      res.status(500).json({ error: "Error al obtener un productos" });
    }
  }
});

// deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    //const cartParams = await deleteProdToCart(req.params.cid, req.params.pid);
    return res.status(200).json(cartParams);
  } catch (error) {
    if (error.tipo == 404) {
      res.status(404).json({ error: error.data });
    } else {
      res.status(500).json({ error: "Error al obtener un productos" });
    }
  }
});

// deberá eliminar todos los productos del carrito
router.delete("/:cid", emptyCart_controller);

module.exports = router;
