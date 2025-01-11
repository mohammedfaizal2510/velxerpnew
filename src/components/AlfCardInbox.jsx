import React from 'react'
import {Navbar, Nav, Button} from "react-bootstrap"
import '../css/AlfProjects.css';

const AlfCardInbox = ({id, subject, show}) => {
    const disp = show && Object.entries(show).map(([key,value])=>`${key} : ${value}`).join('\n')
    const accept = ()=>{}
    const reject = ()=>{}
  return (
        <>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3 project-card p-4'>
                <h4>Subject: {subject}</h4>
                <pre>{disp}</pre>
                <Button onClick={accept} className='mr-3'>Accept</Button>
                <Button onClick={reject} >Reject</Button>
            </div>
        </>
  )

}

export default AlfCardInbox;


