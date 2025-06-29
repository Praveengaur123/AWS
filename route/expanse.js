const express=require('express')
const expanseController=require('../controller/expanse')

const userAuthenticate=require('../middleware/auth')

const router=express.Router()

router.get('/expanse',expanseController.getExpansePage)

router.get('/getExpanse',userAuthenticate.authenticate,expanseController.getExpanse)

router.post('/postExpanse',userAuthenticate.authenticate,expanseController.postExapanse)

router.get('/download',userAuthenticate.authenticate,expanseController.downloadReport)

router.delete(`/deleteExpanse/:id`,userAuthenticate.authenticate,expanseController.deleteExpanse)

router.get('/logOut',expanseController.logOut)

module.exports=router