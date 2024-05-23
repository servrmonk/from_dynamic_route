const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);


router.get('/products/:productId',shopController.getProduct)

router.get('/cart', shopController.getCart);
// for post request
router.post('/cart',shopController.postCart); //and new controller in shop.js

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
