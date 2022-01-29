const Department = require('../models/departments')

const getDepartmentList = async (req, res) => {
    try {
        const departments = await Department.find().select('name dep_name')
        res.send(departments)
    } catch (e) {
        return res.status(400).json({
            status: 0,
            msg: e.message,
        })
    }
}

const getSingleDepartment = async (req, res) => {
    const { dep_id } = req.params

    if (!dep_id) {
        return res.status(400).json({
            status: 0,
            msg: 'provide all department id',
        })
    }

    try {
        const department = await Department.findById(dep_id)
        if (!department) {
            return res.status(400).json({
                status: 0,
                msg: 'data not found',
            })
        }

        res.json(department)
    } catch (e) {
        return res.status(400).json({
            status: 0,
            msg: e.message,
        })
    }
}

module.exports = {
    getDepartmentList,
    getSingleDepartment,
}
