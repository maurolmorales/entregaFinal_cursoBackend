const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
} = require("../controllers/product-controller.js");
// const { createProduct } = require("../managers/product-manager.js");


router.get("/", getAllProducts);

router.get("/:pid", getOneProduct);

router.post("/", createProduct);

router.delete("/:pid", deleteOneProduct);

router.patch("/:pid", updateOneProduct);
 

module.exports = router;
