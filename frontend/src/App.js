import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './pages/AdminDashboard';
import AdminHospital from './pages/AdminHospital';
import AdminDoctor from './pages/AdminDoctor';

import DoctorDetails from './pages/DoctorDetails';
import PatientAppoinments from './pages/PatientAppoinments';
import AddAppointment from './pages/AddAppointment';
import { Container } from 'react-bootstrap';
import AdminLayout from './Layouts/AdminLayout/AdminLayout';
import AddDoctor from './pages/AddDoctor';




/********************************Shachiru********************************* */ 

import Sidebar from './components/Accessories/Sidebar';
import UserLayout from './Layouts/UserLayouts/UserLAyout';
import PatientHome from './pages/UserPages/PatientHome';


/************************************************************************* */ 


const App = function() {
  return (
    <BrowserRouter>
      
      <Routes>


<Route path='/admin' element={<AdminLayout/>}>
<Route index element={<AdminDashboard />} />
<Route path='/admin/doctor' element={<AdminDoctor />} />
<Route path='/admin/addDoc' element={<AddDoctor />} />
<Route path='/admin/Hospital' element={<AdminHospital />} />
<Route path='/admin/manageDoc/:id' element={<DoctorDetails />} />
             

</Route>



<Route path='/' element={<UserLayout/>}>
<Route index element={<PatientHome />} />
<Route path='/patient/appointments' element={<PatientAppoinments />} />
<Route path='/patient/appointments/addAppointment' element={<AddAppointment />} />
             

</Route>

      </Routes>
      
    
    </BrowserRouter>
  );
};

export default App;
