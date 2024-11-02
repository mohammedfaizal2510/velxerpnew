import React from 'react'
import {Navbar, Nav, Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const PinNavbar = () => {
    const navigate = useNavigate();
  return (
    <>
        <Navbar bg="dark" expand="lg" style={{width:"100vw"}}>
        <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link className='p-3' style={{color:"white", fontWeight:"700"}} onClick={() => navigate('/projects/dashboard/attendance')}>Attendance</Nav.Link>
            <Nav.Link className='p-3' style={{color:"white", fontWeight:"700"}} onClick={() => navigate('/projects/dashboard/resuestMaterial')}>Request Materials</Nav.Link>
            <Nav.Link className='p-3' style={{color:"white", fontWeight:"700"}} onClick={() => navigate('/projects/dashboard/inventry')}>Inventry</Nav.Link>
            </Nav>
            {/* <Button variant="success" className='p-3 pl-4 pr-4' style={{borderRadius:"20px"}} onClick={() => navigate('log-in')}>Log Out</Button> */}
            <Button variant="success" className='p-3 pl-4 pr-4' style={{borderRadius:"20px"}} onClick={() => navigate('/projects/dashboard')}>Back</Button>
        </Navbar.Collapse>
        </Navbar>
    </>
  )
}

export default PinNavbar
