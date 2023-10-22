const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/home');
const customersRoutes = require('./routes/customers');
const aboutRoutes = require('./routes/about');
const customerRoutes = require('./routes/add-customer');
const booksRoutes = require('./routes/books-store');
const cartRoutes = require('./routes/cart');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRoutes);
app.use('/customers', customersRoutes);
app.use('/about', aboutRoutes);
app.use('/add-customer', customerRoutes);
app.use('/books-store', booksRoutes);
app.use('/cart', cartRoutes);


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
