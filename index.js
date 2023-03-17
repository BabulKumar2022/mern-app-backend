const express = require("express");
const app = express();
require("./db/config");
const User = require('./db/User');
const dotenv = require("dotenv");
const cors = require("cors");
// const url = "mongodb://127.0.0.1:27017/DB_DB";
const port =5000; 
dotenv.config();  
app.use(cors());
app.use(express.json());


// const connectDB = async () =>  {
//     mongoose.connect("mongodb://127.0.0.1:27017/DB_DB");
//     const productSchema = new  mongoose.Schema({});
//     const product = mongoose.model("products", productSchema);
//     const data = await product.find();
//     console.log(data);  
// }
// connectDB();    

// mongoose.connect(url, {})
// .then(result => console.log(" DB is connected"))
// .catch(err =>{console.log(err)});


app.post("/users",  async (req, res) =>{
        let user = new User(req.body);
        let result = await user.save()
    res.send(result);
});




app.get("/", (req, res)=>{
    res.send("Backend is successfully running");
})



    
app.listen(port, ()=>{
    console.log('Backend server is running on port ' +  port );
});
 