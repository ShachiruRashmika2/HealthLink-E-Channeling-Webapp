const express = require('express')
const router = express.Router()
const stripe=require("stripe")('sk_test_51Q9m2dHdULr6E8sS3e0FsMc14wX7em08EAvyp0TR3PKZ674Rz4IpgT1erdF0gSHWyY8fBm5axi9W4iUt6PoMvNUa00hteN8qfS');

router.post('/cardPay',async (req,res)=>{


    const product= await stripe.products.create({
name:'sdf'

    });

    if(cPay){
        var session=await stripe.checkout.sessions.create({

            line_items:[{
                price:'2000',
                quantity:2

         } ],
            mode:'payment',
            success_url:'http://localhost:3000/patient/appointments',
            cancel_url:'http://localhost:3000/patient/appointments'
        })
    }
})

module.exports = router;