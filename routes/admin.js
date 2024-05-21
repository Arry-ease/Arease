const express = require("express");
const router = express.Router();

router.get("add-product", (req, res, next) => {
  console.log("addddddddddddddddddd");
  res
    .status(200)
    .send(
      `<form action="/admin/product", method="POST"><input type="text" name="title"><button type="submit">SUBMIT</button></form>`
    );
});
router.post("add-roduct", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
