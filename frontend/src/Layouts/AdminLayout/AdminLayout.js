import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";



export default function AdminLayout(){



return(

    <div className="d-flex">
        <AdminSidebar/>
        <div style={{ marginLeft: '250px', width: '100%' }}>
        <Container fluid className="p-3">
        <Outlet/>

        </Container>
        



        </div>
       
    </div>
)


}