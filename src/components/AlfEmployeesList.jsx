import React from 'react'
import AlfNavbar from './AlfNavbar'
import { Navbar, Nav, Button, Dropdown, NavDropdown, FormControl, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const AlfEmployeesList = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    // const availabeResignations = [
    //     { label: 'resignation - 1', value: 'resignation - 1' },
    //     { label: 'resignation - 2', value: 'resignation - 2' },
    //     { label: 'resignation - 3', value: 'resignation - 3' },
    //     { label: 'resignation - 4', value: 'resignation - 4' },
    //     { label: 'resignation - 5', value: 'resignation - 5' },
    //     { label: 'resignation - 6', value: 'resignation - 6' }
    // ];

    // const employeeDetails = [
    //     {
    //         id: Date.now(),
    //         name: 'John Doe',
    //         designation: 'Software Engineer',
    //         salaryPerShift : 700,
    //         phoneNumber: '1234567890'
    //     }
    //     // supervisor
    //     // labour
    //     // engineer
    //     // masson
    //     // electrition
    //     // plumber
    // ]

    //  const employeeDetails = [
    //     {
    //         id: 101,
    //         name: 'name 1',
    //         designation: 'labour',
    //         salaryPerShift : 700,
    //         phoneNumber: '1234567890'
    //     },
    //     {
    //         id: 102,
    //         name: 'name 2',
    //         designation: 'electrition',
    //         salaryPerShift : 700,
    //         phoneNumber: '1258796403'
    //     },
    //     {
    //         id: 103,
    //         name: 'name 3',
    //         designation: 'plumber',
    //         salaryPerShift : 700,
    //         phoneNumber: '5369785214'
    //     },
    //     {
    //         id: 104 ,
    //         name: 'name 4',
    //         designation: 'supevisor',
    //         salaryPerShift : 700,
    //         phoneNumber: '7894523654'
    //     },
    //     {
    //         id: 105,
    //         name: 'name 5',
    //         designation: 'plumber',
    //         salaryPerShift : 700,
    //         phoneNumber: '7895612348'
    //     }
    //  ]

    



  return (
    <div>
        <AlfNavbar/>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 text-center">
                    <h1>List Of All Employees</h1>
                </div>

                <div className="col-9 search-box" style={{ display: "flex" }}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </div>

                <div className='col-1'>
                        <Button>Search</Button>
                </div>

                <div className='col-12 col-lg-2'>
                    <Button variant="primary" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} /> Create New Employee
                    </Button>
                </div>

                <div className="col-6">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Enter Name</label>
                            
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>


        </div>
        
    </div>
  )
}

export default AlfEmployeesList
