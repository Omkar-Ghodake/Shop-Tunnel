const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// // API for adding new product
// router.post('/products/add-products', async (req, res) => {
// 	let success = false;
// 	try {
// 		const { title, price, imgUrl } = req.body;

// 		const product = new Product({
// 			title, price, imgUrl
// 		});
// 		product.save();

// 		success = true
// 		res.json({ success, product });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not add the product. Internal Server Error.' });
// 	}
// });

// // API for fetching all products
// router.get('/products/fetch-all-products', async (req, res) => {
// 	let success = false;
// 	try {
// 		const products = await Product.find({});

// 		if (products) {
// 			success = true;
// 			res.json({ success, products });
// 		} else {
// 			res.status(400).json({ success, error: 'Cannot fetch product. Product not found.' })
// 		}

// 	} catch (error) {
// 		res.status(500).json({ error: 'Cannot fetch product. Internal Server Error' });
// 	}
// });

// // API for deleting a product
// router.delete('/admin/products/delete-product', async (req, res) => {
// 	let success = false;
// 	try {
// 		const deletedProduct = await Product.findOneAndDelete({ title: req.body.title });
// 		if (deletedProduct) {
// 			success = true;
// 			res.json({ success, deletedProduct });
// 		} else {
// 			res.status(400).json({ success, error: 'Unable to delete product. Product not found.' });
// 		}
// 	} catch (error) {
// 		res.json({ error: 'Unable to delete product. Internal Server Error.' })
// 	}
// });

// // API for updating a product
// router.put('/admin/products/edit-product/', async (req, res) => {
// 	let success = false;
// 	try {
// 		const { title, price, imgUrl } = req.body;

// 		const newProduct = {};
// 		if (title) { newProduct.title = title }
// 		if (price) { newProduct.price = price }
// 		if (imgUrl) { newProduct.imgUrl = imgUrl }

// 		let updatedProduct = await Product.findByIdAndUpdate(req.body.id, { $set: newProduct }, { new: true });

// 		success = true;
// 		res.json({ success, updatedProduct });
// 	} catch (error) {
// 		res.status(40).json({ success, error: 'Unable to update product. Internal Serverl error.' });
// 	}
// });

module.exports = router;
