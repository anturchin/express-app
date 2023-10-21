const { Router } = require('express');
const booksData = require('../data/books.json');
const router = Router();

router.get('/', (req, res) => {

	const booksList = booksData;

	res.render('books-store', {
		title: 'books-store',
		isBooks: true,
		booksList,

	})
})

module.exports = router;