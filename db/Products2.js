const mongoose = require("mongoose");


const product2Schema = new  mongoose.Schema({
    name: String,
    fatherName: String,
    village: String,
    post: String,
    upozila: String,
    zila: String,
    isuDate: String,
    meserDate: String,
    lastDate: String,
    userId: String,
    ac: String,
    pfValue: Number
});


module.exports = mongoose.model("products2", product2Schema);