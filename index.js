const express = require("express");
const app = express();
require("./db/config");
const User = require('./db/User');
const Product = require('./db/Product')
const dotenv = require("dotenv");
const cors = require("cors");
const Products2 = require("./db/Products2");
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


app.post("/addProduct2", async(req, res)=>{

    let product = new Products2(req.body);
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
});



// get all products2
app.get("/products2", async (req, res) =>{
    const products2 = await Products2.find();
    if(products2.length > 0){
        res.send(products2);
    }else{
        res.send({result: "No product found"})
    }
});

  

// Delete product API
app.delete("/products/:id", async (req, res)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
});

// Delete product2 API
app.delete("/products2/:id", async (req, res)=>{
    let result = await Products2.deleteOne({_id:req.params.id})
    res.send(result);
});



// get single product for update
app.get("/products/:id", async (req, res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({"result": "No record found"});
    }
    
});

// update product
app.put("/products/:id", async (req, res)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    res.send(result)
});

  
// search by key

app.get("/search/:key", async (req, res)=>{
    let result = await Product.find({
        "$or":[
            {
                ac: {$regex: req.params.key}
            }
        ]
    }); 
    res.send(result);
});

  

app.get("/", (req, res)=>{
    res.send("Backend is successfully running");
})



    
app.listen(port, ()=>{
    console.log('Backend server is running on port ' +  port );
});
 