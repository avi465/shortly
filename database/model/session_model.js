const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore(
    {
        uri: process.env.MONGODB_URL,
        collection: "mySessions",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        },
    },
    function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Connected to the Session Database");
        }
    }
);

store.on("error", function (error) {
    console.log(error);
});


module.exports = store;