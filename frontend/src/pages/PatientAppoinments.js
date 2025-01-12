import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientAppoinments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = '1'; 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/appointment/get/${userId}`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Failed to fetch user appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:4000/appointment/delete/${appointmentId}`);
      setAppointments(appointments.filter(appointment => appointment.appointmentId !== appointmentId));
      alert('Appointment deleted successfully!');
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const handleEdit = (appointment) => {
    navigate('/patient/appointments/addAppointment', {
      state: {
        isEdit: true,
        appointment: appointment,
      }
    });
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return (
      <div className="container mt-4">
        <h3>My Appointments</h3>
        <p>No appointments found for this user.</p>
        <Button variant="primary" onClick={() => navigate('/patient/appointments/addAppointment')}>
          Add Appointment
        </Button>
      </div>
    );
  }


  return (
    <div className="container mt-4">
      <div style={{display:'inline-flex',flexDirection:'row',width:'100%',justifyContent:'space-between',marginBottom:'20px'}}><h3 style={{fontWeight:'bold'}}>My Appointments</h3>
      <Button variant="primary" onClick={() => navigate('/patient/appointments/addAppointment')} className="mt-4 " >
        Add Appointment
      </Button>

      </div>
      
     
      <div className='tableContainer' >
      <h4>My All Appoinments</h4>
        <hr/>

        {appointments.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Appointment Number</th>
                <th className="table-header">Doctor Name</th>
                <th className="table-header">Specialization</th>
                <th className="table-header">Hospital</th>
                <th className="table-header">Date</th>
                <th className="table-header">Time</th>
                <th className="table-header">Payment Type</th>
                <th className="table-header">Payment Status</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment,key) => (
                <tr key={key}> 
                  <td className="table-cell">{appointment.appointmentId}</td> 
                  <td className="table-cell"><img src={appointment.doctorId.profImg} alt="Preview Image" style={{ width: '40px', height: '40px',borderRadius:'50%',marginRight:'5px',objectFit:'cover'}} />{`${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`}</td>
                  
                  <td className="table-cell">{appointment.doctorId.speciality}</td>
                  <td className="table-cell">{appointment.hospitalId.name}</td>
                  <td className="table-cell">{formatDate(appointment.date)}</td>
                  <td className="table-cell">{appointment.time}</td>
                  <td className="table-cell">{appointment.payment.paymentType}</td>
                  <td className="table-cell">{appointment.payment.payStatus}</td>
                  <td className="table-cell ">
                  <Button variant="primary" onClick={() => handleEdit(appointment)} className='me-2' style={{margin:'5px'}}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteAppointment(appointment.appointmentId)} style={{margin:'5px'}}>
                  Delete
                </Button>
              


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Appoinments found.</p>
        )}
      </div>

    </div>
  );
};

export default PatientAppoinments;
