const Doctor = require('../models/doctorModel');
const Hospital = require('../models/hospitalModel');


const addDoctor = async (req, res) => {
  try {
    
    const { firstName, lastName, dateOfBirth, contactNo, nationalId, email, address, speciality, licenseNumber, yearsOfExperience, qualification, gender, age, hospitalIds,profImg ,appoinmentFee} = req.body;

    
    const newDoctor = new Doctor({
      firstName,
      lastName,
      dateOfBirth,
      contactNo,
      nationalId,
      email,
      address,
      speciality,
      licenseNumber,
      yearsOfExperience,
      qualification,
      gender,
      age,
      hospitalIds, 
      profImg,
      appoinmentFee
    });

    
    await newDoctor.save();

    
    const populatedDoctor = await Doctor.findById(newDoctor._id).populate('hospitalIds', 'name address phoneNumber type CoverImg channelFee');
    
    res.status(201).json(populatedDoctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Failed to add doctor' });
  }
};


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('hospitalIds', 'name address phoneNumber type CoverImg channelFee');
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params; 
    const doctor = await Doctor.findById(id).populate('hospitalIds', 'name address phoneNumber type CoverImg channelFee');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params; 
    const doctor = await Doctor.findByIdAndDelete(id); 

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
};

module.exports = {
  addDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor
};
