require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")


const hospitalRoutes = require('./routes/hospitalRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const paymentRoutes=require('./routes/paymentRouter')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors());

app.use('/hospital',hospitalRoutes)
app.use('/doctor',doctorRoutes)
app.use('/appointment',appointmentRoutes)
app.use('/card',paymentRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })