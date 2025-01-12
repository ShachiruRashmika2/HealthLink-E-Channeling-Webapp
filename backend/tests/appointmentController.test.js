const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); 
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Hospital = require('../models/hospitalModel');
const appointmentRoutes = require('../routes/appointmentRoutes');

const app = express();
app.use(express.json());
app.use('/appointment', appointmentRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri); 
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


describe('Create Appointment', () => {
  
  let doctor, hospital,hospitalPrivate;

  beforeEach(async () => {
    await Appointment.deleteMany({});
    await Doctor.deleteMany({});
    await Hospital.deleteMany({});

    // Ensure that all required fields are populated
    doctor = new Doctor({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'Male',
      qualification: 'MBBS',
      yearsOfExperience: 5,
      licenseNumber: 'ABC123',
      speciality: 'Cardiology',
      address: '123 Main St',
      email: 'john.doe@example.com',
      nationalId: 'NID123456',
      contactNo: '1234567890',
      dateOfBirth: '1990-01-01',
      profImg:'https//:ewewe/ewwe/wewww',
      appoinmentFee:3200

    });

    // Include all required fields for Hospital
    hospital = new Hospital({
      name: 'General Hospital',
      type: 'Government', 
      phoneNumber: '123-456-7890', 
      address: '456 Elm St, City Center', 
      CoverImg:"dsfdsfdsf"
     
    });

    hospitalPrivate = new Hospital({
      name: 'Asiri Hospital',
      type: 'Private', 
      phoneNumber: '123-456-7890', 
      address: '456 Elm St, City Center', 
      CoverImg:"dsfdsfdsf",
      channelFee:2300
    });


    await doctor.save();
    await hospital.save();
    await hospitalPrivate.save();
  });

  afterEach(async () => {
    await Appointment.deleteMany({});
    await Doctor.deleteMany({});
    await Hospital.deleteMany({});

  });

//Free Channeling

  it('should create a new appointment successfully(Payment:Free Channeing)', async () => {
    const res = await request(app).post('/appointment/add').send({
      userId: 1,
      doctorId: doctor._id.toString(),
      hospitalId: hospital._id.toString(),
      date: '2024-10-07',
      time: '10:00 AM',
      payDetails:{ payStatus:'Free',amount:0}
      
      
      
    });



    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Appointment created successfully');
    expect(res.body.appointment).toHaveProperty('doctorId', doctor._id.toString());
    expect(res.body.appointment).toHaveProperty('hospitalId', hospital._id.toString());
    expect(res.body.appointment).toHaveProperty('date', new Date('2024-10-07').toISOString()); 
    expect(res.body.appointment).toHaveProperty('time', '10:00 AM');
    });


//Cash Payment

    it('should create a new appointment successfully(Payment:Cash)', async () => {
      const res = await request(app).post('/appointment/add').send({
        userId: 1,
        doctorId: doctor._id.toString(),
        hospitalId: hospital._id.toString(),
        date: '2024-10-07',
        time: '10:00 AM',
        payDetails:{ 
          paymentType:'cashPayment',
          amount:0, 
          paySlip:"Slip SLip",
          payeeName:"payeepayeepaye",
          payStatus:"Proceed To Validation",
          isValidated:false}

      });
  
      
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Appointment created successfully');
      expect(res.body.appointment).toHaveProperty('doctorId', doctor._id.toString());
      expect(res.body.appointment).toHaveProperty('hospitalId', hospital._id.toString());
      expect(res.body.appointment).toHaveProperty('date', new Date('2024-10-07').toISOString()); 
      expect(res.body.appointment).toHaveProperty('time', '10:00 AM');
      });

//Insuarance Claim

      it('should create a new appointment successfully(Payment:Insuarance Claim)', async () => {
        const res = await request(app).post('/appointment/add').send({
          userId: 1,
          doctorId: doctor._id.toString(),
          hospitalId: hospital._id.toString(),
          date: '2024-10-07',
          time: '10:00 AM',
          payDetails:{   
            paymentType:'insuaranceClaim',
            insuaranceProvider:"insurance Provider",
            amount: 2000,
            payStatus:"Proceed To Validation",
            isValidated:false,
            insuaranceDocuments:"documents"}
        });
    
        
    
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'Appointment created successfully');
        expect(res.body.appointment).toHaveProperty('doctorId', doctor._id.toString());
        expect(res.body.appointment).toHaveProperty('hospitalId', hospital._id.toString());
        expect(res.body.appointment).toHaveProperty('date', new Date('2024-10-07').toISOString()); 
        expect(res.body.appointment).toHaveProperty('time', '10:00 AM');
        });






  it('should return a 500 error for internal server error', async () => {
    jest.spyOn(Appointment.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const res = await request(app).post('/appointment/add').send({
      userId: 1,
      doctorId: doctor._id.toString(),
      hospitalId: hospital._id.toString(),
      date: '2024-10-07',
      time: '10:00 AM',
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message', 'Internal server error');
  });
});
