const express = require("express");
const router = express.Router();
const {
  getAllProducts_controller,
  createProduct_controller,
  getOneProduct_controller,
  deleteOneProduct_controller,
  updateOneProduct_controller,
} = require("../controllers/product-controller.js");

router.get("/", getAllProducts_controller);

router.get("/:pid", getOneProduct_controller);

router.post("/", createProduct_controller);

router.delete("/:pid", deleteOneProduct_controller);

router.patch("/:pid", updateOneProduct_controller);

module.exports = router;
