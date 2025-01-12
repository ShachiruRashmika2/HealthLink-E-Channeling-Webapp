const express = require('express');
const router = express.Router();
const { addDoctor, getDoctors, getDoctorById, deleteDoctor } = require('../controllers/doctorController');


router.post('/add', addDoctor);

router.get('/get', getDoctors);

router.get('/get/:id', getDoctorById);

router.delete('/delete/:id', deleteDoctor);

module.exports = router;
