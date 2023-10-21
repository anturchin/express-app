const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
	res.status(200);
	res.render('feedback', {
		title: 'feedback',
		isFeedback: true,
	});
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.redirect('/');
})

module.exports = router;