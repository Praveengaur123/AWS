const express=require('express')

const signupController=require('../controller/signup')

const router=express.Router()

router.get('/',signupController.getsignUp)

router.post('/user',signupController.SingupData)

module.exports=router