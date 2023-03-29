const mongoose = require("mongoose");


const productSchema = new  mongoose.Schema({
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
    pfValue: String
});
 

module.exports = mongoose.model("products", productSchema);