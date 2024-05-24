const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json"); //change product.json to cart.json

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetch the previous cart from the file
    // analyze the cart => find existing product
    //add new product increase quantity

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; //initial cart
      if (!err) {
        // cart = JSON.parse(fileContent);
        if (fileContent.length > 0) {
          try {
            cart = JSON.parse(fileContent);
          } catch (parseError) {
            console.error("Error parsing JSON from cart file:", parseError);
            return;
          }
        }
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      //create new product
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 }; //if existing prod is not present
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("Errr = >", err);
      });
    });
  }
  static deleteProduct(id,productPrice){
    fs.readFile(p,(err,fileContent)=>{
      if(err){
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id); 
      const productQty = product.qty;
      
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log("Errr = >", err);
      });
    })
  }
};
