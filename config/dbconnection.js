const mongoose = require("mongoose");
mongoose.Promise = requier("bluebird");
const url = "mongodb+srv://admin:admin@cluster0-u7zcd.mongodb.net/test?retryWrites=true&w=majority";
const connect = mongoose.connect(url, { useNewUrlParser: true });
module.exports = connect;