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



// user post API

app.post("/users",  async (req, res) =>{
        let user = new User(req.body);
        let result = await user.save()
    res.send(result); 
    
});

//user login
app.post("/login", async(req, res) =>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body);
        if(user){
            res.send(user);
        }else{
            res.send({result:"wrong user or password "});
        }
       
    }else{
        res.send({result:"wrong user or password "});
    }
   
   
})


app.get("/", (req, res)=>{
    res.send("Backend is successfully running");
})



    
app.listen(port, ()=>{
    console.log('Backend server is running on port ' +  port );
});
 