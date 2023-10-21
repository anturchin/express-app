const { Router } = require("express");
const Customers = require('../models/customers');
const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('add-customer', {
		title: 'add-customer',
		isAddCustomer: true,
	});
});

module.exports = router;