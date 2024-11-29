import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Button, Dropdown, NavDropdown, FormControl, Form, Container, Row, Col } from 'react-bootstrap';
import '../css/AlfProjects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging, faPlus } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import AlfEachProjectCard from './AlfEachProjectCard';
import AlfNavbar from './AlfNavbar';
import TrySideNav from './TrySideNav';
import axios from 'axios';
// import TrySideNav2 from './TrySideNav2';

const AlfProjects = () => {
    const [superVisorNames,set] = useState([]);
    useEffect(()=>{
            sessionStorage.getItem("admin") || axios.get(`${import.meta.env.VITE_SER}sup`,{headers:{auth:sessionStorage.getItem('auth')}}).then(t=>t.data.map(v=>({value:v._id ?? v.id,label:v.name}))).then(set)
            axios.get(`${import.meta.env.VITE_SER}proj`,{headers:{auth:sessionStorage.getItem('auth')}}).then(t=>{SetProjectCardDetails(t.data)})
    },[])
    const [show, setShow] = useState(false);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [inputCity, setInputCity] = useState(""); // New state for city input

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getDate() {
        const today = new Date();
        return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    }

    const [projectCardDetails, SetProjectCardDetails] = useState([]);
    const projectNameIpRef = useRef();
    const clientNameIpRef = useRef(); 

    const addProjectCard = () => {
        const ipProjectName = projectNameIpRef.current.value.trim();
        const ipClientName = clientNameIpRef.current.value.trim();
        
        if (ipProjectName === "" || !selectedSupervisor || !inputCity) { // Change here to check inputCity
            return null;
        }

        const newProjectCard = {
            name: ipProjectName,
            location: inputCity, // Use inputCity here
            projectStartDate: getDate(),
            projectSupervisor: selectedSupervisor,
            owner: ipClientName,
        };
        axios.post(`${import.meta.env.VITE_SER}proj`,newProjectCard,{headers:{auth:sessionStorage.getItem('auth')}}).then(t=>{
            SetProjectCardDetails((prev) => [t.data, ...prev]);
        })

        projectNameIpRef.current.value = "";
        clientNameIpRef.current.value = "";
        setSelectedSupervisor(null);
        setInputCity(""); // Reset inputCity
        handleClose();
    };

    const togggleCardStatus = (id) => {
        axios.put(`${import.meta.env.VITE_SER}proj`,{status: !projectCardDetails.find(e=>e._id==id).status},{headers:{auth:sessionStorage.getItem('auth'),edit:id}}).then((t)=>{
            SetProjectCardDetails((prev) =>
                prev.map((card) => (card._id === id ? t.data : card))
            );
        })
    };

    const deleteCard = (id) => {
        axios.delete(`${import.meta.env.VITE_SER}proj`,{headers:{edit:id,auth:sessionStorage.getItem("auth")}}).then(t=>{
        t.data == "👍" &&SetProjectCardDetails((prev) => prev.filter((card) => card._id !== id));
        })
    };

    const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
    const clearSupervisorFilter = () => setSelectedSupervisor(null);
    const clearCityFilter = () => setSelectedCity(null);

    const cities = [
        ...new Set(projectCardDetails.map((project) => ({ label: project.location, value: project.location })))
    ];

    const filteredProjects = projectCardDetails.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery);
        const matchesSupervisor = selectedSupervisor ? project.projectSupervisor === selectedSupervisor.value : true;
        const matchesCity = selectedCity ? project.location === selectedCity.label : true;
        return matchesSearch && matchesSupervisor && matchesCity;
    });

    return (
        <>
            {/* <AlfNavbar /> */}
            {/* <TrySideNav/>  */}


            {/* <div className='d-flex'>
                <div className='alfprojects-container'>
                    <TrySideNav/>
                </div> 
            </div> */}
            <Container fluid>
                <Row>
                    <Col xs={1}>
                    <TrySideNav selectedKey="projects"/>
                    </Col>
                    
                    <Col xs={11}>
                        <div className='container-fluid body-bg-color'>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h1>Projects</h1>
                                </div>

                                <div className="col-9 search-box mt-4" style={{ display: "flex" }}>
                                    <FormControl type="text" placeholder="Search by Project Name" onChange={handleSearch} />
                                </div>

                                <div className='col-1 mt-4'>
                                    <Button onClick={handleSearch}>Search</Button>
                                </div>
                                { sessionStorage.getItem("admin") ||
                                <div className='col-12 col-lg-2 mt-4'>
                                    <Button variant="primary" onClick={handleShow}>
                                        <FontAwesomeIcon icon={faPlus} /> Create New Project
                                    </Button>
                                </div>}


                                <div className="col-6 mt-4">
                                    <Select
                                        options={superVisorNames}
                                        value={selectedSupervisor}
                                        onChange={(option) => setSelectedSupervisor(option)}
                                        placeholder="Filter by Supervisor"
                                        isClearable={true}
                                    />
                                    {/* <Button variant="secondary" onClick={clearSupervisorFilter}>Clear Filter</Button> */}
                                </div>
                                <div className="col-6 mt-4">
                                    <Select
                                        options={cities}
                                        value={selectedCity}
                                        onChange={(option) => setSelectedCity(option)}
                                        placeholder="Filter by City"
                                        isClearable={true}
                                    />
                                    {/* <Button variant="secondary" onClick={clearCityFilter}>Clear Filter</Button> */}
                                </div>

                                {filteredProjects.length === 0 ? (
                                    <p>No On Going Projects</p>
                                ) : (
                                    filteredProjects.map((eachCardDetails) => (
                                        <AlfEachProjectCard
                                            key={eachCardDetails._id}
                                            {...eachCardDetails}
                                            togggleCardStatus={togggleCardStatus}
                                            deleteCard={deleteCard}
                                        />
                                    ))
                                )}

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>Creating new Project</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label>Project Name</label>
                                        <input ref={projectNameIpRef} type="text" placeholder='Enter Project Name Here' className='w-100 mb-4' />

                                        <label>Client Name</label>
                                        <input ref={clientNameIpRef} type="text" placeholder='Enter Client Name' className='w-100 mb-4'/>

                                        <label>Select Supervisor</label>
                                        <Select
                                            options={superVisorNames}
                                            value={selectedSupervisor}
                                            onChange={(option) => setSelectedSupervisor(option)}
                                            placeholder="Select Supervisor"
                                            className='w-100 mb-4'
                                            isClearable={true}
                                        />

                                        <label>Enter City</label>
                                        <input 
                                            type="text" 
                                            placeholder='Enter City Here' 
                                            className='w-100 mb-4' 
                                            value={inputCity} 
                                            onChange={(e) => setInputCity(e.target.value)} // Update inputCity on change
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        <Button variant="primary" onClick={addProjectCard}>Create Project</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
                
                

            
        </>
    );
};

export default AlfProjects;

