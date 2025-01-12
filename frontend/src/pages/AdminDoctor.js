import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDoctor.css'; 
import { Button } from 'react-bootstrap';

const AdminDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:4000/doctor/get'); 
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to fetch doctors', error);
    }
  };

  const handleRowClick = (doctorId) => {
    navigate(`/admin/manageDoc/${doctorId}`); 
  };

  const handleAddDoctorClick = () => {
    navigate('/admin/addDoc'); 
  };



  return (
    <div className='container'>
      <h2 className="title">Doctors</h2>
      <div className="tableContainer">
        {doctors.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
               
                <th className="table-header">Name</th>
                <th className="table-header">Specialization</th>
                <th className="table-header">License Number</th>
                <th className="table-header">Email</th>
              
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} onClick={() => handleRowClick(doctor._id)}> 
                  <td className="table-cell">{doctor.doctorId}</td> 
                  <td className="table-cell"><img src={doctor.profImg} alt="Preview Image" style={{ width: '40px', height: '40px',borderRadius:'50%',marginRight:'5px',objectFit:'cover'}} />{`${doctor.firstName} ${doctor.lastName}`}</td>
                  <td className="table-cell">{doctor.speciality}</td>
                  <td className="table-cell">{doctor.licenseNumber}</td>
                  <td className="table-cell">{doctor.email}</td>
                
    
          
        
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No doctors found.</p>
        )}
        <Button
          variant="primary" 
          onClick={handleAddDoctorClick}
          className="add-doctor-button" 
        >
          Add Doctor
        </Button>
      </div>
    </div>
  );
};

export default AdminDoctor;
