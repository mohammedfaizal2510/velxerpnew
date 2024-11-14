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
// import TrySideNav2 from './TrySideNav2';

const AlfProjects = () => {
    const superVisorNames = [
        { label: 'supervisor - 1', value: 'supervisor - 1' },
        { label: 'supervisor - 2', value: 'supervisor - 2' },
        { label: 'supervisor - 3', value: 'supervisor - 3' },
        { label: 'supervisor - 4', value: 'supervisor - 4' },
        { label: 'supervisor - 5', value: 'supervisor - 5' },
        { label: 'supervisor - 6', value: 'supervisor - 6' }
    ];

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

    const [projectCardDetails, SetProjectCardDetails] = useState(
        localStorage.getItem('projectDetails') ? JSON.parse(localStorage.getItem('projectDetails')) : []
    );

    useEffect(() => {
        localStorage.setItem('projectDetails', JSON.stringify(projectCardDetails));
    }, [projectCardDetails]);

    const projectNameIpRef = useRef();
    const clientNameIpRef = useRef(); 

    const addProjectCard = () => {
        const ipProjectName = projectNameIpRef.current.value.trim();
        const ipClientName = clientNameIpRef.current.value.trim();
        
        if (ipProjectName === "" || !selectedSupervisor || !inputCity) { // Change here to check inputCity
            return null;
        }

        const newProjectCard = {
            id: Date.now(),
            projectName: ipProjectName,
            projectCity: inputCity, // Use inputCity here
            projectStartDate: getDate(),
            projectSupervisor: selectedSupervisor.label,
            clientName: ipClientName,
            isCompleted: false,
            assignedEmployees: [101,102]
        };

        SetProjectCardDetails((prev) => [newProjectCard, ...prev]);

        projectNameIpRef.current.value = "";
        clientNameIpRef.current.value = "";
        setSelectedSupervisor(null);
        setInputCity(""); // Reset inputCity
        handleClose();
    };

    const togggleCardStatus = (id) => {
        SetProjectCardDetails((prev) =>
            prev.map((card) => (card.id === id ? { ...card, isCompleted: !card.isCompleted } : card))
        );
    };

    const deleteCard = (id) => {
        SetProjectCardDetails((prev) => prev.filter((card) => card.id !== id));
    };

    const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
    const clearSupervisorFilter = () => setSelectedSupervisor(null);
    const clearCityFilter = () => setSelectedCity(null);

    const cities = [
        ...new Set(projectCardDetails.map((project) => ({ label: project.projectCity, value: project.projectCity })))
    ];

    const filteredProjects = projectCardDetails.filter((project) => {
        const matchesSearch = project.projectName.toLowerCase().includes(searchQuery);
        const matchesSupervisor = selectedSupervisor ? project.projectSupervisor === selectedSupervisor.label : true;
        const matchesCity = selectedCity ? project.projectCity === selectedCity.label : true;
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

                                <div className="col-9 search-box" style={{ display: "flex" }}>
                                    <FormControl type="text" placeholder="Search by Project Name" onChange={handleSearch} />
                                </div>

                                <div className='col-1'>
                                    <Button onClick={handleSearch}>Search</Button>
                                </div>

                                <div className='col-12 col-lg-2'>
                                    <Button variant="primary" onClick={handleShow}>
                                        <FontAwesomeIcon icon={faPlus} /> Create New Project
                                    </Button>
                                </div>

                                <div className="col-6">
                                    <Select
                                        options={superVisorNames}
                                        value={selectedSupervisor}
                                        onChange={(option) => setSelectedSupervisor(option)}
                                        placeholder="Filter by Supervisor"
                                        isClearable={true}
                                    />
                                    {/* <Button variant="secondary" onClick={clearSupervisorFilter}>Clear Filter</Button> */}
                                </div>
                                <div className="col-6">
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
                                            key={eachCardDetails.id}
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

