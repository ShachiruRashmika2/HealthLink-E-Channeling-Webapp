const express = require('express')
const router = express.Router()
const { createAppointment, getUserAppointments, deleteAppointment, updateAppointment } = require('../controllers/appointmentController');

router.post('/add', createAppointment);

router.get('/get/:userId', getUserAppointments);

router.delete('/delete/:appointmentId', deleteAppointment);

router.put('/update/:appointmentId', updateAppointment)

module.exports = router