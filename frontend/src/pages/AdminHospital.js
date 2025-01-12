import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const AdminHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    type: '',
    CoverImg:'',
    channelFee:''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:4000/hospital/get');
      setHospitals(response.data);
    } catch (error) {
      console.error('Failed to fetch hospitals', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:4000/hospital/update/${editId}`, formData);
      } else {
        await axios.post('http://localhost:4000/hospital/add', formData);
      }
      fetchHospitals();
      setFormData({ name: '', address: '', phoneNumber: '', type: '' });
      setIsEditing(false);
      setEditId(null); 
    } catch (error) {
      console.error('Failed to save hospital', error);
    }
  };

  const handleEdit = (hospital) => {
    setFormData({
      name: hospital.name,
      address: hospital.address,
      phoneNumber: hospital.phoneNumber,
      type: hospital.type,
      channelFee:hospital.channelFee

    });
    setIsEditing(true);
    setEditId(hospital._id); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/hospital/delete/${id}`);
      fetchHospitals();
    } catch (error) {
      console.error('Failed to delete hospital', error);
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
          setFormData(prevState => ({
            ...prevState,
            [name]: res.data.secure_url
            
         
        }));   
        
        })
    } catch (error) {
        alert(error)
    }
    
  
  }



  return (
    <Container fluid>
      <h1 className="my-4">Hospitals</h1>
      <Row>
        <Col md={8}>
          <div className="d-flex flex-wrap">
            {hospitals.map(hospital => (
              <Card key={hospital._id} className="m-2" style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Body>
                  <Card.Text>
                    <strong>Name: </strong> {hospital.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address: </strong> {hospital.address}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone Number: </strong> {hospital.phoneNumber}
                  </Card.Text>
                  <Card.Text>
                    <strong>Type: </strong> {hospital.type}
                  </Card.Text>
                  <Card.Text>
                    <strong>Channel Fee: </strong> {hospital.channelFee}
                  </Card.Text>
                  <div style={{margin:'10%'}}><img src={hospital.CoverImg} style={{width:'40%'}}/></div>
                  <Button variant="warning" onClick={() => handleEdit(hospital)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(hospital._id)} className="ms-2">Delete</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <h2>{isEditing ? 'Edit Hospital' : 'Add Hospital'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formHospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Hospital Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHospitalAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHospitalPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formHospitalType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </Form.Select>
              <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" id="inputname" name="CoverImg" accept="image/*"
   onChange={(event)=>{imgCloudUpload(event)}}
    
    />
        </div>
        {formData.type==='Private'?(<>
        
          <label className="form-label">Channel Fee:</label>
        <div class="input-group mb-3" style={{width:'280px'}}>
       
  <div class="input-group-prepend"  >
    <span class="input-group-text">Rs.</span>
  </div>
  <input type="number" class="form-control"  name="channelFee"
            value={formData.channelFee}
            onChange={handleChange}
            required
           />
  <div class="input-group-append">
    <span class="input-group-text">.00</span>
  </div>
</div>
        
        </>):null}
        

            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Hospital' : 'Add Hospital'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHospital;
