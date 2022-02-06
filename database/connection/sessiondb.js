const mongoose = require("mongoose");

const connect = mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Sucessfully connected to the Database.");
    })
    .catch((err) => {
        console.log(err);
    });
mongoose.set("useCreateIndex", true);

module.exports = connect;