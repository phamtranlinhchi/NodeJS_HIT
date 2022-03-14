const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');

const app = express();
const port = 3000;

mongoose
    .connect('mongodb://localhost:27017/web-course')
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

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
