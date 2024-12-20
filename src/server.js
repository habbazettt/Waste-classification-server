const express = require('express');
const cors = require("cors");
require('dotenv').config()
const cookieParser = require('cookie-parser');
const logRequest = require('./middleware/log');
const wasteRoute = require('./routes/waste.routes');

const app = express()

app.use(cors({
    origin: ['*'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logRequest)

app.get('/', (req, res) => res.send('Server is running!'))

app.use('/predict', wasteRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})