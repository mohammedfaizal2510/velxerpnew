// =========================3) removes the already added employees in the modal dropdown 
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlfEachAttendance from './AlfEachAttendance';
import PinSideNav from './PinSideNav';
import PinNavihation from './PinNavihation';

const AlfAttendance = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  const [userAttendanceDetails, setUserAttendanceDetails] = useState(
    JSON.parse(localStorage.getItem('userAttendanceDetails'))
  );
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

  // Load from localStorage on mount
  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem('userAttendanceDetails'));
    if (storedDetails) setUserAttendanceDetails(storedDetails);
  }, []);

  // Save to localStorage whenever userAttendanceDetails updates
  useEffect(() => {
    localStorage.setItem('userAttendanceDetails', JSON.stringify(userAttendanceDetails));
    const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
    setTotalSalaryPaid(total);
  }, [userAttendanceDetails]);

  // Function to handle search
  const handleSearch = () => {
    return userAttendanceDetails.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filter out already added employees
  const availableEmployees = employeeDetails.filter(
    (emp) => !userAttendanceDetails.some((attendee) => attendee.id === emp.id)
  );

  const addEmployee = () => {
    if (selectedEmployee) {
      const employee = employeeDetails.find(emp => emp.id === selectedEmployee);
      if (employee) {
        setUserAttendanceDetails(prevDetails => [
          ...prevDetails,
          {
            id: employee.id,
            name: employee.name,
            salaryPerShift: employee.salaryPerShift,
            isPresent: false,
            shiftWorked: 0,
            totalPay: 0,
            salaryDate: formattedDate,
          },
        ]);
      }
      setShow(false);
      setSelectedEmployee(null);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={1}>
            <PinSideNav selectedKey="attendance" />
          </Col>
          <Col xs={11}>
            <PinNavihation />
            <div className='container-fluid mt-5'>
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className='mb-3'>Mark Your Attendance Here</h1>
                  <h3 className='d-inline pr-3'>Select The Date :</h3>
                  <div className="date-picker-container d-inline mb-3">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="date-picker"
                      maxDate={new Date()}
                    />
                  </div>
                </div>

                <div className='col-12 text-center mb-3' style={{ display: "flex", gap: "10px" }}>
                  <FormControl type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
                  <Button onClick={handleSearch}>Search</Button>
                  <Button variant="primary" onClick={handleShow}>Add Employee</Button>
                </div>

                {handleSearch().length === 0 ? (
                  <p>No Employees Found</p>
                ) : (
                  handleSearch().map((eachEmployee, index) => (
                    <AlfEachAttendance
                      key={index}
                      {...eachEmployee}
                      setUserAttendanceDetails={setUserAttendanceDetails}
                    />
                  ))
                )}

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Add Employee to Attendance</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Dropdown onSelect={(e) => setSelectedEmployee(Number(e))}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Employee
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {availableEmployees.map((employee) => (
                          <Dropdown.Item key={employee.id} eventKey={employee.id}>
                            {employee.name} (ID: {employee.id})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={addEmployee}>Add</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </Col> 
        </Row>
      </Container>
    </>
  )
}

export default AlfAttendance;



// =========================2) adding employee from modal
// import React, { useState, useEffect } from 'react';
// import { FormControl, Button, Container, Row, Col, Modal, Dropdown } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import AlfEachAttendance from './AlfEachAttendance';
// import PinSideNav from './PinSideNav';
// import PinNavihation from './PinNavihation';

// const AlfAttendance = () => {
//   const currentDate = new Date();
//   const [selectedDate, setSelectedDate] = useState(currentDate);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
//   const [userAttendanceDetails, setUserAttendanceDetails] = useState(
//     JSON.parse(localStorage.getItem('userAttendanceDetails'))
//   );
//   const [show, setShow] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
//   const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

//   // Load from localStorage on mount
//   useEffect(() => {
//     const storedDetails = JSON.parse(localStorage.getItem('userAttendanceDetails'));
//     if (storedDetails) setUserAttendanceDetails(storedDetails);
//   }, []);

//   // Save to localStorage whenever userAttendanceDetails updates
//   useEffect(() => {
//     localStorage.setItem('userAttendanceDetails', JSON.stringify(userAttendanceDetails));
//     const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
//     setTotalSalaryPaid(total);
//   }, [userAttendanceDetails]);

//   // Function to handle search
//   const handleSearch = () => {
//     return userAttendanceDetails.filter((employee) =>
//       employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const addEmployee = () => {
//     if (selectedEmployee) {
//       const employee = employeeDetails.find(emp => emp.id === selectedEmployee);
//       if (employee) {
//         setUserAttendanceDetails(prevDetails => [
//           ...prevDetails,
//           {
//             id: employee.id,
//             name: employee.name,
//             salaryPerShift: employee.salaryPerShift,
//             isPresent: false,
//             shiftWorked: 0,
//             totalPay: 0,
//             salaryDate: formattedDate,
//           },
//         ]);
//       }
//       setShow(false);
//       setSelectedEmployee(null);
//     }
//   };

//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col xs={1}>
//             <PinSideNav selectedKey="attendance" />
//           </Col>
//           <Col xs={11}>
//             <PinNavihation />
//             <div className='container-fluid mt-5'>
//               <div className="row">
//                 <div className="col-12 text-center">
//                   <h1 className='mb-3'>Mark Your Attendance Here</h1>
//                   <h3 className='d-inline pr-3'>Select The Date :</h3>
//                   <div className="date-picker-container d-inline mb-3">
//                     <DatePicker
//                       selected={selectedDate}
//                       onChange={(date) => setSelectedDate(date)}
//                       dateFormat="dd-MM-yyyy"
//                       className="date-picker"
//                       maxDate={new Date()}
//                     />
//                   </div>
//                 </div>

//                 <div className='col-12 text-center mb-3' style={{ display: "flex", gap: "10px" }}>
//                   <FormControl type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
//                   <Button onClick={handleSearch}>Search</Button>
//                   <Button variant="primary" onClick={handleShow}>Add Employee</Button>
//                 </div>

//                 {handleSearch().length === 0 ? (
//                   <p>No Employees Found</p>
//                 ) : (
//                   handleSearch().map((eachEmployee, index) => (
//                     <AlfEachAttendance
//                       key={index}
//                       {...eachEmployee}
//                       setUserAttendanceDetails={setUserAttendanceDetails}
//                     />
//                   ))
//                 )}

//                 <Modal show={show} onHide={handleClose}>
//                   <Modal.Header>
//                     <Modal.Title>Add Employee to Attendance</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     <Dropdown onSelect={(e) => setSelectedEmployee(Number(e))}>
//                       <Dropdown.Toggle variant="success" id="dropdown-basic">
//                         Select Employee
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         {employeeDetails.map((employee) => (
//                           <Dropdown.Item key={employee.id} eventKey={employee.id}>
//                             {employee.name} (ID: {employee.id})
//                           </Dropdown.Item>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>Close</Button>
//                     <Button variant="primary" onClick={addEmployee}>Add</Button>
//                   </Modal.Footer>
//                 </Modal>
//               </div>
//             </div>
//           </Col> 
//         </Row>
//       </Container>
//     </>
//   )
// }

// export default AlfAttendance;



// =========================1) while adding employee
// import React, { useState, useEffect } from 'react'
// import AlfNavbar from './AlfNavbar'
// import { FormControl, Form, Button, Container, Row, Col , Modal} from 'react-bootstrap'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import '../css/AlfAttendance.css'
// import AlfEachAttendance from './AlfEachAttendance'
// import PinNavbar from './PinNavbar'
// import PinSideNav from './PinSideNav'
// import PinNavihation from './PinNavihation'

// const AlfAttendance = () => {
//   const currentDate = new Date();
//   const [selectedDate, setSelectedDate] = useState(currentDate);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
//   //user attendance details 
//   const [userAttendanceDetails, setUserAttendanceDetails] = useState([]);
  
//   const formattedDate = selectedDate.toLocaleDateString('en-GB'); 

//   const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
//   // console.log(employeeDetails);
//   // now employeeDetails will be given below
//    // { id: 101, name: 'name 1', designation: 'Labour', salaryPerShift: 700, phoneNumber: '1234567890', totalSalary: 15000, doj:"", workingInSite:false,accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
//   // { id: 102, name: 'name 2', designation: 'Electrician', salaryPerShift: 800, phoneNumber: '1258796403', totalSalary: 0,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
//   // { id: 103, name: 'name 3', designation: 'Plumber', salaryPerShift: 750, phoneNumber: '5369785214', totalSalary: 7000,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
//   // { id: 104, name: 'name 4', designation: 'Supervisor', salaryPerShift: 900, phoneNumber: '7894523654', totalSalary: 0,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },
//   // { id: 105, name: 'name 5', designation: 'Plumber', salaryPerShift: 700, phoneNumber: '7895612348', totalSalary: 10000,doj:"", workingInSite:false, accessPrevAttendance: false, accessAddEmployee: false, accessEditSalary: false },

//   const [siteSalaryDataset, setSiteSalaryDataset] = useState();

//   // const [userAttendanceDetails, setUserAttendanceDetails] = useState([
//   //   {
//   //     id: employeeDetails[0].id,
//   //     name: employeeDetails[0].name,
//   //     salaryPerShift: 700,
//   //     isPresent: false,
//   //     shiftWorked: 0,
//   //     totalPay: 0,
//   //     salaryDate: formattedDate,
//   //   },
//   //   {
//   //     id: employeeDetails[1].id,
//   //     name: employeeDetails[1].name,
//   //     salaryPerShift: 700,
//   //     isPresent: false,
//   //     shiftWorked: 0,
//   //     totalPay: 0,
//   //     salaryDate: formattedDate,
//   //   }
//   // ]);
//   console.log(userAttendanceDetails);

//   // Calculate total salary paid whenever attendance details are updated
//   useEffect(() => {
//     const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
//     setTotalSalaryPaid(total);
//   }, [userAttendanceDetails]);

//   // Function to handle search
//   const handleSearch = () => {
//     return userAttendanceDetails.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()));
//   };

//   //for add employee modal
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

  

//   return (
//     <>
//       {/* <AlfNavbar /> */}
//       {/* <PinNavbar/> */}
//       <Container fluid>
//         <Row>
//           <Col xs={1}>
//             <PinSideNav selectedKey = "attendance"/>
//           </Col>
//           <Col xs={11}>
//           <PinNavihation />
//           <div className='container-fluid mt-5'>
//             <div className="row">
//               <div className="col-12 text-center">
//                 <h1 className='mb-3'>Mark Your Attendance Here</h1>
//                 <h3 className='d-inline pr-3'>Select The Date :</h3>
//                 {/* <DatePicker 
//                 selected={selectedDate} 
//                 onChange={(date) => setSelectedDate(  date)} className='mb-2'/> */}
//                   {/* Date Picker */}
//                 <div className="date-picker-container d-inline mb-3">
//                   <DatePicker
//                     selected={selectedDate}
//                     onChange={(date) => setSelectedDate(date)}
//                     dateFormat="dd-MM-yyyy"
//                     className="date-picker"
//                     maxDate={new Date()}
//                   />
//                 </div>
//                 {/* <h3 className='mb-3'>{formattedDate}</h3> */}
//                 {/* <h4 className='mt-3'>Total Salary : ₹{totalSalaryPaid}</h4> */}
//               </div>

//               <div className='col-12 text-center mb-3' style={{ display: "flex", gap: "10px" }}>
//                 <FormControl type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
//                 <Button onClick={handleSearch}>Search</Button>
//                 <Button variant="primary" onClick={() => setShow(true)}>Add Employee</Button>
//               </div>

//               {handleSearch().length === 0 ? (
//                 <p>No Employees Found</p>
//               ) : (
//                 handleSearch().map((eachEmployee, index) => (
//                   <AlfEachAttendance
//                     key={index}
//                     id={eachEmployee.id}
//                     name={eachEmployee.name}
//                     salaryPerShift={eachEmployee.salaryPerShift}
//                     isPresent={eachEmployee.isPresent}
//                     shiftWorked={eachEmployee.shiftWorked}
//                     totalPay={eachEmployee.totalPay}
//                     salaryDate={eachEmployee.salaryDate}
//                     setUserAttendanceDetails={setUserAttendanceDetails}
//                   />
//                 ))
//               )}

//               <div className="col-12">

//               <Modal show={show} onHide={handleClose}>
//                 <Modal.Header>
//                   <Modal.Title>Add Employees Available to this Site</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                           {/* list here all the availabe employees name and salary per shift from "employeeDetails" dataset 
//                           if "employeeDetails.workingInSite" is true then the employee should not be able to select to this site to add the employee
//                           if "employeeDetails.workingInSite" is false then the employee should be able to select to this site to add the employee
//                           at the top of this modal show the filter for "designation" which shows all the available designation from the "employeeDetails" dataset and based on the designation the employee name ans salarypershift should be listed to select
//                           then on clicking add button in the modal will call AlfEachAttendance and create the card to mark the attendance 
//                            */}

//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose}>Close</Button>
//                   <Button variant="primary" onClick={handleClose}>Add</Button>
//                 </Modal.Footer>
//               </Modal> 
//               </div>
//             </div>
//           </div>
//           </Col> 
//         </Row>
//       </Container>
      
      
//     </>
//   )
// }

// export default AlfAttendance

