const express=require('express')

const router=express.Router()
const forgotPasswordController=require('../controller/forgot-password')

router.get('/forgot-password',forgotPasswordController.getForgotPasswordPage)

router.post('/forgot-password',forgotPasswordController.getPassword)

module.exports=router