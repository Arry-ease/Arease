const path = require("path");
const express = require("express");
const adminControllers = require("../controller/admin.js");
const router = express.Router();
const rootDir = require("../util/path");

router.get("/add-product", adminControllers.getAddProduct);

router.get("/products", adminControllers.getProducts);

router.post("/add-product", adminControllers.postAddProduct);

module.exports = router;
