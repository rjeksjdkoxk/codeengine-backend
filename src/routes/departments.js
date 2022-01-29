const express = require('express')
const router = express.Router()
const departmentController = require('../controllers/departments')

router.get('/all', departmentController.getDepartmentList)

router.get('/:dep_id', departmentController.getSingleDepartment)

module.exports = router
