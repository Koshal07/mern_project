const dotenv=require("dotenv");
const mongoose =require("mongoose");
const express=require("express");
const app=express();
const cors=require('cors');

dotenv.config({path : './config.env'});

require('./db/conn');


//const User=require('./model/userSchema');

app.use(express.json());

app.use(cors());


//we link router files to make our route easy
app.use(require('./router/auth'));



const PORT=process.env.PORT;


// This is middleware
// const middleware=(req,res,next)=>{
//     console.log("This is middleware");
//     next();
// }




app.get('/',(req,res)=>{
    res.send("Hello world");
    
})

// app.get('/about',(req,res)=>{
//     res.end("Hello world this is about page from app.js ");
    
// })

// app.get('/contact',(req,res)=>{
//     //res.cookie("Test",'Koshal');    
//     res.send("Hello world this is contact page ");
    
// })

app.get('/signin',(req,res)=>{
    res.send("Hello world this is signin page ");
    
})

app.get('/signup',(req,res)=>{
    res.send("Hello world this is signup page ");
    
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})