const path = require('path');
const fs = require('fs');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cart.json'
)

class Cart {

	static async add(book) {
		const cart = await Cart.fetch();
		const index = cart.books.findIndex(b => b.id === book.id);
		const candidate = cart.books[index];

		if (candidate) {
			candidate.count += 1;
			cart.books[index] = candidate;
		} else {
			book.count = 1;
			cart.books.push(book);
		}

		cart.price += +book.price;
		return new Promise((res, rej) => {
			fs.writeFile(p, JSON.stringify(cart), err => {
				if (err) {
					rej(err);
				} else {
					res();
				}
			})
		})
	}

	static async remove(id) {
		const cart = await Cart.fetch();
		const index = cart.books.findIndex(book => book.id == id);
		const book = cart.books[index];
		if (book.count === 1) {
			cart.books = cart.books.filter(book => book.id != id);
		} else {
			cart.books[index].count -= 1;
		}

		cart.price -= book.price;

		return new Promise((res, rej) => {
			fs.writeFile(p, JSON.stringify(cart), err => {
				if (err) {
					rej(err);
				} else {
					res(cart);
				}
			})
		})
	}

	static async fetch() {
		return new Promise((res, rej) => {
			fs.readFile(p, 'utf-8', (err, content) => {
				if (err) {
					rej(err);
				} else {
					res(JSON.parse(content));
				}
			})
		})
	}

}

module.exports = Cart;