const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  appointmentId: { type: String, unique: true }, 
  userId: { type: Number, default: 1 }, 
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  payment:{type:Schema.Types.ObjectId,ref:'payment',required:true}
}, { timestamps: true });

appointmentSchema.pre('save', async function (next) {
  const appointment = this;
  if (!appointment.isNew) return next();

  try {
    const lastAppointment = await mongoose.model('Appointment').findOne().sort({ createdAt: -1 });
    let newId = 'A001'; 
    if (lastAppointment && lastAppointment.appointmentId) {
      const lastIdNumber = parseInt(lastAppointment.appointmentId.substring(1)); 
      const nextIdNumber = lastIdNumber + 1; 
      newId = `A${nextIdNumber.toString().padStart(3, '0')}`; 
    }

    appointment.appointmentId = newId; 
    next();
  } catch (error) {
    next(error);
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
