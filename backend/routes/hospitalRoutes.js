const express = require('express')
const {
    createHospital,
    getHospitals,
    deleteHospital,
    updateHospital
} = require('../controllers/hospitalController')

const router = express.Router()


router.post('/add', createHospital);

router.get('/get', getHospitals);

router.delete('/delete/:id', deleteHospital);

router.put('/update/:id', updateHospital);



module.exports = router