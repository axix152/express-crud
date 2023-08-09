const express = require('express')

const userController = require('../controller/user')

const router = express.Router()

router.post('/', userController.create)
router.get('/', userController.findAll)
router.get('/findOne', userController.findOne)
router.patch('/:id',userController.update)
router.delete('/:id', userController.delete)


module.exports = router