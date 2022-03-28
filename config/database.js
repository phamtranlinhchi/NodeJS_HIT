const mongoose = require('mongoose');

async function connectToDB() {
    await mongoose
        .connect(process.env.MONGODB || 'mongodb://localhost:27017/web-course')
        .then(() => {
            console.log('connected to database');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

module.exports = connectToDB;
