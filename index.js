const express = require('express');
require('dotenv').config();

const connectToDB = require('./config/database');
const errorHandle = require('./middlewares/errorHandle');
const route = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

connectToDB();

app.use(express.json());

route(app);

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandle);
}

// if (process.env.NODE_ENV === 'production') {
// }

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Running server on port ${port}`);
});
