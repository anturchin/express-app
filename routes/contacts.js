const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('contacts', {
		title: 'contacts',
		isContacts: true,
	});
});

module.exports = router;