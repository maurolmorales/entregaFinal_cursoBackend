const mongoose = require("mongoose");
const productCollection = "producto";

const prodSchema = new mongoose.Schema({});

module.exports = mongoose.model(productCollection, prodSchema);
