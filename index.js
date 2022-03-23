const express = require('express');
const mongoose = require('mongoose');
const errorHandle = require('./middlewares/errorHandle');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const urlRouter = require('./routes/urlRouter');

const app = express();
const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGODB || 'mongodb://localhost:27017/web-course')
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err.message);
    });

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect();
// }

app.use(express.json());

app.use('/users', userRouter);

app.use('/urls', urlRouter);

app.use(errorHandle);

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
