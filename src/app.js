const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require("path");
const exphbs = require("express-handlebars");
const { createServer } = require("http");
const { Server } = require("socket.io");
const routes = require("./routes/index.js");
const methodOverride = require("method-override");
const routerView = require("./routes/view.router.js");
const {
  getAllProducts,
  saveProduct,
  deleteOneProduct,
} = require("./services/product.service.js");
require('dotenv').config();

/*----------------------------------------------------------------------- */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{console.log('MONGO connected')})
  .catch((error)=>{console.error(error)})


/*---- handlebars ------------------------------------------------------------------- */
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

/*----------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/*----------------------------------------------------------------------- */
app.use(methodOverride("_method"));

/*---- socket conección ----------------------------------------------------------------- */
io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  const socketProducts = await getAllProducts();
  socket.emit("allProducts", socketProducts);

  socket.on("nuevoProducto", (data) => { saveProduct(data) });

  socket.on("deleteProduct", async (data) => { await deleteOneProduct(data) });
});



/*----------------------------------------------------------------------- */
// app.use("/api", routes);
app.use("/", routes);


/*----------------------------------------------------------------------- */
module.exports = { httpServer };
