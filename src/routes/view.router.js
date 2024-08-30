const express = require("express");
const routerView = express.Router();

// routerView.get("/products", async (req, res) => {
//   const products = await getAllProducts();
//   res.render("products", { title: "Lista de Productos", products });
// }); 

// routerView.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts", { title: "RealTimeProducts" });
// });

routerView.get("/", (req, res) => {
  res.render("index");
});

routerView.get("*", (req, res) => {
  res.status(404).render("notFound");
});
module.exports = routerView;
