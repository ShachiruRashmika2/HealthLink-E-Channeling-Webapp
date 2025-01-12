import React from "react";
import Sidebar from "../../components/Accessories/Sidebar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";


export default function UserLayout(){



return(

    <div className="d-flex">
        <Sidebar/>
        <div style={{ marginLeft: '250px', width: '100%' }}>
        <Container fluid className="p-3">
        <Outlet/>

        </Container>
        



        </div>
       
    </div>
)


}