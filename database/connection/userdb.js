//MongoDB connection
const mongoose = require("mongoose");

const connect =
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to the Database.");
        })
        .catch(err => {
            console.log(err);
        });

module.exports = connect;