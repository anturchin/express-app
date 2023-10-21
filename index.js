const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.status(200);
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
	res.status(200);
	res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
