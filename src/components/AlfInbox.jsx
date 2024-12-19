import React,{useState,useEffect} from 'react'
import AlfNavbar from './AlfNavbar'
import '../css/AlfProjects.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import AlfCardInbox from './AlfCardInbox';
import TrySideNav from './TrySideNav';
// import HoverButton from './HoverButton';

const AlfInbox = () => {
    
    const requestDataset = [
        {
            id: 1,
            subject: 'Attendance Request',
            from: 'Mohammed',
            role: 'Supervisor',
            site: 'Site Name',
            date: '12/05/2021',
            isAccepted: false,
        },
        {
            id: 2,
            subject: 'Add Employee Request',
            from: 'Faizal',
            role: 'Supervisor',
            site: 'Site Name',
            date: '12/05/2021',
            isAccepted: false,
        },
        

    ]
  return (
    <>
        {/* <AlfNavbar/> */}
        
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <TrySideNav selectedKey="inbox"/>
                </Col>
                <Col xs={11}>
                
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <h1>Inbox</h1>
                            </div>
                            {/* <HoverButton/> */}

                            {requestDataset.length === 0 ? (
                                <h2>No Requests Found</h2>
                            ) : (
                                requestDataset.map((eachRequest, index) => (
                                    <AlfCardInbox
                                        key={index}
                                        id={eachRequest.id}
                                        subject={eachRequest.subject}
                                        from={eachRequest.from}
                                        role={eachRequest.role}
                                        site={eachRequest.site}
                                        date={eachRequest.date}
                                        isAccepted={eachRequest.isAccepted}

                                    />

                                ))
                            )}

                            
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default AlfInbox
