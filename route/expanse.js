const express=require('express')
const expanseController=require('../controller/expanse')

const userAuthenticate=require('../middleware/auth')

const router=express.Router()

router.get('/expanse',expanseController.getExpansePage)

router.get('/getExpanse',userAuthenticate.authenticate,expanseController.getExpanse)

router.post('/postExpanse',userAuthenticate.authenticate,expanseController.postExapanse)

router.delete(`/deleteExpanse/:id`,userAuthenticate.authenticate,expanseController.deleteExpanse)

module.exports=router