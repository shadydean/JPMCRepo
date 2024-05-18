const express = require('express');
const routes = express.Router();
routes.use(express.json())
const studentModel = require('../models/student.model');
var f = require('../controllers/student.controllers')
routes.post('/',f.postValue)
routes.get('/',f.getValue)
routes.get('/:id', f.getValueById)
routes.put('/:id',f.modifyById)
routes.delete('/:id',f.deleteValueById)


module.exports = routes