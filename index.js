const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const feedbackRoutes = require('./routes/feedback');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/feedback', feedbackRoutes);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
