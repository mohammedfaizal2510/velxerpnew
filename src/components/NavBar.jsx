import React from 'react'
import {Navbar, Nav, Button} from "react-bootstrap"
//import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"

const NavBar = () => {
  return (
    <div>
        {/* width:"100vw", position: "absolute", top:"50%", left:"50%", marginTop:"-50px", marginLeft:"-100px" */}
      <Navbar bg="dark" expand="lg" style={{width:"100vw"}}>
        <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home" className='p-3' style={{color:"white", fontWeight:"700"}}>Home</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>Services</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>About Us</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>Contact Us</Nav.Link>
                 {/* <NavDropdown className='p-3' title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item hre2="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>  */}
            </Nav>
            <Button variant="success" className='p-3 pl-4 pr-4' style={{borderRadius:"20px"}}>LogIn</Button>
            {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            
            </Form> */}
        </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

export default NavBar
