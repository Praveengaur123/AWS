const express=require('express')

const loginController=require('../controller/login')

const router=express.Router()

router.get('/',loginController.getLoginPage)

router.post('/',loginController.Login)

module.exports=router