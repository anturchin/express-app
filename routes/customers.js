const { Router } = require('express');
const Customers = require('../models/customers');
const router = Router();

router.get('/', async (req, res) => {
	const customerList = await Customers.getAll();
	res.status(200);
	res.render('customers', {
		title: 'customers',
		isCustomers: true,
		customerList,
	});
})

router.post('/', async (req, res) => {
	const { name, phone, email, text } = req.body;
	const customer = new Customers(name, phone, email, text)
	await customer.save();
	res.redirect('/customers');
})

router.post('/edit', async (req, res) => {
	const { name, phone, email, text, id } = req.body;
	await Customers.update(name, phone, email, text, id);
	res.redirect('/customers');
})

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, phone, email, text } = await Customers.getByID(id);
	res.render('customer', {
		// layout: 'empty', 
		title: `customer: ${name}`,
		name: `name: ${name}`,
		phone: `phone: ${phone}`,
		email: `email: ${email}`,
		text: text,
	});
})

router.get('/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/');
	}
	const { id } = req.params;
	const { name, phone, email, text, id: customerID } = await Customers.getByID(id);

	res.render('customer-edit', {
		title: name,
		name,
		phone,
		email,
		text,
		customerID,
	})
})

module.exports = router;