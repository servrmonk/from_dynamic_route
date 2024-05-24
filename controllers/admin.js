const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product", //path will reamin same
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price); //null for product constructor
  product.save();
  res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //if thereis edit in the query parameter thani will catch other wise no, the extracted value is always is a string so true instead of true means false
  if (!editMode) {
    return res.redirect("/");
  }
  console.log("Edit mode is undefined so it will redirect to /", editMode);
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product", //path will reamin same
      editing: editMode, //check that true or not if true than add
      product: product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  // fetch infor for the product and than i need to create new product instanse and populate with that information, and than i need to call save
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  console.log("Updated product in admin.js ", updatedProduct);

  updatedProduct.save(); //save and overwrite the existing one
  res.redirect("/admin/products");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
