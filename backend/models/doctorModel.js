const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, unique: true }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNo: { type: String, required: true },
  nationalId: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  speciality: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  hospitalIds: [{ type: Schema.Types.ObjectId, ref: 'Hospital' }],
  profImg:{type:String,required:true},
  appoinmentFee:{type:Number}
}, { timestamps: true });


doctorSchema.pre('save', async function (next) {
  const doctor = this;
  if (!doctor.isNew) return next();

  try {
    
    const lastDoctor = await mongoose.model('Doctor').findOne().sort({ createdAt: -1 });

    let newId = 'D001';
    if (lastDoctor && lastDoctor.doctorId) {
      const lastIdNumber = parseInt(lastDoctor.doctorId.substring(1)); 
      const nextIdNumber = lastIdNumber + 1; 
      newId = `D${nextIdNumber.toString().padStart(3, '0')}`; 
    }

    
    doctor.doctorId = newId;
    next();
  } catch (error) {
    next(error);
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
