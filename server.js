const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome to Food Server </h1>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server started!');
});