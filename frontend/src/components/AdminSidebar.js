import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css'; 

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Admin Panel</h4>
      <ul className="sidebar-list">
        <li className={`sidebar-item ${currentPath === '/' ? 'active' : ''}`}>
          <Link to="/" className="sidebar-link">Dashboard</Link>
        </li>
        <li className={`sidebar-item ${currentPath === '/admin/Hospital' ? 'active' : ''}`}>
          <Link to="/admin/Hospital" className="sidebar-link">Hospitals</Link>
        </li>
        <li className={`sidebar-item ${currentPath === '/admin/doctor' ? 'active' : ''}`}>
          <Link to="/admin/doctor" className="sidebar-link">Doctors</Link>
        </li>

        <li className={`sidebar-item ${currentPath === '/doctors' ? 'active' : ''}`}>
          <Link to="/" className="sidebar-link">User</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
