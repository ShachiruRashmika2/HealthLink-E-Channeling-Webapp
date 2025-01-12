import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import img from "./Images/rapi.jpg";
import logo from "./Images/HealthLinkLOgo.png";


export default function Sidebar() {
	const [UserType,setUserType]=useState("patient");
	const location = useLocation();
	const currentPath = location.pathname;
  
	return (
	  <div className="sidebar">

		<h4 className="sidebar-title"><img src={logo} alt="Logo"></img></h4>
		<span style={{fontWeight:200,fontSize:"12px"}}>Menu</span>
		<ul className="sidebar-list">
		  <li className={`sidebar-item ${currentPath === '/' ? 'active' : ''}`}>
			<Link to="/" className="sidebar-link"><i class="fa fa-th-large" aria-hidden="true"></i>Dashboard</Link>
		  </li>
		  {UserType==="patient"? <li className={`sidebar-item ${currentPath.startsWith('/patient/appointments') ? 'active' : ''}`}>
			<Link to="/patient/appointments" className="sidebar-link"><i class="fa-regular fa-calendar-check"></i>Appoinments</Link>
		  </li>:UserType==="doctor"?<li className={`sidebar-item ${currentPath === '/hospitals' ? 'active' : ''}`}><Link to="/hospitals" className="sidebar-link"><i class="fas fa-clipboard-list"></i>Schedule</Link></li>:null}
		  {UserType==="patient"?  <li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
			<Link to="/doctors" className="sidebar-link"><i class="fa-solid fa-user-doctor"></i>Doctors</Link>
		  </li>:UserType==="doctor"?<li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}><Link to="/doctors" className="sidebar-link"><i class="fa-regular fa-calendar-check"></i>Appoinments</Link></li>:null}
		  {UserType==="patient"? <li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
			<Link to="/doctors" className="sidebar-link"><i class="fas fa-notes-medical"></i>My Reports</Link>
		  </li>:UserType==="doctor"?<li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}><Link to="/doctors" className="sidebar-link"><i class="fas fa-hospital-user"></i>Patients</Link></li>:null}
		  {UserType==="patient"? <li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
			<Link to="/doctors" className="sidebar-link"><i class="fas fa-file-medical-alt"></i>My Health Stats</Link>
		  </li>:UserType==="doctor"?<li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
			<Link to="/doctors" className="sidebar-link"><i class="fas fa-tv"></i>Telemedicine</Link>
		  </li>:null}
		  <hr/>
		  <li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
			<Link to="/doctors" className="sidebar-link"><i class="fa-solid fa-gear"></i>Settings</Link>
		  </li>
		  <li className={currentPath === '/doctors' ? 'active' : 'sidebar-item'}>
			<Link to="/doctors" className="sidebar-link"><i class="fa-solid fa-circle-info"></i>Help & Support</Link>
		  </li>
		</ul>
		<div className="sidebar-UserSpan">
			<div className="UserSpan-userProfile"><Link to="/admin" ><span className="userProfile-Profilepic"><img src={img} alt="profPic"></img></span></Link>
			
			</div>
			<div className="userProfile-ProfileDetails"><div className="userProfile-UserName">USerName userName</div><div className="userProfile-email">email</div></div>
			
			<div className="UserSpan-userLogout"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
		</div>
	  </div>
	);
  };
  
