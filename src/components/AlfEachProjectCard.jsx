import React, { useState } from "react";
import "../css/AlfProjects.css";
import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const AlfEachProjectCard = ({
  _id,
  name,
  location,
  projectSupervisor,
  projectStartDate,
  status,
  togggleCardStatus,
  deleteCard,
  owner,
  emplyee,
}) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <div className="col-12 col-md-6 mt-3">
        <div className="project-card p-4">
          <div style={{ display: "flex", gap: "1em" }}>
            <FontAwesomeIcon
              icon={faPersonDigging}
              style={{ fontSize: "3em" }}
            />
            <h1>{name}</h1>
          </div>
          <p>City: {location}</p>
          <p>Supervisor: {projectSupervisor?.label}</p>{" "}
          {/* Updated to projectSupervisor */}
          <p>Start Date: {projectStartDate}</p>
          <p>Client: {owner}</p>
          <hr />
          <div>
            <Button onClick={handleShow}>Remove</Button>
            <Button className="ml-3" onClick={() => togggleCardStatus(_id)}>
              {!status ? "Mark UnCompleted" : "Mark Completed"}
            </Button>
            <Button
              className="ml-3"
              onClick={() => {
                navigate("/projects/dashboard/attendance", {
                  state: { att: emplyee },
                });
                sessionStorage.setItem("site",_id)
              }}
            >
              Details
            </Button>
            <p
              style={{ display: "inline", fontSize: "1.3em" }}
              className={`ml-3 ${!status ? "text-success" : "text-danger"}`}
            >
              {!status ? "Completed" : "OnGoing"}
            </p>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Are You Sure to Delete a Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="danger" onClick={() => deleteCard(_id)}>Delete Project</Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

// const AlfEachProjectCard = ({ id, projectName, projectCity, supervisorName, projectStartDate, isCompleted, togggleCardStatus, deleteCard, clientName }) => {
//     return (
//         <div className="col-12 col-md-6 mt-3">
//             <div className='project-card p-4'>
//                 <div style={{ display: "flex", gap: "1em" }}>
//                     <FontAwesomeIcon icon={faPersonDigging} style={{ fontSize: "3em" }} />
//                     <h1>{projectName}</h1>
//                 </div>
//                 <p>City: {projectCity}</p>
//                 <p>Supervisor: {supervisorName}</p>
//                 <p>Start Date: {projectStartDate}</p>
//                 <p>Client: {clientName}</p>
//                 <hr />
//                 <div>
//                     <Button onClick={() => deleteCard(id)}>Remove</Button>
//                     <Button className='ml-3' onClick={() => togggleCardStatus(id)}>
//                         {isCompleted ? "Mark UnCompleted" : "Mark Completed"}
//                     </Button>
//                     <p style={{ display: "inline", fontSize: "1.3em" }} className={`ml-3 ${isCompleted ? "text-success" : "text-danger"}`}>
//                         {isCompleted ? "Completed" : "OnGoing"}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default AlfEachProjectCard;
