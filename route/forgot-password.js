const express=require('express')

const router=express.Router()
const forgotPasswordController=require('../controller/forgot-password')

//getting forgot password page
router.get('/forgot-password',forgotPasswordController.getForgotPasswordPage)

// getting password link
router.post('/forgot-password',forgotPasswordController.getPasswordLink)

// getting reset password form
router.get(`/password/resetpassword/:id`,forgotPasswordController.getResetForm)

// updating password
router.post('/password/updatedPassword/:uuid',forgotPasswordController.updatePassword)

module.exports=router