const mongoose = require("mongoose");


const product2Schema = new  mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    ac: String,
    company: String
});


module.exports = mongoose.model("products2", product2Schema);