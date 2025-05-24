const express=require('express')

const router=express.Router()

const paymentController=require('../controller/payment')

const userAuthenticate=require('../middleware/auth')

router.post('/pay',paymentController.processPayment)

router.get('/payment-status/:paymentSessionId',userAuthenticate.authenticate,paymentController.getPaymentStatus)

module.exports=router