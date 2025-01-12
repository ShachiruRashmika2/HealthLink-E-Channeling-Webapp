import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddAppointment.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import QRCode from "react-qr-code";
import Modal from 'react-bootstrap/Modal';
import {loadStripe} from '@stripe/stripe-js';



const AddAppointment = () => {


  const [specialties] = useState([
    {name:'Cardiology',icon:'fas fa-heartbeat'},
    {name:'Neurology',icon:'fas fa-brain'},
    {name:'Hematology',icon:'fas fa-paw'},
    {name:'Pulmonology',icon:'fas fa-lungs'},
    {name:'Ophthalmology',icon:'fas fa-eye'},
    {name:'Pediatrics',icon:'fas fa-baby'},
    {name:'Immunology',icon:'fas fa-allergies'},
    {name:'Gynecology',icon:'fas fa-female'},
    {name:'Orthopedics',icon:'fas fa-walking'},
    {name:'Psychology',icon:'fas fa-head-side-virus'},
    {name:'Dentistry',icon:'fa-solid fa-tooth'},
    {name:'Dermatology',icon:'fa-solid fa-person-dots-from-line'}

   
  
 
  ]);

  const [timeSlots] = useState([
    '8:30 - 12:30 PM',
    '1:30 - 3:30 PM',
    '3:30 - 5:30 PM',
    '6:00 - 8:00 PM',
    '8:30 - 10.30 PM'
  ]);

  

  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const[showSpecial,setShowSpecial]=useState(true);
  const[showDoctors,setShowDoctors]=useState(false);
  const[showHospitals,setShowHospitals]=useState(false);
  const[showDateTime,setshowDateTime]=useState(false);
  const[showSchedule,setshowSchedule]=useState(false);
  const[showPayTypes,setshowPayTypes]=useState(false);
  const[showCashPay,setShowCashPay]=useState(false);
  const[showCardPay,setShowCardPay]=useState(false);
  const[showInsPay,setShowInsPay]=useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime,setSelectedTime]= useState(''); 
   const [paymentStatus,setpaymentStatus]= useState('');
   const[paymentFee,setpaymentFee]=useState('');
   const[paymentType,setPaymentType]=useState('')
   const[isPaid,setisPaid]=useState(false);
   const [payDetails,setpayDetails]=useState({

    payeeName:'',
    paySlip:'',
    amount: paymentFee,
    payStatus:'',
    isValidated:false,
    insuaranceProvider:'',
    cardHolderName:'',
    paymentType:paymentType,
    insuaranceProvider:'',
    insuaranceDocuments:''





    
    




  });


const bookedDates = [
  new Date(2024, 6, 2),
  new Date(2024, 6, 9),
  new Date(2024, 6, 16),
  new Date(2024, 6, 25),
];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const { appointment } = location.state;
    
      setIsEdit(true);
      setDate(appointment.date.split('T')[0]);
      setTime(appointment.time); 
      setSelectedDoctor(appointment.doctorId._id);
      setSelectedSpecialty(appointment.doctorId.speciality);
      setSelectedHospital(appointment.hospitalId._id);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorResponse = await axios.get('http://localhost:4000/doctor/get');
        setDoctors(doctorResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSpecialty) {
      const filtered = doctors.filter((doctor) => doctor.speciality === selectedSpecialty);
      setFilteredDoctors(filtered);
      setSelectedDoctor('');
      setHospitals([]);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialty, doctors]);

  useEffect(() => {
    const fetchHospitals = async () => {
      if (selectedDoctor) {
        try {
          const doctor = filteredDoctors.find((doc) => doc._id === selectedDoctor._id);
          if (doctor) {
            setHospitals(doctor.hospitalIds);
          }
        } catch (error) {
          console.error('Error fetching hospitals:', error);
          setError('Failed to fetch hospitals. Please try again later.');
        }
      }
    };

    fetchHospitals();
  }, [selectedDoctor, filteredDoctors]);


  useEffect(() => {
    if (paymentFee !== undefined && paymentType !== undefined) {
      setpayDetails(prevDetails => ({
        ...prevDetails,
        amount: paymentFee,
        paymentType: paymentType,
      }));
    }
  }, [paymentFee, paymentType]);

  const handleSubmit = async () => {
 
    const userId = 1;

    if (!selectedDate || !selectedTime || !selectedHospital || !selectedDoctor) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      if (isEdit) {
        const appointmentId = location.state.appointment.appointmentId;
        const response = await axios.put(`http://localhost:4000/appointment/update/${appointmentId}`, {
          date:selectedDate,
          time:selectedTime,
          hospitalId: selectedHospital._id,
          doctorId: selectedDoctor._id,
          payDetails
        });
        setMessage(response.data.message);
      } else {
        const response = await axios.post('http://localhost:4000/appointment/add', {
          userId,
          doctorId: selectedDoctor._id,
          hospitalId: selectedHospital._id,
          date:selectedDate,
          time:selectedTime,
          payDetails
        });
        setMessage(response.data.message);
      }

      navigate('/patient/appointments');

      setSelectedSpecialty('');
      setSelectedDoctor('');
      setSelectedHospital('');
      setDate('');
      setTime('');
      setHospitals([]);
      setFilteredDoctors(doctors);
    } catch (error) {
      setMessage('Error creating/updating appointment');
      console.error(error);
    }

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
const SpecialityHandler=(speciality)=>{
  setSelectedSpecialty(speciality);
  setShowSpecial(false);
  setShowDoctors(true);
  
 

}

const cardPayment=async ()=>{

const response=await axios.post('http://localhost:4000/card/cardPay');

if(response && response.status === 200){

  window.location.href=response.data.secure_url

  console.log(response.data);
}

}




const DocHandler=(Doc)=>{
  setSelectedDoctor(Doc);
  setShowDoctors(false);
  setShowHospitals(true);
  
  
 

}
const HospitalHandler=(hospital)=>{
  setSelectedHospital(hospital);
 if(hospital.type==='Government'){
  setpaymentStatus('Free');
 }else if(hospital.type==='Private'){
  setpaymentStatus('Pending')
 }
  setShowHospitals(false);
  setshowDateTime(true);
  
}
const dateTimeHandler=(time)=>{

  setSelectedTime(time);
}



const isBooked = (date) => {
  return bookedDates.some(
    (bookedDate) => bookedDate.toDateString() === date.toDateString()
  );
};

const confirmSchedule=()=>{

if(selectedDate === '' || selectedTime === ''){

  alert("Enter Time and Date");
}
else{
  paymentCounter();
setshowDateTime(false);
setshowSchedule(true);

}
}
const dateConverter=(date)=>{
  const day = date.getDate().toString().padStart(2, '0');


  const month = date.toLocaleString('default', { month: 'short' });

  return(`${month} ${day}`);

}


const paymentCounter=()=>{

const Payment=selectedHospital.channelFee + selectedDoctor.appoinmentFee;
setpaymentFee(Payment);


}

const proceedPayment=()=>{

setshowSchedule(false);
setshowPayTypes(true);

}

const paymentTypeHandler=(type)=>{
setPaymentType(type);


switch(type){
    case 'cashPayment':
            setShowCashPay(true);
        break;
    case 'cardPayment':
            setShowCardPay(true);
        break;
    case 'insuaranceClaim':
                setShowInsPay(true);
        break;
    default :
          setshowPayTypes(true);


}

}

//file Uploader


function fileCloudUpload(e){
  const file=e.target.files[0];

const{name,value}=e.target;

  const formData = new FormData();
  formData.append("file", file) 
  formData.append("upload_preset", "HealthlinkFiles")

  try {
     axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
        setpayDetails(prevState => ({
          ...prevState,
          [name]: res.data.secure_url
          
       
      }));   
      
      })
  } catch (error) {
      alert(error)
  }
  

}



//


  return (
    <div className="container mt-4">
      <h3>{isEdit ? 'Update Appointment' : 'Create Appointment'}</h3>
       {message && <Alert variant="info">{message}</Alert>}
     
        
        {showSpecial? (<>
          <div className='tableContainer'>
        <h4>Select a Speciality</h4>
        <hr/>
        <div className='Specialcontainer'>
        {specialties.map((specialty, key) => (

              <div className='Specialitem' key={key}>
                <button className='Specialbutton' value={specialty.name} onClick={()=>{SpecialityHandler(specialty.name)}}>
                  <i className={`${specialty.icon}`}></i>
                  </button>
                  <h6>{specialty.name}</h6>
                  </div>
                 
                ))}
          

        </div></div></>):showDoctors?(<>  <div className='tableContainer'> <h4>Select Doctor</h4>
          <hr/>
          {filteredDoctors.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Experience</th>
                <th className="table-header">License Number</th>
                <th className="table-header">Email</th>
                <th className="table-header">Appoinment Fee</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor._id}> 
                  <td className="table-cell">{doctor.doctorId}</td> 
                  <td className="table-cell"><img src={doctor.profImg} alt="Preview Image" style={{ width: '40px', height: '40px',borderRadius:'50%',marginRight:'5px',objectFit:'cover'}} />{`${doctor.firstName} ${doctor.lastName}`}</td>
                  
                  <td className="table-cell">{doctor.yearsOfExperience} Years</td>
                  <td className="table-cell">{doctor.licenseNumber}</td>
                  <td className="table-cell">{doctor.email}</td>
                  <td className="table-cell">Rs.{doctor.appoinmentFee}.00</td>
                  <td className="table-cell "><Button onClick={()=>DocHandler(doctor)}>Select Doctor</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No doctors found.</p>
        )}
        
        
       </div> </>):showHospitals?(<><h4>Select Hospital</h4>
          <hr/> <div className="Hospital-card-container">
        {hospitals.map((hospital)=>(<div className="Hospital-card" key={hospital._id} onClick={()=>HospitalHandler(hospital)}>
            <img src={hospital.CoverImg} alt={hospital.name}/>
            <div className="Hospital-card-content">
                <h3>{hospital.name}</h3>
                <p><i class="fa-solid fa-location-dot"></i> {hospital.address}</p>
                <p><i class="fa-solid fa-stethoscope"></i> Rs.{hospital.channelFee}.00</p>
               
            </div>
        </div>))}
        
     

    </div></>):showDateTime?(<> <div className='tableContainer'>
    <h5 style={{fontWeight:600}}>Date</h5>
      <div className="calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            if (isBooked(date)) {
              return 'booked-date'; // custom class for booked dates
            } else if (date.toDateString() === new Date().toDateString()) {
              return 'selected-date'; // custom class for selected date
            }
          }
        }}
        tileContent={({ date, view }) => view === 'month' && isBooked(date) ? (
          <span className="dot"></span>
        ) : null}
      />
      
    </div>
   

      <h5 style={{fontWeight:600}}>Time</h5>
      <div className='Specialcontainer' >
        {timeSlots.map((time)=>( <div className='timeslot'key={time} onClick={()=>{dateTimeHandler(time)}}>{time}</div>))}
       
       
       
      </div>
   
      
    </div>

    <Button style={{margin:'20px',float:'right',width:'200px',borderRadius:'12px'}} onClick={()=>{confirmSchedule()}}>Shedule</Button>
    </>):showSchedule?(<>
      <div className='tableContainer'>
      
      <h2>Appointment Summary</h2>
      <hr/>
      <div className='appoinmentSummery'>
      <div className="appointment-info">
        <p><strong>Appointment Number: 07 </strong> <br/> <span className="appoinment-data">#0307220</span></p>
        <p><strong>Patient: Kamal Perera</strong></p>
        <span className="appoinment-data"><p>Known Allergies: None</p>
        <p>Special Conditions: None</p></span>
        <p><strong>Doctor: {selectedDoctor.firstName} {selectedDoctor.lastName}  </strong><img src={selectedDoctor.profImg} alt="Preview Image" style={{ width: '40px', height: '40px',borderRadius:'50%',marginRight:'5px',marginLeft:'8px',objectFit:'cover'}} /></p><span className="appoinment-data"><p>{selectedDoctor.gender} <i class="fa-solid fa-circle" style={{fontSize:'6px',bottom:'2px',position:'relative'}}></i> {selectedDoctor.speciality}</p></span>
        <p><strong>Hospital: {selectedHospital.name}</strong> </p><span className="appoinment-data"><p><i class="fa-solid fa-location-dot"></i> {selectedHospital.address}</p></span>
      
        
        <div className="schedule-section">
          <p><strong>Scheduled Time:</strong></p>
       

          {/* Basic text input for date and time */}
          <div className='timeslot-display'>
            <div className='timeslot-display-times'>{dateConverter(selectedDate)}</div>
            <div className='timeslot-display-times'>{selectedTime}</div>
            <Button >Change</Button>

          </div>
          
         
        </div>

        <p><strong>Total Fee:</strong> Rs.{paymentFee}.00</p>
        <p><strong>Payment Status:</strong> <span className="payment-status">{paymentStatus}</span></p>
      </div>

      <div className="qr-code">
      <QRCode
    size={180}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={paymentFee}
  
  />
        
        <p className="qr-code-number">#0307220</p>
      </div>
  
    
    
      </div>
    
    </div>
    {selectedHospital.type==='Government'?(<Button style={{margin:'20px',float:'right',width:'200px',borderRadius:'12px'}} onClick={()=>{handleSubmit()}}>Book Appoinment</Button>
   ):selectedHospital.type==='Private'?(<Button style={{margin:'20px',float:'right',width:'200px',borderRadius:'12px',backgroundColor:'green',borderColor:'green'}} onClick={()=>{proceedPayment()}}>Proceed Payment</Button>):null}
     </>):showPayTypes?(
      
      <div className='tableContainer'>
      
      <h2>Select Payment Type</h2>
      <hr/>
        <div className='payTypeContainer'>
          <div className='payType'>
          <button className='Specialbutton_payType' onClick={()=>{paymentTypeHandler('cashPayment');}} >
          <i class="fa-solid fa-money-bill"></i>
               </button>
               <h3>Cash</h3>

          </div>
          <div className='payType'>
          <button className='Specialbutton_payType' onClick={()=>{paymentTypeHandler('cardPayment');cardPayment();}}>
          <i class="fa-solid fa-credit-card"></i>
               </button>
               <h3>Card</h3>

          </div>
       
          <div className='payType'>
          <button className='Specialbutton_payType'onClick={()=>{paymentTypeHandler('insuaranceClaim');}} >
          <i class="fa-solid fa-shield-heart"></i>
               </button>
               <h3>Claim via Insuarance</h3>

          </div>
       
       
                  

        </div>
      </div>




     ):null}
       
       
    {/***********************************************Models***************************************** */}


    <Modal
     show={showCashPay}
    onHide={()=>{setShowCashPay(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pay Via Cash
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
     

        <div className='payType'>
          <button className='Specialbutton_payType'>
          <i class="fa-solid fa-file-invoice"></i>
               </button>
               <input type="file"  name="paySlip" accept="image/*"
                onChange={(event)=>{fileCloudUpload(event)}}

    />
               
               <h3>Upload Payment Slip</h3>
               
          </div>
          <label className="form-label">Payee Name</label>
               <input
                    className="form-control"
        type="text"
        placeholder="Enter Name Here"
        value={payDetails.payeeName}
        name='payeeName'
        onChange={(e)=> setpayDetails({ ...payDetails, payeeName: e.target.value })}
       
      />


<Button  style={{margin:'20px',marginLeft:'60px',width:'200px',borderRadius:'12px',backgroundColor:'green',borderColor:'green'}} onClick={()=>{handleSubmit();setShowCashPay(false);}}>Proceed Payment</Button>


      </Modal.Body>
      <Modal.Footer>
      
        <Button onClick={()=>{setShowCashPay(false)}}>Close</Button>
        {payDetails.paySlip}
      </Modal.Footer>
    </Modal>

{/****************************************************************************************************** */}

<Modal
     show={showInsPay}
    onHide={()=>{setShowInsPay(false)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Claim Via Insuarance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
 

        <div className='payType'>
          <button className='Specialbutton_payType' >
          <i class="fa-solid fa-file-invoice"></i>
               </button>
               <input type="file"  name="insuaranceDocuments" accept="image/*" 
                onChange={(event)=>{fileCloudUpload(event)}}

    />
               
               <h3>Upload Insuarance Certificate</h3>
               
          </div>
          <label className="form-label">Insuarance Provider Name</label>
               <input
                    className="form-control"
        type="text"
        placeholder="Enter Name Here"
        value={payDetails.insuaranceProvider}
        name='insuaranceProvider'
        onChange={(e)=> setpayDetails({ ...payDetails, insuaranceProvider: e.target.value })}
       
      />


<Button type="submit" style={{margin:'20px',marginLeft:'60px',width:'200px',borderRadius:'12px',backgroundColor:'green',borderColor:'green'}} onClick={()=>{handleSubmit();setShowInsPay(false);}}>Proceed Payment</Button>

  
      </Modal.Body>
      <Modal.Footer>
      
        <Button onClick={()=>{setShowInsPay(false)}}>Close</Button>
        {payDetails.insuaranceDocuments}
      </Modal.Footer>
    </Modal>

    {/***********************************************Models***************************************** */}
       
       </div>
  );
};

export default AddAppointment;
