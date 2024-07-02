const express = require("express");
const router = express.Router();
const productsController = require('../controller/product.js')


router.get("/",productsController.getProducts );
module.exports = router;
