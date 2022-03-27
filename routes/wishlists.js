const express = require('express');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');

const router = express.Router();

// // API for creating wishlist
// router.post('/create-wishlist', async (req, res) => {
// 	try {
// 		const { title } = req.body;

// 		const wishlist = new Wishlist({
// 			title: title
// 		});

// 		wishlist.save();

// 		res.json(wishlist);
// 	} catch (error) {
// 		res.status(500).json({ error: 'Could not create a wishlist. Internal Server Error.' })
// 	}
// })

// // API for fetching all wishlists
// router.get('/wishlists', async (req, res) => {
// 	try {
// 		const wishlists = await Wishlist.find({}).populate({ path: 'products', model: 'Product' }).exec();
// 		res.json({ wishlists });
// 	} catch (error) {
// 		res.status(400).json({ error: 'Could not find wishlist.' })
// 	}
// })

// // API for adding products to a specific wishlist
// router.put('/wishlist/add-product', async (req, res) => {
// 	try {
// 		const { productId, wishlistId } = req.body;
// 		const productToAdd = await Product.findOne({ _id: productId });

// 		const updatedWishlist = await Wishlist.findByIdAndUpdate(
// 			wishlistId, {
// 			$addToSet: {
// 				products: productToAdd._id
// 			}
// 		})

// 		res.send(updatedWishlist);

// 	} catch (error) {
// 		res.status(500).json({ error: 'Product not added. "Internal Server Error."' });
// 	}
// });

// // API for removing product from specific wishlist
// router.delete('/wishlist/remove-product', async (req, res) => {
// 	try {
// 		const { productId, wishlistId } = req.body;

		

// 	} catch (error) {

// 	}
// });

// // API for deleting wishlist
// router.delete('/wishlist/delete-wishlist', async (req, res) => {
// 	let success = false;
// 	try {
// 		const deletedWishlist = await Wishlist.findByIdAndDelete(req.body.id);

// 		if (deletedWishlist) {
// 			success = true;
// 			res.json({ success, deletedWishlist });
// 		} else {
// 			res.status(500).json({ success, error: 'Cannot find wishlist.' });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ success, error: 'Cannot delete wishlist. Internal Server Error.' });
// 	}
// });

module.exports = router;