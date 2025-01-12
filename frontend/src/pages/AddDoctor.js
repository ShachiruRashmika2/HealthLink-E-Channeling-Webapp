import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddDoctor = () => {
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    contactNo: '',
    nationalId: '',
    email: '',
    address: '',
    speciality: '',
    licenseNumber: '',
    yearsOfExperience: '',
    qualification: '',
    gender: '',
    age: '',
    hospitalIds: [],
    profImg:'',
    appoinmentFee:''

  });

  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  const specializations = [
    'Cardiology',
    'Dermatology',
    'Gynecology',
    'Ophthalmology',
    'Pulmonology',
    'Neurology',
    'Nephrology',
    'Hematology',
    'Pediatrics',
    'Immunology',
    'Psychology',
    'Orthopedics',
    'Dentistry'
  ];

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:4000/hospital/get');
        setHospitals(response.data);
      } catch (error) {
        console.error('Failed to fetch hospitals', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (hospitalId) => {
    setNewDoctor((prevDoctor) => {
      const { hospitalIds } = prevDoctor;
      if (hospitalIds.includes(hospitalId)) {
        // If the hospitalId is already in the array, remove it
        return {
          ...prevDoctor,
          hospitalIds: hospitalIds.filter((id) => id !== hospitalId),
        };
      } else {
        // If the hospitalId is not in the array, add it
        return {
          ...prevDoctor,
          hospitalIds: [...hospitalIds, hospitalId],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/doctor/add', newDoctor);
      console.log('Doctor added:', response.data);
      navigate('/admin/doctor');
    } catch (error) {
      console.error('Failed to add doctor', error);
    }
  };


  //declaring Image file input and Preview functions

async function imgCloudUpload(e){
  const imgfile=e.target.files[0];

const{name,value}=e.target;

  const formData = new FormData();
  formData.append("file", imgfile) 
  formData.append("upload_preset", "HelthLink_images")

  try {
      await axios.post("https://api.cloudinary.com/v1_1/dlrcon8gh/image/upload", formData).then((res) =>{
        setNewDoctor(prevState => ({
          ...prevState,
          [name]: res.data.secure_url
          
       
      }));   
      
      })
  } catch (error) {
      alert(error)
  }
  

}

  return (
    <div className="container mt-5">
      <h3>Add Doctor</h3>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={newDoctor.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={newDoctor.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" id="inputname" name="profImg" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
        </div>
       
        <div className="mb-3">
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={newDoctor.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact No:</label>
          <input
            type="text"
            className="form-control"
            name="contactNo"
            value={newDoctor.contactNo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">National ID:</label>
          <input
            type="text"
            className="form-control"
            name="nationalId"
            value={newDoctor.nationalId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={newDoctor.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={newDoctor.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization:</label>
          <select
            className="form-select"
            name="speciality"
            value={newDoctor.speciality}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">License Number:</label>
          <input
            type="text"
            className="form-control"
            name="licenseNumber"
            value={newDoctor.licenseNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Years of Experience:</label>
          <input
            type="number"
            className="form-control"
            name="yearsOfExperience"
            value={newDoctor.yearsOfExperience}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
        <label className="form-label">Qualification:</label>
        <textarea
            className="form-control"
            name="qualification"
            value={newDoctor.qualification}
            onChange={handleInputChange}
            rows="5" 
            required
        />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={newDoctor.age}
            onChange={handleInputChange}
            required
           style={{width:'200px'}}
          />
        </div>
        <label className="form-label">Appoinment Fee:</label>
        <div class="input-group mb-3" style={{width:'280px'}}>
       
  <div class="input-group-prepend"  >
    <span class="input-group-text">Rs.</span>
  </div>
  <input type="number" class="form-control"  name="appoinmentFee"
            value={newDoctor.appoinmentFee}
            onChange={handleInputChange}
            required
           />
  <div class="input-group-append">
    <span class="input-group-text">.00</span>
  </div>
</div>

        <label className="form-label">Working Hospitals:</label>
        <div className="mb-3">
          {hospitals.map((hospital) => (
            <div key={hospital._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`hospital-${hospital._id}`}
                checked={newDoctor.hospitalIds.includes(hospital._id)} 
                onChange={() => handleCheckboxChange(hospital._id)} 
                
              />
              <label className="form-check-label" htmlFor={`hospital-${hospital._id}`}>
                {hospital.name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddDoctor;
