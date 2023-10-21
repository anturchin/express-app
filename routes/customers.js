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

module.exports = router;