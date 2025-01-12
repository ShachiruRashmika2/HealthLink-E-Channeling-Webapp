import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup, Spinner } from 'react-bootstrap';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/doctor/get/${id}`);
        if (response.data) {
          setDoctor(response.data);
        } else {
          console.error("No doctor found with this ID.");
        }
      } catch (error) {
        console.error('Failed to fetch doctor details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`http://localhost:4000/doctor/delete/${id}`);
        alert('Doctor deleted successfully.');
        navigate('/admin/doctor');
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Failed to delete doctor. Please try again later.');
      }
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const handleEdit = () => {
    navigate(`/doctors`); 
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!doctor) {
    return <p>No doctor found with this ID.</p>;
  }

  return (
    <div className='container'>
      <h4><strong>Doctor Details</strong></h4>
      <Card className="my-4">
        <Card.Body>
          <ListGroup variant="flush">
          <img src={doctor.profImg} alt="Preview Image" style={{ width: '200px', height: '200px',borderRadius:'50%',marginRight:'5px',objectFit:'cover',margin:'20px'}} />
            <ListGroup.Item><strong>ID:</strong> {doctor.doctorId}</ListGroup.Item>
            <ListGroup.Item><strong>Name:</strong> {`${doctor.firstName} ${doctor.lastName}`}</ListGroup.Item>
            <ListGroup.Item><strong>Date of Birth:</strong> {formatDate(doctor.dateOfBirth)}</ListGroup.Item>
            <ListGroup.Item><strong>Contact No:</strong> {doctor.contactNo}</ListGroup.Item>
            <ListGroup.Item><strong>National ID:</strong> {doctor.nationalId}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong> {doctor.email}</ListGroup.Item>
            <ListGroup.Item><strong>Address:</strong> {doctor.address}</ListGroup.Item>
            <ListGroup.Item><strong>Specialization:</strong> {doctor.speciality}</ListGroup.Item>
            <ListGroup.Item><strong>License Number:</strong> {doctor.licenseNumber}</ListGroup.Item>
            <ListGroup.Item><strong>Years of Experience:</strong> {doctor.yearsOfExperience}</ListGroup.Item>
            <ListGroup.Item><strong>Qualification:</strong> {doctor.qualification}</ListGroup.Item>
            <ListGroup.Item><strong>Gender:</strong> {doctor.gender}</ListGroup.Item>
            <ListGroup.Item><strong>Age:</strong> {doctor.age}</ListGroup.Item>
          </ListGroup>

          <Card.Title className="mt-4">Working Hospitals</Card.Title>
          {doctor.hospitalIds && doctor.hospitalIds.length > 0 ? (
            <ListGroup>
              {doctor.hospitalIds.map((hospital, index) => (
                <ListGroup.Item key={index}>{hospital.name}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No hospitals found for this doctor.</p>
          )}

          <div className="mt-4">
            <Button variant="primary" onClick={handleEdit} className="me-2">Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorDetails;
