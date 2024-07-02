const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const errorController = require("./controller/404.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "viewsfolder"); //we don't need here cause we have the view folder here
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.errorPage);

app.listen(3000, () => console.log("server is running on port 3000"));
