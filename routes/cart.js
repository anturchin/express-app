const { Router } = require('express');
const booksList = require('../data/books.json');
const Cart = require('../models/cart');

const router = Router();

router.get('/', async (req, res) => {
	const cart = await Cart.fetch();
	res.render('cart', {
		title: 'cart',
		cart,
	});
});

router.post('/add', async (req, res) => {
	const { id } = req.body;
	const book = booksList.find(book => book.id === id);
	await Cart.add(book);
	res.redirect('/cart');
})



module.exports = router;