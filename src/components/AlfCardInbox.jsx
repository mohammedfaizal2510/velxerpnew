import React from 'react'
import {Navbar, Nav, Button} from "react-bootstrap"
import '../css/AlfProjects.css';
import axios from 'axios';

const AlfCardInbox = ({_id, subject, show,work}) => {
    const disp = show && Object.entries(show).map(([key,value])=>`${key} : ${value}`).join('\n')
    const accept = ()=>{
        axios.put(`${import.meta.env.VITE_SER}stoc/site`,work,{headers:{req:_id,admin:sessionStorage.getItem("admin") || sessionStorage.getItem("auth")}})
    }
    const reject = ()=>{}
  return (
        <>
            {/* <div className='col-12 col-sm-6 col-md-4 col-lg-3 project-card p-4 m-4'> */}
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='project-card p-4'>
                <h4>Subject: {subject}</h4>
                <pre>{disp}</pre>
                <button onClick={accept} className='mr-3 mt-2 project-button'>Accept</button>
                <button onClick={reject} className='mt-2 project-button-danger'>Reject</button>
            </div>
            </div>
            
        </>
  )

}

export default AlfCardInbox;


