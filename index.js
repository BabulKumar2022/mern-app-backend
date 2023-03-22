const express = require("express");
const app = express();
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product')
const dotenv = require("dotenv");
const cors = require("cors");
// const url = "mongodb://127.0.0.1:27017/DB_DB";
const port =5000; 

dotenv.config();  
app.use(cors());
app.use(express.json());



// user post API

app.post("/users",  async (req, res) =>{
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password
    res.send(result); 
    
});

//user login 
app.post("/login", async(req, res) =>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            res.send(user);
        }else{
            res.send({result:"wrong user or password "});
        }
       
    }else{
        res.send({result:"user not found "});
    }
   
   
});

// add product

app.post("/addProduct", async(req, res)=>{

    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});
// get all products
app.get("/products", async (req, res) =>{
    const products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result: "No product found"})
    }
})


app.get("/", (req, res)=>{
    res.send("Backend is successfully running");
})



    
app.listen(port, ()=>{
    console.log('Backend server is running on port ' +  port );
});
 