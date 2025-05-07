const express=require('express')
const expanseController=require('../controller/expanse')

const router=express.Router()

router.get('/',expanseController.getExpansePage)

router.post('/postExpanse',expanseController.postExapanse)

module.exports=router