//================ 3) updating the "totalSalary" in localStorage
import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons';

const AlfEachAttendance = ({ id, name, salaryPerShift, isPresent, shiftWorked, totalPay, salaryDate, setUserAttendanceDetails }) => {
  // const [isDisabled, setIsDisabled] = useState(isPresent);
  const [isDisabled, setIsDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [newSalary, setNewSalary] = useState(salaryPerShift);
  const [selectedShift, setSelectedShift] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShiftSelect = (shiftValue) => {
    setSelectedShift(shiftValue);
  };

  const handleMarkPresent = () => {
    const updatedTotalPay = newSalary * selectedShift;

    setUserAttendanceDetails(prevDetails =>
      prevDetails.map(employee =>
        employee.id === id
          ? { ...employee, isPresent: true, totalPay: updatedTotalPay }
          : employee
      )
    );

    // Update the employee's totalSalary in employeeDetails in localStorage
    const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
    const updatedEmployeeDetails = employeeDetails.map(employee =>
      employee.id === id
        ? { ...employee, totalSalary: (employee.totalSalary || 0) + updatedTotalPay }
        : employee
    );
    localStorage.setItem('employeeDetails', JSON.stringify(updatedEmployeeDetails));

    setIsDisabled(true);
  };

  const handleSalaryUpdate = () => {
    setUserAttendanceDetails(prevDetails =>
      prevDetails.map(employee =>
        employee.id === id ? { ...employee, salaryPerShift: newSalary } : employee
      )
    );
    setShow(false);
  };

  return (
    <>
      <div className='col-12 col-md-6 mt-3'>
        <div className='employee-card-style p-4'>
          <h3><FontAwesomeIcon icon={faIdCardClip} className='mr-3'/>{name}</h3> 
          <div>
            <Dropdown className='d-inline m-2' onSelect={handleShiftSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Shift
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={0.5}>0.5 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={1}>1 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={1.5}>1.5 Shift</Dropdown.Item>
                <Dropdown.Item eventKey={2}>2 Shift</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button className='btn btn-success m-2' onClick={handleMarkPresent} disabled={isDisabled}>
              {isDisabled ? "Marked" : "Present"}
            </Button>
            <Button className='m-2' onClick={handleShow}>Edit Salary</Button>
            <h4 className='text-success'>Salary Added: ₹{totalPay}</h4>
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



//===================== 2) correct code before updating the "totalSalary"
// import React, { useState } from 'react'
// import { Button, Dropdown, Modal } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faIdCardClip } from '@fortawesome/free-solid-svg-icons'

// const AlfEachAttendance = ({ id, name, salaryPerShift, isPresent, shiftWorked, totalPay, salaryDate, setUserAttendanceDetails }) => {
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [show, setShow] = useState(false);
//   const [newSalary, setNewSalary] = useState(salaryPerShift);
//   const [selectedShift, setSelectedShift] = useState(0);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleShiftSelect = (shiftValue) => {
//     setSelectedShift(shiftValue);
//   };

//   const handleSalaryUpdate = () => {
//     setUserAttendanceDetails(prevDetails => prevDetails.map(employee =>
//       employee.id === id ? { ...employee, salaryPerShift: newSalary } : employee
//     ));
//     setShow(false);
//   };

//   const handleMarkPresent = () => {
//     const updatedTotalPay = newSalary * selectedShift;
//     setUserAttendanceDetails(prevDetails => prevDetails.map(employee =>
//       employee.id === id ? { ...employee, isPresent: true, totalPay: updatedTotalPay } : employee
//     ));
//     setIsDisabled(true);
//   };

//   return (
//     <>
//       <div className='col-12 col-md-6 mt-3'>
//         <div className='employee-card-style p-4'>
//           <h3><FontAwesomeIcon icon={faIdCardClip} className='mr-3'/>{name}</h3> 
//           <div>
//             <Dropdown className='d-inline m-2' onSelect={handleShiftSelect}>
//               <Dropdown.Toggle variant="success" id="dropdown-basic">
//                 Shift
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item eventKey={0.5}>0.5 Shift</Dropdown.Item>
//                 <Dropdown.Item eventKey={1}>1 Shift</Dropdown.Item>
//                 <Dropdown.Item eventKey={1.5}>1.5 Shift</Dropdown.Item>
//                 <Dropdown.Item eventKey={2}>2 Shift</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             <Button className='btn btn-success m-2' onClick={handleMarkPresent} disabled={isDisabled}>
//               {isDisabled ? "Marked" : "Present"}
//             </Button>
//             <Button className='m-2' onClick={handleShow}>Edit Salary</Button>
//             <h4 className='text-success'>Salary: ₹{totalPay}</h4>
//           </div>
//         </div>
//       </div>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header>
//           <Modal.Title>Edit Salary Per Shift</Modal.Title>
//         </Modal.Header> 
//         <Modal.Body>
//           <input type="number" value={newSalary} onChange={(e) => setNewSalary(Number(e.target.value))} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//           <Button variant="primary" onClick={handleSalaryUpdate}>Change</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default AlfEachAttendance


