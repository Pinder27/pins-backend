const router = require('express').Router();
const Pin = require('../models/Pin');

router.post("/",async (req,res)=>{
    const newPin = Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(e){
        res.staus(500).send(e);
    }
})
router.get("/:username",async (req,res)=>{
      //console.log(req.params);
    try{
        const pins = await Pin.find({username:req.params.username});
        res.status(200).send(pins);
    }catch(e){
        res.status(500).send(e);
    }
})
router.post("/delete",async(req,res)=>{
    try{
        console.log(req.body);
         await Pin.findOneAndDelete({lat:req.body.lat,lng:req.body.lng});
         res.status(200).send('pin deleted');
         console.log('router fn2');
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;
