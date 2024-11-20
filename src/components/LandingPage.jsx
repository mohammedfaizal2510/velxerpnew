import React, { useEffect } from 'react'
// import {Button} from "react-bootstrap"
import {Navbar, Nav, Button} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSitemap, faCompassDrafting, faClipboardUser, faCreditCard, faScrewdriverWrench, faWarehouse, faListCheck} from '@fortawesome/free-solid-svg-icons'
import '../css/LandingPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import NavBar from './NavBar'

const LandingPage = () => {
    const navigate = useNavigate();
    const log=()=>{
        navigate("/log-in")
    }
    useEffect(()=>{
        (async()=>{
        const auth = sessionStorage.getItem('auth');
        axios.get(`${import.meta.env.VITE_SER}uck`,{headers:{auth}}).then(t=>{
                if(t.data){
                    navigate("/projects/dashboard")
                }
            })
        }
        )();
    },[])
  return (
    <>
    {/* className='d-flex flex-column justify-content-center'  
    position:"relative", transform:"translateY(150%)"
    */}
    {/* <NavBar/> */}


    <Navbar bg="dark" expand="lg" style={{width:"100vw"}}>
        <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home" className='p-3' style={{color:"white", fontWeight:"700"}}>Home</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>Services</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>About Us</Nav.Link>
            <Nav.Link href="#link" className='p-3' style={{color:"white", fontWeight:"700"}}>Contact Us</Nav.Link>
            </Nav>
            <Button variant="success" className='p-3 pl-4 pr-4' style={{borderRadius:"20px"}} onClick={() => navigate('log-in')}>LogIn</Button>
        </Navbar.Collapse>
        </Navbar>

    <div style={{}} className='landing-pg-bg d-flex align-items-center justify-content-center'>
        <div className='text-center'>
            <h1 className='landingpage-hero'>All Your Construction Site tracking in one Place</h1>
            <h4 className='landingpage-para'>Simple, User Friendly, Yet Affordable </h4>
            <Button variant='success' className='mr-5 mt-5 p-3 button-style'>Get Our Services</Button>
            <Button variant='success' className='mt-5 p-3 button-style' onClick={log}>Log In</Button>
        </div>
    </div>



    
    {/* <div className='container'>
        <div className='row'>
            <div className='col-6'>
                <h1>dojeh</h1>
            </div>
            <div className='col-6'>
                <h1>dojeh</h1>
            </div>
        </div>
    </div> */}


    <div>
        
        <div className='container'>
            <div className='row'>

                <div className="col-12">
                    <h1 className='text-center mt-5 page-heading'>Our Services</h1>
                </div>

                <div className="col-12 col-md-6">
                    <a href='https://web.whatsapp.com/' style={{textDecoration:"none"}}>
                        <div className='services-card text-center'>
                            <FontAwesomeIcon icon={faClipboardUser} className='services-icon mt-3 mb-3' />
                            <h1 className='card-heading'>Attendance</h1>
                            <p className='card-decsription'>Track attendance seamlessly</p>
                            <p className='card-decsription'>Explore Plans</p>
                        </div>
                    </a> 
                </div>

                {/* col-lg-4 */}
                <div className="col-12 col-md-6"> 
                    <a>
                    <div className='services-card text-center'>
                        <FontAwesomeIcon icon={faCreditCard} className='services-icon mt-3 mb-3' />
                        <h1 className='card-heading'>Payroll</h1>
                        <p className='card-decsription'>Streamline Your Payroll Process</p>
                        <p className='card-decsription'>Explore Plans</p>
                    </div>
                    </a>
                </div>

                <div className="col-12 col-md-6">
                    <a>
                        <div className='services-card text-center'>
                            <FontAwesomeIcon icon={faScrewdriverWrench} className='services-icon mt-3 mb-3' />
                            <h1 className='card-heading'>Site Management</h1>
                            <p className='card-decsription'>Efficient Projects, Seamless Coordination</p>
                            <p className='card-decsription'>Explore Plans</p>
                        </div>
                    </a>
                </div>

                
                <div className="col-12 col-md-6">
                    <a>
                    <div className='services-card text-center'>
                        <FontAwesomeIcon icon={faWarehouse} className='services-icon mt-3 mb-3' />
                        <h1 className='card-heading'>Inventry</h1>
                        <p className='card-decsription'>Track, Manage, Optimize Resources</p>
                        <p className='card-decsription'>Explore Plans</p>
                    </div>
                    </a>
                </div>

                <div className="col-12">
                    <a><div className='services-card text-center' style={{backgroundColor:"#34A853"}}>
                        <FontAwesomeIcon icon={faListCheck} className='services-icon mt-3 mb-3 mr-3' />
                        <FontAwesomeIcon icon={faSitemap} className='services-icon mt-3 mb-3 mr-3' />
                        <FontAwesomeIcon icon={faCompassDrafting} className='services-icon mt-3 mb-3 mr-3' />

                        <h1 className='card-heading'>Get All Services</h1>
                        <p className='card-decsription'>Empowering Construction Efficiency With VELX</p>
                        <p className='card-decsription'>Explore Plans</p>
                    </div></a>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LandingPage
