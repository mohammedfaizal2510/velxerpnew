//================ 3) updating the "totalSalary" in localStorage
import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AlfEachAttendance = ({ _id, name, salaryPerShift, isPresent, totalpay, setUserAttendanceDetails }) => {
  const [show, setShow] = useState(false);
  const [newSalary, setNewSalary] = useState(salaryPerShift);
  const [selectedShift, setSelectedShift] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShiftSelect = (shiftValue) => {
    setSelectedShift(shiftValue);
  };

    const handleMarkPresent = () => {
        const updatedTotalPay = (newSalary * selectedShift) + totalpay;
        axios.put(`${import.meta.env.VITE_SER}emp`,{ isPresent: true, totalpay: updatedTotalPay },{headers:{edit:_id}}).then(y=>{
            setUserAttendanceDetails(prevDetails =>
                prevDetails.map(employee =>
                    employee._id === _id
                        ? y.data
                        : employee
                )
            );
        })
    };

  const handleSalaryUpdate = () => {
        axios.put(`${import.meta.env.VITE_SER}emp`,{salaryPerShift: newSalary},{headers:{edit:_id}}).then(()=>{
    setUserAttendanceDetails(prevDetails =>
      prevDetails.map(employee =>
        employee._id === _id ? { ...employee, salaryPerShift: newSalary } : employee
      )
    );
    setShow(false);
        })
  };

  return (
    <>
      <div className='col-12 col-md-6 mt-3'>
        <div className='employee-card-style p-4'>
          <h3><FontAwesomeIcon icon={faIdCardClip} className='mr-3'/>{name}</h3> 
          <div>
            <Dropdown className='d-inline m-2' onSelect={handleShiftSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedShift? selectedShift + " shift" : 'Shift'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={0.5}>0.5 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={1}>1 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={1.5}>1.5 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={2}>2 Shift</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button className='btn btn-success m-2' onClick={handleMarkPresent} disabled={isPresent}>
              {isPresent ? "Marked" : "Present"}
            </Button>
            <Button className='m-2' onClick={handleShow}>Edit Salary</Button>
            <h4 className='text-success'>Salary Added: ₹{totalpay}</h4>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Salary Per Shift</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          <input type="number" value={newSalary} onChange={(e) => setNewSalary(Number(e.target.value))} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSalaryUpdate}>Change</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AlfEachAttendance;

