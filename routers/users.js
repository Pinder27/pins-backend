const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post("/register", async(req,res)=>{
    const user_ = await User.findOne({username:req.body.username})
    const email_ = await User.findOne({email:req.body.email})
    if(user_) return res.status(400).send('user already exist');
    if(email_) return res.status(400).send('email already registered');
    




    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try{
        const user = User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword
        })
         
        await user.save();
        res.status(200).send(user);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user) {
           return res.status(400).send('no user found');
        }
        const match  = await bcrypt.compare(req.body.password, user.password);
        console.log(match);
        if(!match) {
            return res.status(400).send('invalid credentials');
        }
        res.status(200).send(user._id);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

module.exports =  router;