const express=require('express')

const router=express.Router()

const paymentController=require('../controller/payment')

const userAuthenticate=require('../middleware/auth')

router.post('/pay',userAuthenticate.authenticate,paymentController.processPayment)

router.get('/payment-status/:orderId',userAuthenticate.authenticate,paymentController.getPayStatus)

module.exports=router