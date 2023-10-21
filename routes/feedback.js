const { Router } = require("express");
const FeedBack = require('../models/feedback');
const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('feedback', {
		title: 'feedback',
		isFeedback: true,
	});
});

router.post('/', async (req, res) => {
	const { name, phone, email, text } = req.body;
	const feedback = new FeedBack(name, phone, email, text)
	await feedback.save();
	res.redirect('/');
})

module.exports = router;