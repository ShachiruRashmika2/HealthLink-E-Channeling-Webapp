const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Hospital = require('../models/hospitalModel');
const {freeChannel,cardPayment,cashPayment,insuaranceClaim,payment}=require('../models/paymentModel')


const createAppointment = async (req, res) => {
  const { userId, doctorId, hospitalId, date, time ,payDetails} = req.body;
  const ptype='cashPayment';
let Payment;
  try {
    const doctor = await Doctor.findById(doctorId);
    const hospital = await Hospital.findById(hospitalId);
    console.log(Number(payDetails.amount),payDetails.paySlip,payDetails.payeeName,payDetails.paymentType,payDetails.insuaranceProvider,payDetails.insuaranceDocuments);

    if(hospital.type=='Government'){
      Payment= new freeChannel({
  
          payStatus:'Free',
          amount:0,
        

  
  
        })
        await Payment.save();
      }else if(hospital.type=='Private'){

        try {
          switch (payDetails.paymentType) {
            case 'cashPayment':
              Payment = new cashPayment({
                
                amount: Number(payDetails.amount),
                paySlip: payDetails.paySlip,
                payeeName:payDetails.payeeName,
                payStatus:"Proceed To Validation",
                isValidated:false
              });
              break;
            case 'insuaranceClaim':
              Payment = new insuaranceClaim({

                insuaranceProvider:payDetails.insuaranceProvider,
                amount: Number(payDetails.amount),
                payStatus:"Proceed To Validation",
                isValidated:false,
                insuaranceDocuments:payDetails.insuaranceDocuments
               
              });
              break;
            case 'cardPayment':
              Payment = new cardPayment({
               
              });
              break;
            default:
              return res.status(400).json({ message: 'Invalid payment type' });
          }
      
          await Payment.save();
          
      
        } catch (err) {
          console.error(err);
         
        }








      }
  

    if (!doctor || !hospital) {
      return res.status(404).json({ message: 'Doctor or Hospital not found' });
    }


    
    const appointment = new Appointment({
      userId,
      doctorId,
      hospitalId, 
      date,
      time,
      payment:Payment._id

     
    });

    await appointment.save();
    return res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserAppointments = async (req, res) => {
  const { userId } = req.params; 

  try {
    
    const appointments = await Appointment.find({ userId }).populate('doctorId').populate('hospitalId').populate('payment','payStatus paymentType');

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this user' });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params; 
  const appo=await Appointment.findOne({appointmentId:appointmentId});
  console.log(appo.payment._id);

  try {
    const Payment= await payment.findByIdAndDelete(appo.payment._id);
    const appointment = await Appointment.findOneAndDelete({
      appointmentId: appointmentId, 
      userId: 1, 
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or you are not authorized to delete this appointment' });
    }

    return res.status(200).json({ message: 'Appointment and Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { date, time } = req.body;

  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentId: appointmentId, userId: 1 }, 
      { date, time ,isPaid},
      { new: true } 
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or you are not authorized to update this appointment' });
    }

    return res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAppointment,
  getUserAppointments,
  deleteAppointment,
  updateAppointment
};
