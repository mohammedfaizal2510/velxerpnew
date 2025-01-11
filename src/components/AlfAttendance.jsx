// =========================3) removes the already added employees in the modal dropdown
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Dropdown,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlfEachAttendance from "./AlfEachAttendance";
import PinSideNav from "./PinSideNav";
import PinNavihation from "./PinNavihation";
import { useLocation } from "react-router-dom";
import axios from "axios";
const AlfAttendance = () => {
  const loc = useLocation();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
  const [userAttendanceDetails, setUserAttendanceDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [availableEmployees, set] = useState([]);
  // const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));

  const formattedDate = selectedDate.toLocaleDateString("en-GB");

  // Load from localStorage on mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SER}emps`, {
        headers: { auth: loc.state.att },
      })
      .then((t) => t.data)
      .then(setUserAttendanceDetails);
    axios
      .get(`${import.meta.env.VITE_SER}uck`, {
        headers: { auth: sessionStorage.getItem("auth") },
      })
      .then((t) =>
        t.data.emplyee.filter((v) =>
          loc.state.att ? !loc.state.att.includes(v) : true
        )
      )
      .then((d) => {
        axios
          .get(`${import.meta.env.VITE_SER}emps`, { headers: { auth: d } })
          .then((t) => t.data.filter((v) => v.designation != "Supervisor"))
          .then(set);
      });
  }, []);

  // Save to localStorage whenever userAttendanceDetails updates
  // useEffect(() => {
  //   localStorage.setItem('userAttendanceDetails', JSON.stringify(userAttendanceDetails));
  //   const total = userAttendanceDetails.reduce((sum, employee) => sum + employee.totalPay, 0);
  //   setTotalSalaryPaid(total);
  // }, [userAttendanceDetails]);

  // Function to handle search
  const handleSearch = () => {
    return userAttendanceDetails.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleClose = () => {
    setSelectedEmployee(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Filter out already added employees
  const addEmployee = () => {
    if (selectedEmployee) {
      const employee = availableEmployees.find(
        (emp) => emp._id == selectedEmployee
      );
      if (employee) {
            axios.put(`${import.meta.env.VITE_SER}proj`,{'$push':{emplyee:employee._id}},{headers:{admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth"),edit:sessionStorage.getItem('site'),auth:sessionStorage.getItem('auth')}}).then(_t=>{
        setUserAttendanceDetails((prevDetails) => [
          ...prevDetails,
          employee,
        ]);
                    set(p=>p.filter(v=>v._id!=employee._id))
            })
      }
      setShow(false);
      setSelectedEmployee(null);
    }
  };

  const [selectedDesignation, setSelectedDesignation] = useState('');
  const uniqueDesignations = [...new Set(userAttendanceDetails.map(emp => emp.designation))];



  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={1}>
            <PinSideNav selectedKey="attendance" />
          </Col>
          <Col xs={11}>
            <PinNavihation />
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="mb-3">Attendance</h1>
                  {/* <h3 className="d-inline pr-3">Date :</h3> */}
                  <div className="date-picker-container d-inline mb-3">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd-MM-yyyy"
                      className="date-picker"
                      maxDate={new Date()}
                      disabled={true}
                    />
                  </div>
                </div>

                <div
                  className="col-10 col-md-7 text-center mb-3"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <FormControl
                    className='email-input mt-3'
                    type="text"
                    placeholder="Search by name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-2 col-md-1 mt-2">
                  <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                <div className="col-6 col-md-2 mt-2">
                    <button variant="primary" onClick={handleShow} className="search-button">
                    Add Employee
                  </button>
                </div>
                <div className="col-6 col-md-2 mt-2">
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className="neumorphic-dropdown">
                      {selectedDesignation || 'Filter by Designation'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="neumorphic-dropdown-menu">
                      <Dropdown.Item onClick={() => setSelectedDesignation('')}>All</Dropdown.Item>
                      {uniqueDesignations.map((designation, index) => (
                        <Dropdown.Item key={index} onClick={() => setSelectedDesignation(designation)}>
                          {designation}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
                    <Dropdown onSelect={(e) => setSelectedEmployee(e)}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedEmployee
                          ? selectedEmployee
                          : "Select Employee"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {availableEmployees.map((employee) => (
                          <Dropdown.Item
                            key={employee._id}
                            eventKey={employee._id}
                          >
                            {employee.name} (ID: {employee._id})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={addEmployee}>
                      Add
                    </Button>
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

export default AlfAttendance;
