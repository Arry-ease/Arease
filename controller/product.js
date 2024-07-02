const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log("addddddddddddddddddd");
  res.render("add-product", {
    pageTitle: "title",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postAddProduct = (req, res, next) => {
  // console.log("hii");
  // console.log(req.body);

  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",

      path: "/",
    });
  });
};
