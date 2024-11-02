import React from 'react';
import './AlfProjects.css';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'

const AlfEachProjectCard = ({ id, projectName, projectCity, projectSupervisor, projectStartDate, isCompleted, togggleCardStatus, deleteCard, clientName }) => {
    const navigate = useNavigate();
    return (
        <>
        <div className="col-12 col-md-6 mt-3">
            <div className='project-card p-4'>
                <div style={{ display: "flex", gap: "1em" }}>
                    <FontAwesomeIcon icon={faPersonDigging} style={{ fontSize: "3em" }} />
                    <h1>{projectName}</h1>
                </div>
                <p>City: {projectCity}</p>
                <p>Supervisor: {projectSupervisor}</p> {/* Updated to projectSupervisor */}
                <p>Start Date: {projectStartDate}</p>
                <p>Client: {clientName}</p>
                <hr />
                <div>
                    <Button onClick={() => deleteCard(id)}>Remove</Button>
                    <Button className='ml-3' onClick={() => togggleCardStatus(id)}>
                        {isCompleted ? "Mark UnCompleted" : "Mark Completed"}
                    </Button>
                    <Button className='ml-3'onClick={() => navigate('/projects/dashboard/attendance')}>Details</Button>
                    <p style={{ display: "inline", fontSize: "1.3em" }} className={`ml-3 ${isCompleted ? "text-success" : "text-danger"}`}>
                        {isCompleted ? "Completed" : "OnGoing"}
                    </p>
                </div>
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


