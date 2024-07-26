const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      // console.log(products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: [],
        isAuthenticated: req.isLoggedIn,
      });
    }
    // console.log(cart.items);

    const products = cart.items.map((item) => {
      return {
        productId: item?.productId?._id,
        title: item?.productId?.title,
        price: item?.productId?.price,
        quantity: item?.quantity,
      };
    });
    // console.log("holaaa---");
    // console.log(products);

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.status(404).send("Product not found");
      }
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      products: cart.items.map((item) => ({
        product: { ...item.productId._doc },
        quantity: item.quantity,
      })),
    });

    await order.save();

    await req.user.clearCart();

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };
