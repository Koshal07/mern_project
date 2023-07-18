const jwt = require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcryptjs');
const router = express.Router();
const authenticate =require('../middleware/authenticate');
const cookieParser = require("cookie-parser");
const cors=require('cors');


router.use(cors());
router.use(cookieParser());

require("../db/conn");
const User=require('../model/userSchema');

router.get('/', (req,res)=>{
    res.send("Helloooooooooooo world this is about page from router ");
});





//Using Promises

// router.post('/register', (req,res)=>{
//     console.log("checking register ");
//     console.log("checking register ");
//     const { name, email,phone ,work,password,cpassword}=req.body;
//     if(!name || !email|| !phone || !work || !password || !cpassword )
//     {
//             return res.status(422).json({error:"pls fill all details"});
//     }

//     User.findOne({email:email})
//         .then((userExits)=>{
//             if(userExits){
//                 return res.status(422).json({error:"User already exists"});
//             }
//             const user=new User({name, email,phone ,work,password,cpassword});
//             user.save().then(()=>{
//                 res.status(201).json({message:"User registerd Succussfully"});
//             }).catch((err)=>{
//                 res.status(500).json({error:"Filed to Register"});
//             })

//         }).catch(err =>{ console.log(err);});
// });

// async Await

router.get('/register', async  (req,res)=>{
    res.send("working");
})
router.post('/register', async  (req,res)=>{
    console.log("checking register ");
    const { name, email , phone , work , password , cpassword } = req.body;
    if(!name || !email|| !phone || !work || !password || !cpassword )
    {
            return res.status(422).json({error:"pls fill all details"});
    }

    try{

        const userExits = await User.findOne({email:email});

        if(userExits){
            return res.status(422).json({error:"User already exists"});
        }else if(password != cpassword){
            return res.status(422).json({error:"Password not matching"});
        }else{
            const user = new User({name, email,phone ,work,password,cpassword});
            const userRegister = user.save();
            if(userRegister)
            {
               
                res.status(200).json({message:"User registerd Succussfully"});
                console.log("checking register inside");
            }else{
                res.status(500).json({error:"Filed to Register"});
            }
        }

    } catch(err){
        console.log(err);
    }
});

//Login Route

router.post('/signin', async (req,res)=>{
    
    try{
        let token;
        const {email , password }=req.body;
        if(!email || !password)
        {
            res.status(400).json({error:"pls filled the data"});
        }

        const userLogin= await User.findOne({email:email});
        

        if(userLogin){
            const isMatch= await bcrypt.compare(password,userLogin.password);
             token = await userLogin.generateAuthToken(); //Return a promise Genrating token
            console.log(token);

            res.cookie("jwtoken",token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch)
            {
                res.status(400).json({error:"Error in Signin"});
            }else{
                res.json({message:"User Signin Succussfully"});
            }
        }else{
            res.status(400).json({error:"Error in Signin outside "});
        }

      
        

    }catch(err){
        console.log(err);
    }
})

//About us page
router.get('/about',authenticate, (req,res)=>{
    console.log("Hello world this is about page from app.js ");
    res.send(req.rootUser);
    
})

//get user data for conatct and home page
router.get('/getdata',authenticate, (req,res)=>{
    console.log("Hello world this is getdata page from app.js ");
    res.send(req.rootUser);
    
})

//contact us page

router.post('/contact', authenticate, async (req,res)=>{
    //res.cookie("Test",'Koshal');    
    // res.send("Hello world this is contact page ");
    try{

    const {name,email,phone,message} = req.body;
    if(!name || !email || !phone || !message)
    {
        console.log('Error in contact form');
        return res.json({error:"pls fill the contact form"})
    }
    console.log("checking conatcg");
  
    
    
    const userContact= await User.findOne({email:email});
    console.log(userContact);
    if(userContact){
        console.log("inside udercontact");

        const userMessage = await userContact.addMessage(name,email,phone,message);

        await userContact.save();

        res.status(201).json({message:'User Contact Successfull'});

    }
    console.log("outside uif")

    }catch(error){
        console.log(error)
    }
    
})

//Logout page
router.get('/logout', (req,res)=>{
    console.log("Hello this is logout page ");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
    
})


module.exports=router;