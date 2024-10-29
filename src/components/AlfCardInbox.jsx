import React from 'react'
import {Navbar, Nav, Button} from "react-bootstrap"
import './AlfProjects.css';

const AlfCardInbox = ({id, subject, from, role, site, date, isAccepted}) => {
  return (
    <>
      <div className='col-12 col-sm-6 col-md-4 col-lg-3 project-card p-4'>
                            <h4>Subject: {subject}</h4>
                            <p>From: {from}</p>
                            <p>Role: {role}</p>
                            <p>Site: {site}</p>
                            <p>Date: {date}</p>
                            <Button className='mr-3'>Accept</Button>
                            <Button>Reject</Button>
                        </div>
    </>
  )

}

export default AlfCardInbox;


