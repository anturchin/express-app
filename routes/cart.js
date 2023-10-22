const { Router } = require('express');
const booksList = require('../data/books.json');
const Cart = require('../models/cart');

const router = Router();

router.get('/', async (req, res) => {
	const cart = await Cart.fetch();
	res.render('cart', {
		title: 'cart',
		isCart: true,
		books: cart.books,
		price: cart.price,
	});
});

router.post('/add', async (req, res) => {
	const { id } = req.body;
	const book = booksList.find(book => book.id == id);
	await Cart.add(book);
	res.redirect('/cart');
})

router.delete('/remove/:id', async (req, res) => {
	const cart = await Cart.remove(req.params.id);
	res.status(200).json(cart);
})



module.exports = router;