const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(cors());

app.get('/', (req, res) => {
	res.status(200);
	res.render('index');
});

app.get('/about', (req, res) => {
	res.status(200);
	res.render('about');
});


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
