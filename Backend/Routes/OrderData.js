const express=require('express')
const router=express.Router()
const Order=require('../models/Orders')
const axios = require('axios')

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId=await Order.findOne({'email':req.body.email})
    if(eId===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        }catch(err){
            console.log(err.message)
            res.send("Server Error ",err.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
        }
        catch(err){
            res.json("Server Error",err.message)
        }
    }
})


router.post('/myOrderData',async(req,res)=>{
    try{
        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    } catch(err){
        res.send("Server Error",err.message)
    }
})


router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        // console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                let response = res.data.results[0].components;
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + '('+postcode+')')
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
module.exports=router;