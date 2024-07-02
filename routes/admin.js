const path = require("path");
const express = require("express");
const productControllers = require("../controller/product.js");
const router = express.Router();
const rootDir = require("../util/path");

router.get("/add-product", productControllers.getAddProduct);
router.post("/add-product", productControllers.postAddProduct);

module.exports = router;
